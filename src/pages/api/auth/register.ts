import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  axios
    .post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
      {
        username: 'lololo',
        email,
        password,
        role: 'Authenticated',
        credits: 4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )
    .then((response: any) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      if (error?.response?.data?.error?.message) {
        const errorMessage = error?.response?.data?.error?.message;
        if (errorMessage === 'password must be at least 6 characters') {
          return res
            .status(400)
            .send('Votre mot de passe doit contenir au moins 6 caractères');
        }
        if (errorMessage === 'Email or Username are already taken') {
          return res
            .status(400)
            .send('Cet email est déjà utilisé par un autre utilisateur');
        }
      }
      return res.status(400).send('Une erreur est survenue');
    });
}
