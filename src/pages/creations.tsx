import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const Creations = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{ credits: number; jwt: string }>();
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    if (data) {
      axios
        .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/artwork_group`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCreations(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  const images = ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'];

  return (
    <div>
      <Navbar user={user} status={status} />
      <div className="px-4 md:px-8 lg:px-40  gap-4 pb-16 pt-8 space-y-20">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-black max-w-5xl mb-12 w-full text-center">
            Mes créations
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 max-w-7xl">
            {creations &&
              creations?.map(({ attributes: { prompt } }) => (
                <div className="p-8 rounded-3xl shadow-xl">
                  <h3 className="font-bold text-xl">&quot;{prompt}&quot;</h3>
                  <div className="grid grid-cols-5 gap-2 mt-4">
                    {images.map(() => (
                      <div className="aspect-square w-full rounded-md">
                        <img
                          className="w-full aspect-square rounded-md"
                          src="https://picsum.photos/200/300"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn btn-primary mt-8">
                    Parcourir
                  </button>
                </div>
              ))}
            {(!creations || creations.length === 0) && (
              <div className="p-8 rounded-3xl shadow-xl">
                <h3 className="font-bold text-xl">Aucune création</h3>
                <p className="mt-4">
                  Vous n&apos;avez pas encore généré de création. Pour cela,
                  cliquez sur le bouton ci-dessous
                </p>
                <Link href="/imagine">
                  <button type="button" className="mt-4 btn btn-primary">
                    Générer
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creations;
