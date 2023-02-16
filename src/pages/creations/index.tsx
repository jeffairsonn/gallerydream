import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';

const Creations = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{
    credits: number;
    jwt: string;
    username: string;
    email: string;
    id: number;
  }>();
  const [creations, setCreations] = useState<any>([]);
  const [creationLoading, setCreationLoading] = useState<boolean>(true);

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

  const [pagination, setPagination] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<any>();
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/artwork_group?page=${pagination}&pageSize=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          setPaginationMeta(res.data.meta.pagination);
          setCreations(res.data.data);
          setCreationLoading(false);
          document
            .getElementById('top')
            ?.scrollIntoView({ behavior: 'smooth' });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, pagination, pageSize]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <div>
      <div id="top" />
      <Navbar user={user} status={status} />
      <Container>
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold font-title mb-16">
            Mes créations
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 max-w-7xl">
            {!creationLoading &&
              creations &&
              creations?.map(
                ({
                  id: creation_id,
                  attributes: {
                    prompt,
                    artworks: { data: artwork },
                  },
                }: any) => (
                  <div className=" border border-black bg-white rounded-lg flex flex-col justify-between">
                    {artwork.length > 1 && (
                      <div className="grid grid-cols-2">
                        {artwork.map(
                          (
                            {
                              attributes: {
                                image: {
                                  data: {
                                    attributes: { url },
                                  },
                                },
                              },
                            }: any,
                            index: number
                          ) => (
                            <div className="aspect-square w-full rounded-md first:rounded-md">
                              <img
                                className={`w-full aspect-square ${
                                  index === 0 && `rounded-tl-md`
                                } ${index === 1 && `rounded-tr-md`}`}
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
                                alt=""
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {artwork.length === 1 && (
                      <div className="grid grid-cols-1 gap-2">
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
                                className="w-full aspect-square rounded-t-md"
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
                                alt=""
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                    <div className=" p-4">
                      <h3 className="font-bold text line-clamp-2">{prompt}</h3>
                      <Link href={`/creations/${creation_id}`}>
                        <button type="button" className="btn btn-primary mt-8">
                          Parcourir
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              )}
            {!creationLoading && (!creations || creations.length === 0) && (
              <div className="p-8 border border-black rounded-md">
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
          {!creationLoading && !(!creations || creations.length === 0) && (
            <div className="mt-16 flex items-center w-full justify-between max-w-7xl">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm md:btn-md btn-secondary"
                  onClick={() =>
                    pagination > 1 && setPagination(pagination - 1)
                  }
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  className="btn btn-sm md:btn-md btn-secondary"
                >
                  {pagination}
                </button>
                <button
                  type="button"
                  className="btn btn-sm md:btn-md btn-secondary"
                  onClick={() =>
                    pagination < paginationMeta?.pageCount &&
                    setPagination(pagination + 1)
                  }
                >
                  <FaChevronRight />
                </button>
              </div>
              <div className="dropdown dropdown-top dropdown-end">
                <button
                  type="button"
                  tabIndex={0}
                  className="btn btn-sm md:btn-md btn-secondary"
                >
                  {paginationMeta?.pageSize} par page
                </button>
                <ul
                  tabIndex={0}
                  role="menu"
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <button onClick={() => setPageSize(8)} type="button">
                      8
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setPageSize(16)} type="button">
                      16
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Creations;
