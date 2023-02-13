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
        <button
          type="button"
          className="btn btn-primary btn-outline mb-4"
          onClick={() => router.back()}
        >
          <FaChevronLeft className="mr-2" /> Retour
        </button>
        <div className="grid grid-cols-1 md:grid-cols-6 space-y-4 md:space-y-0 md:gap-4 h-full w-full">
          <aside className="col-span-2 w-full">
            <h1 className="text-2xl font-extrabold">
              {generation?.attributes?.prompt}
            </h1>
            <p className="mt-2">
              Image générée par{' '}
              <span className="underline">{user?.username}</span>.
            </p>
            <p className="">
              <span className="font-bold">{generation?.attributes?.count}</span>{' '}
              images générées.
            </p>
            <button
              onClick={() => {
                router.push(
                  `/imagine?prompt=${generation?.attributes?.prompt}`
                );
              }}
              type="button"
              className="btn btn-primary w-full mt-4"
            >
              Généré à partir de cette idée
            </button>
          </aside>
          <div className="col-span-4">
            {artworks && artworks.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 cursor-pointer">
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
            {artworks && artworks.length === 1 && (
              <div className="grid grid-cols-1 gap-2 md:gap-4">
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
                      <div key={id} className="aspect-square w-full">
                        <Artwork
                          key={id}
                          url={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
                          prompt={prompt}
                          id={id}
                        />
                      </div>
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
