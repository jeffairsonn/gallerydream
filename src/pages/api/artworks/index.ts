import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';
import uselessFilteredWord from '../../../lib/uselessFilteredWord';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, pageSize, search } = req.query;

  const searchString: string = search as string;
  const filters: any = {
    $or: [],
  };
  if (search && search !== '') {
    const searchArray = searchString
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      ?.split(' ')
      .filter((word) => !uselessFilteredWord.includes(word));

    searchArray.map((word) =>
      filters.$or.push({
        prompt: {
          $contains: word,
        },
      })
    );
  }

  let generations: any;

  const getGenerationsQuery = qs.stringify(
    {
      populate: ['*', 'image'],
      pagination: {
        pageSize,
        page,
      },
      filters,
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
