import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { authorization } = req.headers;
  const { title, mask_prompt, is_published } = req.body;

  if (req.method === 'GET') {
    let artwork: any;

    const query = qs.stringify(
      {
        populate: ['image', 'user'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    await axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/artworks/${id}?${query}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
        }
      )
      .then(async (response: any) => {
        artwork = {
          ...response.data,
          data: {
            ...response.data.data,
            attributes: {
              ...response.data.data.attributes,
              user: response.data.data.attributes.user.data.id,
            },
          },
        };
      })
      .catch((err) => {
        console.log('generation', err?.response?.data);
      });

    if (!artwork) {
      return res.status(400).json('Error generating images');
    }

    return res.status(200).json(artwork.data);
  }

  if (req.method === 'PUT') {
    let user: any;
    let artwork: any;
    let artwork_updated: any;

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
      return res.status(401).json('Unauthorized');
    }

    const query = qs.stringify(
      {
        populate: ['image', 'user'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    await axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/artworks/${id}?${query}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
        }
      )
      .then((artworkResponse: any) => {
        artwork = artworkResponse.data;
      })
      .catch((err) => {
        console.log('user', err.response.data);
      });

    if (!artwork) {
      return res.status(401).json('No artwork found');
    }

    if (user.id !== artwork.data.attributes.user.data.id) {
      return res.status(401).json('Unauthorized');
    }

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/artworks/${id}?${query}`,
        {
          data: {
            title,
            mask_prompt,
            is_published,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
        }
      )
      .then((artworkResponse: any) => {
        artwork_updated = artworkResponse.data;
      })
      .catch((err) => {
        console.log('artwork', err.response.data);
      });

    if (!artwork_updated) {
      return res.status(400).json('Error updating artwork');
    }

    return res.status(200).json({ message: 'Artwork updated successfully' });
  }

  return res.status(405).json('Method not allowed');
}
