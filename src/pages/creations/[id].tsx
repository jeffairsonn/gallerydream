/* eslint-disable no-nested-ternary */
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Artwork from '../../components/Artwork';

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
          console.log(res.data);
          setArtworks(res.data.attributes.artworks.data);
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
      <Container className="px-4 md:px-8 lg:px-40 gap-4 mt-4 md:mt-0 pb-16">
        <div className="flex justify-center flex-col items-center">
          <button type="button" className="btn btn-xs btn-secondary mb-2">
            {generation?.attributes?.style
              ? generation?.attributes?.style
              : generation?.attributes?.style === ''
              ? 'Aucun style'
              : 'Inconnu'}
          </button>
          <h1 className="text-3xl font-title font-extrabold">
            &rdquo; {generation?.attributes?.prompt} &rdquo;
          </h1>
          <p className="">
            <span className="font-bold">{generation?.attributes?.count}</span>{' '}
            images générée(s).
          </p>
          <div className="flex items-center space-x-2 mt-8">
            <button
              type="button"
              className="btn btn-primary btn-outline"
              onClick={() => router.back()}
            >
              <FaChevronLeft className="mr-2" /> Retour
            </button>
            <button
              onClick={() => {
                router.push(
                  `/imagine?prompt=${generation?.attributes?.prompt}`
                );
              }}
              type="button"
              className="btn btn-primary"
            >
              Généré à partir de cette idée
            </button>
          </div>
        </div>

        <div className="space-y-4 h-full w-full flex justify-center mt-12">
          <div className="w-full max-w-7xl">
            {artworks && (
              <div className="gap-4 cursor-pointer w-full grid grid-cols-1 md:grid-cols-2">
                {artworks &&
                  artworks.map(
                    ({
                      id,
                      attributes: {
                        prompt,
                        image: {
                          data: {
                            attributes: { url },
                          },
                        },
                      },
                    }: any) => (
                      <Artwork
                        key={id}
                        url={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
                        prompt={prompt}
                        id={id}
                      />
                    )
                  )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default create;
