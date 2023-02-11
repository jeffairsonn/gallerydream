import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query;

  let generations: any;

  const getGenerationsQuery = qs.stringify(
    {
      populate: ['*', 'image'],
      pagination: {
        pageSize: 20,
        page,
      },
      sort: ['createdAt:desc'],
      publicationState: 'live',
    },
    {
      encodeValuesOnly: true,
    }
  );

  await axios
    .get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/artworks?${getGenerationsQuery}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )
    .then(async (generationResponse: any) => {
      generations = generationResponse.data.data;
    })
    .catch((err) => {
      console.log('generation', err?.response?.data);
    });

  if (!generations) {
    return res.status(400).json('Error generating images');
  }

  return res.status(200).json(generations);
}
