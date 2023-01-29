import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, styles, numberOfImages, user } = req.body;
  const { authorization } = req.headers;

  axios
    .post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/generations`,
      {
        data: {
          prompt,
          styles,
          count: numberOfImages,
          user,
        },
      },
      {
        headers: {
          Authorization: authorization,
        },
      }
    )
    .then((response) => {
      console.log(response.data.data);
      res.status(200).json(response.data.data.id);
    })
    .catch((err) => {
      console.log(err.response.data);
      return res.status(400).json('Error generating images');
    });
}
