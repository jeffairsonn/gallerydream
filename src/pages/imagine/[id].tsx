import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const create = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<any>();
  const [generation, setGeneration] = useState<any>();
  const [artworks, setArtworks] = useState<any>();

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
        .get(`/api/artwork_group/${router.query.id}`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          setArtworks(res.data.attributes.artworks.data);
          console.log(res.data.attributes.artworks.data);
          setGeneration(res.data);
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
      <div className="px-4 md:px-8 lg:px-40 gap-4 mt-4 md:mt-0 pb-16">
        <div className=" grid grid-cols-1 md:grid-cols-6 gap-4 h-full">
          <aside className="col-span-2 rounded-3xl">
            <h1 className="text-2xl font-extrabold">
              {generation?.attributes?.prompt}
            </h1>
            <p className="mt-2">
              Image générée par <span className="underline">LLoris77</span>.
            </p>
            <p className="">
              <span className="font-bold">{generation?.attributes?.count}</span>{' '}
              images générées.
            </p>
          </aside>
          <div className="col-span-4">
            {artworks && artworks.length > 1 && (
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {artworks &&
                  artworks.map(
                    ({
                      id,
                      attributes: {
                        image: {
                          data: {
                            attributes: { url },
                          },
                        },
                      },
                    }: any) => {
                      console.log(url);
                      return (
                        <div
                          key={id}
                          className="aspect-square w-full bg-primary rounded-3xl"
                        >
                          <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
                            className="w-full aspect-square rounded-3xl"
                            alt=""
                          />
                        </div>
                      );
                    }
                  )}
              </div>
            )}
            {artworks && artworks.length === 1 && (
              <div className="grid grid-cols-1 gap-2 md:gap-4">
                {artworks &&
                  artworks.map(
                    ({
                      id,
                      attributes: {
                        image: {
                          data: {
                            attributes: { url },
                          },
                        },
                      },
                    }: any) => {
                      console.log(url);

                      return (
                        <div
                          key={id}
                          className="aspect-square w-full bg-primary rounded-3xl"
                        >
                          <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
                            className="w-full aspect-square rounded-3xl"
                            alt=""
                          />
                        </div>
                      );
                    }
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default create;
