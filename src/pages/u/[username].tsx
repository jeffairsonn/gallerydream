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
          window.scrollTo(0, 0);
          setCreationLoading(false);
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
      <Navbar user={user} status={status} />
      <Container>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-col items-center">
            <div className="avatar">
              <div className="w-32 mask mask-circle">
                <img src="https://picsum.photos/200/300" alt="profile" />
              </div>
            </div>
            <div className="mt-2 flex-col items-center justify-center">
              <h1 className="text-xl font-black text-center">
                @{user?.username}
              </h1>
              <p className="text-sm md:text-base break-all">{user?.email}</p>
              <div className="w-full justify-center flex">
                <button
                  type="button"
                  onClick={() => {
                    router.push(`/profile/edit/${user?.id}`);
                  }}
                  className="btn btn-primary btn-xs mt-2"
                >
                  Editer le profile
                </button>
              </div>
            </div>
          </div>
          <div className="tabs my-12">
            <button type="button" className="tab tab-bordered">
              ({paginationMeta?.total}) Mes créations
            </button>
            <button
              type="button"
              className="tab tab-bordered border-black tab-active"
            >
              Œuvres Publiées
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4 max-w-7xl">
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
                  <div className="p-8 border flex flex-col justify-between">
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
                                src={`${url}`}
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
                                src={`${url}`}
                                alt=""
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                    <div className="mt-8">
                      <h3 className="font-bold text line-clamp-2 ">{prompt}</h3>
                      <Link href={` /creations/${creation_id}`}>
                        <button type="button" className="btn btn-primary mt-8">
                          Parcourir
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              )}
            {!creationLoading && (!creations || creations.length === 0) && (
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
          {!creationLoading && !(!creations || creations.length === 0) && (
            <div className="mt-16 flex items-center w-full justify-between">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm md:btn-md "
                  onClick={() =>
                    pagination > 1 && setPagination(pagination - 1)
                  }
                >
                  <FaChevronLeft />
                </button>
                <button type="button" className="btn btn-sm md:btn-md">
                  {pagination}
                </button>
                <button
                  type="button"
                  className="btn btn-sm md:btn-md"
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
                  className="btn btn-sm md:btn-md"
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
