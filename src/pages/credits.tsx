import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import credits from '../lib/credits_price';
import Container from '../components/Container';

const Credits = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{ credits: number }>();
  const [reload] = useState(0);

  useEffect(() => {
    if (data) {
      axios
        .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data, reload]);

  const addCredits = (price_id: string) => {
    axios
      .post(
        `/api/payment/create-checkout-session`,
        {
          // eslint-disable-next-line no-unsafe-optional-chaining
          price_id,
          type: 'credits',
        },
        {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        }
      )
      .then((res: any) => {
        window.location.replace(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <div>
      <Navbar user={user} status={status} />
      <Container>
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-black max-w-5xl mb-12 w-full text-center">
            Donnez vie à vos idées les plus folles en achetant des crédits pour
            générer des oeuvres artistiques.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 max-w-4xl">
            {credits.map(({ name, price, price_id, live_price_id }) => (
              <div className="w-full border flex justify-between border-black p-8">
                <div>
                  <h1 className="text-xl font-bold">{name}</h1>
                  <p className="text-green-600">{price} €</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addCredits(
                      process.env.NEXT_PUBLIC_MODE === 'dev'
                        ? price_id
                        : live_price_id
                    )
                  }
                  className="btn btn-primary"
                >
                  Acheter
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Credits;
