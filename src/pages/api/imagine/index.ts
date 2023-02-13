import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';
import { Blob, FormData } from 'formdata-node';
import fetch from 'node-fetch';
import preGeneratedStyles from '../../../lib/style_list';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, styles, numberOfImages } = req.body;
  const { authorization } = req.headers;

  let user: any;
  let generation: any;
  let user_updated: boolean = false;

  await axios
    .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: authorization,
      },
    })
    .then((userResponse: any) => {
      user = userResponse.data;
    })
    .catch((err) => {
      console.log('user', err.response.data);
    });

  if (!user) {
    return res.status(401).json('Error generating images');
  }

  const styleText = preGeneratedStyles.filter((style) => style.name === styles);

  const response = await openai.createImage({
    prompt: `${prompt}${styleText.length > 0 && `, ${styleText[0].prompt}`}`,
    n: numberOfImages,
    size: '1024x1024',
  });
  const dalleImage_url = response.data.data;

  // const dalleImage_url = [
  //   {
  //     url: 'https://picsum.photos/200/300',
  //   },
  // ];

  let idOfArtwork: any = [];
  await Promise.all(
    dalleImage_url.map(async ({ url }: any) => {
      try {
        const imageFromUrl = await axios.get(url, {
          responseType: 'arraybuffer',
        });
        const buffer = Buffer.from(imageFromUrl.data, 'binary');
        const file = new Blob([buffer], { type: 'image/jpeg' });

        const form: any = new FormData();
        form.append('files.image', file);
        form.append(
          'data',
          JSON.stringify({
            prompt,
          })
        );
        const artworkResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/artworks`,
          {
            method: 'post',
            body: form,
            headers: {
              Authorization: authorization!,
            },
          }
        );
        const data: any = await artworkResponse.json();

        idOfArtwork = [...idOfArtwork, data.data.id];
      } catch (errArtwork: any) {
        console.error('artworks', errArtwork);
      }
    })
  );

  if (idOfArtwork.length <= 0) {
    return res.status(400).json('Error generating images');
  }

  await axios
    .post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/generations`,
      {
        data: {
          prompt,
          styles,
          count: numberOfImages,
          users: user.id,
          artworks: {
            connect: idOfArtwork,
          },
        },
      },
      {
        headers: {
          Authorization: authorization,
        },
      }
    )
    .then((generationResponse: any) => {
      generation = generationResponse.data.data;
    })
    .catch((err) => {
      console.log('generation', err.response.data);
    });

  if (!generation) {
    return res.status(400).json('Error generating images');
  }

  await axios
    .put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user.id}`,
      {
        // eslint-disable-next-line no-unsafe-optional-chaining
        credits: user?.credits ? +user.credits - +numberOfImages : undefined,
        generations: {
          connect: [generation.id],
        },
        artworks: {
          connect: idOfArtwork,
        },
      },
      {
        headers: {
          Authorization: authorization,
        },
      }
    )
    .then(() => {
      user_updated = true;
    })
    .catch((err) => {
      console.log(err.response.data);
    });

  if (!user_updated) {
    return res.status(400).json('Error generating images');
  }

  return res.status(200).json(generation.id);
}
