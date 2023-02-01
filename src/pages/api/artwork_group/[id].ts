import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  const { id } = req.query;

  let user: any;
  let generations: any;

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

  console.log(id);

  await axios
    .get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/generations/${id}?populate=*`,
      {
        headers: {
          Authorization: authorization,
        },
      }
    )
    .then(async (generationResponse: any) => {
      generations = generationResponse.data;
    })
    .catch((err) => {
      console.log('generation', err?.response?.data);
    });

  if (!generations) {
    return res.status(400).json('Error generating images');
  }

  console.log(generations.data);
  return res.status(200).json(generations.data);
}
