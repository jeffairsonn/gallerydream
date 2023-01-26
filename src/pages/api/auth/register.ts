import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  axios
    .post(
      'http://localhost:1337/api/auth/local/register',
      {
        username: 'lololo',
        email,
        password,
        role: 'Authenticated',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )
    .then((response: any) => {
      res.status(402000).json(response.data);
    })
    .catch((error) => {
      console.log(error.response);
      res.status(400).send('User already exists');
    });
}
