import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Container from '../components/Container';

const Creations = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{
    credits: number;
    jwt: string;
    username: string;
    email: string;
  }>();
  const [creations, setCreations] = useState<any>([]);

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

  return (
    <div>
      <Navbar user={user} status={status} />
      <Container>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-col md:flex-row items-center">
            <div className="avatar">
              <div className="w-32 mask mask-squircle">
                <img src="https://picsum.photos/200/300" alt="profile" />
              </div>
            </div>
            <div className="mt-2 md:mt-0 md:ml-4 flex-col md:flex-row items-center justify-center">
              <h1 className="text-xl md:text-2xl font-black text-center md:text-left">
                {user?.username}
              </h1>
              <p className="text-sm md:text-base break-all">{user?.email}</p>
              <button type="button" className="btn btn-primary btn-xs mt-2">
                Editer le profile
              </button>
            </div>
          </div>
          <hr className="border my-8 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 max-w-7xl">
            {creations &&
              creations?.map(
                ({
                  id: creation_id,
                  attributes: {
                    prompt,
                    artworks: { data: artwork },
                  },
                }: any) => (
                  <div className="p-8   shadow-xl flex flex-col justify-between">
                    {artwork.length > 1 && (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {artwork.map(
                          ({
                            attributes: {
                              image: {
                                data: {
                                  attributes: { url },
                                },
                              },
                            },
                          }: any) => (
                            <div className="aspect-square w-full rounded-md">
                              <img
                                className="w-full aspect-square  "
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
                                alt=""
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {artwork.length === 1 && (
                      <div className="grid grid-cols-1 gap-2 mt-4">
                        {artwork.map(
                          ({
                            attributes: {
                              image: {
                                data: {
                                  attributes: { url },
                                },
                              },
                            },
                          }: any) => (
                            <div className="aspect-square w-full rounded-md">
                              <img
                                className="w-full aspect-square  "
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
                                alt=""
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                    <div className="mt-8">
                      <h3 className="font-bold text-xl line-clamp-2 ">
                        &quot;{prompt}&quot;
                      </h3>
                      <Link href={`/imagine/${creation_id}`}>
                        <button type="button" className="btn btn-primary mt-8">
                          Parcourir
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              )}
            {(!creations || creations.length === 0) && (
              <div className="p-8   shadow-xl">
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
      </Container>
    </div>
  );
};

export default Creations;
