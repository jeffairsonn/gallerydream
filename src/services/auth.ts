import axios from 'axios';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

const signIn = async ({ email, password }: any) => {
  const res = await axios
    .post(
      `${strapiUrl}/api/auth/local`,
      {
        identifier: email,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )
    .catch((error) => {
      console.log(error);
    });

  return res?.data;
};

// const signIn = async ({ tokenFromEmail }: any) => {
//   const res = await axios
//     .get(`${strapiUrl}/api/passwordless/login?loginToken=${tokenFromEmail}`, {
//       headers: {
//         Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
//       },
//     })
//     .catch((error) => {
//       console.log(error.response.data);
//     });

//   return res?.data;
// };

export default signIn;
