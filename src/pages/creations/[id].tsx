/* eslint-disable no-nested-ternary */
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft } from 'react-icons/fa';
import { Transition } from '@headlessui/react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Artwork from '../../components/Artwork';

const create = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<any>();
  const [generation, setGeneration] = useState<any>();
  const [artworks, setArtworks] = useState<any>();
  const [loadGeneration, setLoadGeneration] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      axios
        .get(`/api/user/verify`, {
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
          setGeneration(res.data);
          setLoadGeneration(false);
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

  if (loadGeneration) {
    return (
      <>
        <Navbar user={user} status={status} />
        <Container className="px-4 md:px-8 lg:px-40 gap-4 mt-4 md:mt-0 pb-16">
          <div className="flex justify-center flex-col items-center">
            <div className="w-full justify-center flex">
              <div className="flex space-x-2 animate-pulse">
                <div className="rounded-full p-4 bg-primary animate-bounce ease-out" />
                <div className="rounded-full p-4 bg-primary animate-bounce" />
                <div className="rounded-full p-4 bg-primary animate-bounce ease-out" />
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
  return (
    <>
      <Navbar user={user} status={status} />
      <Transition
        show
        appear
        enter="delay-150 transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Container className="px-4 md:px-8 lg:px-40 gap-4 mt-4 md:mt-0 pb-16">
          <div className="flex justify-center flex-col items-center">
            <button type="button" className="btn btn-xs btn-secondary mb-2">
              {generation?.attributes?.style
                ? generation?.attributes?.style
                : generation?.attributes?.style === ''
                ? 'Aucun style'
                : 'Inconnu'}
            </button>
            {generation?.attributes?.prompt && (
              <h1 className="text-3xl font-title font-extrabold text-center">
                &rdquo; {generation?.attributes?.prompt} &rdquo;
              </h1>
            )}
            <p className="">
              <span className="font-bold">{generation?.attributes?.count}</span>{' '}
              images générée(s).
            </p>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center space-x-2 mt-8">
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
                          url={`${url}`}
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
      </Transition>
    </>
  );
};

export default create;
