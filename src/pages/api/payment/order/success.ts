import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const qs = require('qs');
const stripe = require('stripe')(
  process.env.NEXT_PUBLIC_MODE === 'dev'
    ? process.env.STRIPE_SECRET_KEY
    : process.env.STRIPE_SECRET_KEY_LIVE
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { session_id } = req.query;

  let user: any;
  let order: any;

  const Orderquery = qs.stringify(
    {
      filters: {
        session_id,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  await axios
    .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders?${Orderquery}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    })
    .then((orderResponse: any) => {
      // eslint-disable-next-line prefer-destructuring
      order = orderResponse.data.data[0];
    })
    .catch((err) => {
      console.log('order', err.response.data);
    });

  if (order) {
    return res.status(401).json('Already treated');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id || '');

  if (!session) {
    return res.status(400).json({ error: 'unknow' });
  }

  if (session.payment_status !== 'paid') {
    return res.status(400).json({ error: 'failed' });
  }

  if (session.metadata.type === 'credits') {
    const query = qs.stringify(
      {
        filters: {
          customer_id: session.customer,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    await axios
      .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users?${query}`, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      })
      .then((userResponse: any) => {
        // eslint-disable-next-line prefer-destructuring
        user = userResponse.data[0];
      })
      .catch((err) => {
        console.log('user', err.response.data);
      });

    if (!user) {
      return res.status(401).json('User doesn t exist');
    }

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user.id}`,
        {
          // eslint-disable-next-line no-unsafe-optional-chaining
          credits: user?.credits
            ? +user.credits + +session.metadata.credits
            : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
        }
      )
      .then(() => {
        console.log('success');
      })
      .catch((err) => {
        console.log('user', err.response.data);
      });
  }

  let newOrder: any;
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`,
      {
        data: {
          session_id,
          user: {
            connect: [user.id],
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    )
    .then((orderResponse: any) => {
      // eslint-disable-next-line prefer-destructuring
      newOrder = orderResponse.data;
    })
    .catch((err) => {
      console.log('order', err.response.data.error.details);
    });

  if (!newOrder) {
    return res.status(401).json('Order not created');
  }

  if (session.metadata.type === 'credits') {
    return res.status(200).json('credit_added');
  }

  return res.status(500).json("We don't know what happened");
};

export default handler;
