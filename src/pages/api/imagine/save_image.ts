import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, styles, numberOfImages, image_url } = req.body;
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

  let idOfImage: any = [];
  await Promise.all(
    image_url.map(async ({ url }: any) => {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/artworks`,
          {
            data: {
              prompt,
              url,
            },
          },
          {
            headers: {
              Authorization: authorization,
            },
          }
        )
        .then((generationResponse: any) => {
          idOfImage = [...idOfImage, generationResponse.data.data.id];
        })
        .catch((err) => {
          console.log('generation', err.response.data);
        });
    })
  );

  if (idOfImage.length <= 0) {
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
            connect: idOfImage,
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
