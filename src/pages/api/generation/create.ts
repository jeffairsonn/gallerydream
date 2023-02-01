import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { artwork_group_id } = req.body;
  const { authorization } = req.headers;

  let user: any;
  let generation: any;

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

  const getGenerationsQuery = qs.stringify(
    {
      filters: {
        user: user.id,
        id: artwork_group_id,
      },
      populate: '*',
      pagination: {
        pageSize: 9,
        page: 1,
      },
      publicationState: 'live',
    },
    {
      encodeValuesOnly: true,
    }
  );

  await axios
    .get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/generations?${getGenerationsQuery}`,
      {
        headers: {
          Authorization: authorization,
        },
      }
    )
    .then(async (generationResponse: any) => {
      generation = generationResponse.data.data;
    })
    .catch((err) => {
      console.log('generation', err?.response?.data);
    });

  if (!generation) {
    return res.status(400).json('Error generating images');
  }

  console.log('c ce que je veux', generation);

  // await axios
  //   .put(
  //     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${artwork_group_id}`,
  //     {
  //       // eslint-disable-next-line no-unsafe-optional-chaining
  //       credits: user?.credits ? +user.credits - +numberOfImages : undefined,
  //       generations: {
  //         connect: [generation.id],
  //       },
  //     },
  //     {
  //       headers: {
  //         Authorization: authorization,
  //       },
  //     }
  //   )
  //   .then(() => {
  //     user_updated = true;
  //   })
  //   .catch((err) => {
  //     console.log(err.response.data);
  //   });

  // if (!user_updated) {
  //   return res.status(400).json('Error generating images');
  // }

  return res.status(200).json(generation.id);
}
