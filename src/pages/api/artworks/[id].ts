import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  let artwork: any;

  const query = qs.stringify(
    {
      populate: ['image', 'generation'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  await axios
    .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/artworks/${id}?${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    })
    .then(async (generationResponse: any) => {
      artwork = generationResponse.data;
    })
    .catch((err) => {
      console.log('generation', err?.response?.data);
    });

  if (!artwork) {
    return res.status(400).json('Error generating images');
  }

  return res.status(200).json(artwork.data);
}
