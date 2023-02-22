import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, username, password } = req.body;

  // axios
  //   .post(
  //     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/passwordless/send-link`,
  //     { email, username },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  //       },
  //     }
  //   )
  //   .then((response: any) => {
  //     console.log('response', response);
  //     res.status(200).json(response.data);
  //   })
  //   .catch((error) => {
  //     console.log('error', error.response.data);
  //   });

  axios
    .post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
      {
        username,
        email,
        password,
        role: 'Authenticated',
        credits: 5,
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
      console.log(error.response.data);

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
            .send(
              "Cet email ou nom d'utilisaeur est déjà utilisé par un autre utilisateur"
            );
        }
      }
      return res
        .status(400)
        .send(
          "Cet email ou nom d'utilisaeur est déjà utilisé par un autre utilisateur"
        );
    });
}
