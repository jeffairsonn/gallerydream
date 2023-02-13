import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  const { page, pageSize } = req.query;

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

  const getGenerationsQuery = qs.stringify(
    {
      filters: {
        user: user.id,
      },
      populate: ['*', 'artworks', 'artworks.image'],
      pagination: {
        pageSize,
        page,
      },
      publicationState: 'live',
      sort: ['createdAt:desc'],
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
      generations = generationResponse.data;
    })
    .catch((err) => {
      console.log('generation', err?.response?.data);
    });

  if (!generations) {
    return res.status(400).json('Error generating images');
  }

  return res.status(200).json(generations);
}
