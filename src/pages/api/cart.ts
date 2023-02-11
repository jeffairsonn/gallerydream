import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cart: cartString } = req.query;
  const { authorization } = req.headers;

  const cart = JSON.parse(cartString as string);

  let user: any;

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

  const cartItems: any = [];

  await Promise.all(
    await cart.map(async (item: any) => {
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
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/artworks/${item.id}?${query}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
          }
        )
        .then((artwork: any) => {
          console.log(artwork.data.data.attributes.image.data.attributes.url);
          if (artwork.data.data.attributes.user.data.id === user.id) {
            cartItems.push({
              id: item.id,
              quantity: item.quantity,
              price: item.price,
              image: artwork.data.data.attributes.image.data.attributes.url,
            });
          }
        })
        .catch((err) => {
          console.log('user', err.response.data);
        });
    })
  );

  console.log(cartItems);

  return res.status(200).json({ cartItems });
}
