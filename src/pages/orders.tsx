import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Transition } from '@headlessui/react';
import { format } from 'date-fns';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Container from '../components/Container';
import posters from '../lib/poster_price';
import FooterNavigation from '../components/FooterNavigation';

const Orders = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{
    credits: number;
    jwt: string;
    username: string;
    email: string;
    id: number;
  }>();
  const [orders, setOrders] = useState<any>([]);
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
        .get(`/api/orders?page=${pagination}&pageSize=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          setPaginationMeta(res.data.meta.pagination);
          setOrders(res.data.data);
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
      <Head>
        <title>Mes commandes</title>
        <meta
          name="description"
          content="Retrouvez l'ensemble des commandes que vous avez passer sur la plateforme"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="top" />
      <Navbar user={user} status={status} />
      <Container>
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-16">
            Mes commandes
          </h1>
          <div>
            {creationLoading && (
              <div className="flex space-x-2 animate-pulse">
                <div className="rounded-full p-4 bg-primary animate-bounce ease-out" />
                <div className="rounded-full p-4 bg-primary animate-bounce" />
                <div className="rounded-full p-4 bg-primary animate-bounce ease-out" />
              </div>
            )}
          </div>
          {!creationLoading && orders.length === 0 && (
            <div className="flex justify-center flex-col space-y-2">
              <p className="text-center">Pas encore de commandes</p>
              <button
                onClick={() => router.push('/imagine')}
                type="button"
                className="btn btn-primary "
              >
                Créer une œuvre
              </button>
            </div>
          )}
          {orders.length > 0 && (
            <Transition
              show
              appear
              enter="delay-150 transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="w-full flex justify-center flex-col items-center"
            >
              <div className="hidden md:grid grid-cols-1 md:grid-cols-7 w-full max-w-7xl mb-4 rounded-md">
                <div className="p-2 rounded-l-md">Ouevre</div>
                <div className="p-2">N° de commande</div>
                <div className="p-2">Date</div>
                <div className="p-2">Status</div>
                <div className="p-2">Nbr.</div>
                <div className="p-2">Taille</div>
                <div className="p-2 rounded-r-md">Prix total</div>
              </div>
              <div className="grid grid-cols-1 w-full gap-4 max-w-7xl">
                {!creationLoading &&
                  orders &&
                  orders.map(
                    ({
                      id: order_id,
                      attributes: {
                        artworks: { data: artwork },
                        amount_total,
                        metadata,
                        createdAt,
                        status: order_status,
                      },
                    }: any) => {
                      const parsemetadata = metadata;
                      const parseLineItems = parsemetadata.line_items;
                      const numberOfItems = parseLineItems.length;
                      const { price_id } = parseLineItems[0];

                      const size = posters.filter((poster) =>
                        process.env.NEXT_PUBLIC_MODE === 'dev'
                          ? poster.price_id === price_id
                          : poster.live_price_id === price_id
                      )[0]?.name;
                      return (
                        <Transition
                          show
                          appear
                          enter="delay-150 transition-opacity duration-150"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="w-full border border-black bg-white rounded-md flex"
                        >
                          <div className="grid md:grid-cols-7 space-x-scroll">
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
                                <div className="rounded-t-md md:rounded-l-md md:rounded-tl-none">
                                  <img
                                    className="w-full aspect-square rounded-t-md md:rounded-l-md md:rounded-tr-none"
                                    src={`${url}`}
                                    alt=""
                                  />
                                </div>
                              )
                            )}
                            <div className="md:flex justify-center items-center md:border border-black p-2">
                              <span className="md:hidden mr-1 font-bold">
                                Commande n° :{' '}
                              </span>{' '}
                              {order_id}
                            </div>
                            <div className="md:flex justify-center items-center md:border border-black p-2">
                              <span className="md:hidden mr-1 font-bold">
                                Passé le :
                              </span>
                              {format(new Date(createdAt), 'dd/MM/yyy')}
                            </div>
                            <div className="md:flex justify-center items-center md:border border-black p-2">
                              <span className="md:hidden mr-1 font-bold">
                                Statut :{' '}
                              </span>
                              {order_status || 'Status inconnu'}
                            </div>
                            <div className="md:flex justify-center items-center md:border border-black p-2">
                              <span className="md:hidden mr-1 font-bold">
                                Nombre d&apos;article :{' '}
                              </span>
                              {numberOfItems}
                            </div>
                            <div className="md:flex justify-center items-center md:border border-black p-2">
                              <span className="md:hidden mr-1 font-bold">
                                Taille :{' '}
                              </span>
                              {size}
                            </div>
                            <div className="md:flex justify-center items-center md:border border-black p-2 md:rounded-r-md">
                              <span className="md:hidden mr-1 font-bold">
                                Total :{' '}
                              </span>
                              {amount_total} €
                            </div>
                          </div>
                        </Transition>
                      );
                    }
                  )}
                {!creationLoading && (!orders || orders.length === 0) && (
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
              {!creationLoading && !(!orders || orders.length === 0) && (
                <Transition
                  show
                  appear
                  enter="delay-150 transition-opacity duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="mt-16 flex items-center w-full justify-between max-w-7xl"
                >
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
                </Transition>
              )}
            </Transition>
          )}
        </div>
      </Container>
      <FooterNavigation />
    </div>
  );
};

export default Orders;
