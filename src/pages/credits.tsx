import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import credits from '../lib/credits_price';

const Credits = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{ credits: number }>();
  const [reload, setReload] = useState(0);

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

  const addCredits = (creditsToAdd: number) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${data.id}`,
        {
          // eslint-disable-next-line no-unsafe-optional-chaining
          credits: user?.credits ? +user?.credits + +creditsToAdd : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        }
      )
      .then(() => {
        setReload(reload + 1);
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
      <div className="px-4 md:px-8 lg:px-40  gap-4 pb-16 pt-8 space-y-20">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-black max-w-5xl mb-12 w-full text-center">
            Donnez vie à vos idées les plus folles en achetant des crédits pour
            générer des oeuvres artistiques.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 max-w-4xl">
            {credits.map(({ name, price, credits: creditsToAdd }) => (
              <div className="w-full border flex justify-between border-black rounded-3xl p-8">
                <div>
                  <h1 className="text-xl font-bold">{name}</h1>
                  <p className="text-green-600">{price} €</p>
                </div>
                <button
                  type="button"
                  onClick={() => addCredits(creditsToAdd)}
                  className="btn btn-primary"
                >
                  Acheter
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
