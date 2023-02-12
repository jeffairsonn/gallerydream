import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import credits from '../../../lib/credits_price';

const stripe = require('stripe')(
  process.env.NEXT_PUBLIC_MODE === 'dev'
    ? process.env.STRIPE_SECRET_KEY
    : process.env.STRIPE_SECRET_KEY_LIVE
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers;
  const { price_id, type, quantity, cancel_url, artwork_id } = req.body;

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

  if (!user.customer_id) {
    const customer = await stripe.customers.create({
      email: user.email,
    });
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user.id}`,
        {
          customer_id: customer.id,
        },
        {
          headers: {
            Authorization: authorization,
          },
        }
      )
      .then((userResponse: any) => {
        user = userResponse.data;
      })
      .catch((err) => {
        console.log('user', err.response.data);
      });
  }

  let session: any;
  if (
    type === 'credits' &&
    !credits.filter(({ price_id: price }) => price === price_id)[0]
  ) {
    session = await stripe.checkout.sessions.create({
      line_items: [{ price: price_id, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BACK_END_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BACK_END_URL}/credits`,
      metadata: {
        user_id: user.id,
        price_id,
        type,
        credits:
          type === 'credits'
            ? credits.filter(({ price_id: price, live_price_id }) =>
                process.env.NEXT_PUBLIC_MODE === 'dev'
                  ? price === price_id
                  : live_price_id === price_id
              )[0].credits
            : undefined,
      },
      customer: user.customer_id,
    });
  }

  if (type === 'artwork') {
    session = await stripe.checkout.sessions.create({
      line_items: [{ price: price_id, quantity }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BACK_END_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BACK_END_URL}${cancel_url}`,
      metadata: {
        user_id: user.id,
        line_items: JSON.stringify([
          {
            price_id,
            type,
            quantity,
            artwork_id,
          },
        ]),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL'],
      },
      allow_promotion_codes: true,
      phone_number_collection: {
        enabled: true,
      },
      customer: user.customer_id,
    });
  }

  return res.status(200).json({ url: session.url });
};

export default handler;
