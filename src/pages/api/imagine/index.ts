import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';
import { FormData } from 'formdata-node';
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

  console.log(
    `${prompt}${styleText.length > 0 ? `, ${styleText[0].prompt}` : ''}`
  );

  const response = await openai.createImage({
    prompt: `${prompt}${
      styleText.length > 0 ? `, ${styleText[0].prompt}` : ''
    }`,
    n: numberOfImages,
    size: '1024x1024',
  });
  const dalleImage_url = response.data.data;

  // const dalleImage_url = [
  //   {
  //     url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4DUxq5Uf9KJAOPk0jnzl6kfV/user-p9kab1RIC8TokkV9qCoVkLxE/img-nlLytWUdG2Eu1A1Uqt0ea4TM.png?st=2023-02-20T11%3A31%3A23Z&se=2023-02-20T13%3A31%3A23Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-19T19%3A33%3A02Z&ske=2023-02-20T19%3A33%3A02Z&sks=b&skv=2021-08-06&sig=0i/77D8d9k4ZVlKAUomx8qYDbFDshkaS0Y7RxyEt2BM%3D',
  //   },
  // ];

  let idOfArtwork: any = [];
  await Promise.all(
    dalleImage_url.map(async ({ url }: any) => {
      try {
        const form: any = new FormData();
        form.append(
          'data',
          JSON.stringify({
            prompt,
            style: styles,
            stand_by_url: url,
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
          style: styles,
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
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )
    .then(() => {
      user_updated = true;
    })
    .catch((err) => {
      console.log('user', err.response.data);
    });

  if (!user_updated) {
    return res.status(400).json('Error generating images');
  }

  axios.post(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/imagine/save_image`, {
    idOfArtwork,
    dalleImage_url,
    authorization,
  });

  return res.status(200).json(generation.id);
}
