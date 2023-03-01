import { Transition } from '@headlessui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import useWindowSize from '../hooks/useWindowSize';
import Artwork from '../components/Artwork';
import Header from '@/components/Header';
import FooterNavigation from '@/components/FooterNavigation';

const explore = () => {
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{ credits: number }>();
  const [artworks, setArtworks] = useState([]);
  const [reload] = useState(0);
  const [artworkLoading, setArtworkLoading] = useState<boolean>(true);

  const [pagination, setPagination] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<any>();
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');

  const { register, handleSubmit } = useForm();

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
  }, [data, reload]);

  useEffect(() => {
    axios
      .get(
        `/api/artworks?page=${pagination}&pageSize=${pageSize}&search=${search}`
      )
      .then((res) => {
        setPaginationMeta(res.data.meta.pagination);
        setArtworks(res.data.data);
        setArtworkLoading(false);
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pagination, pageSize, search]);

  const handleSearch = (value: any) => {
    setSearch(value.search);
  };

  return (
    <div>
      <Head>
        <title>Explorer | GalleryDream</title>
        <meta
          name="description"
          content="Parcourez les milliers de posters générés par la communauté, inspirez-vous et décoré votre maison avec les meilleurs designs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="top" />
      <Header />
      <div className="px-4 mb-4 mt-4">
        <h1 className="font-montserrat text-2xl font-bold">
          Trouvez de l&apos;inspiration ou imprimez les oeuvres créées par la
          communauté
        </h1>
      </div>
      <div className="pb-4 sticky top-20 px-4 shadow-sm bg-base-100 z-50">
        <form
          onSubmit={handleSubmit(handleSearch)}
          className="form-control w-full max-w-xl"
        >
          <div className="input-group">
            <input
              type="text"
              {...register('search')}
              placeholder='Ex : "panda", "montagne", "voiture"'
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-square btn-primary">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      <div className="px-4 pt-4 pb-24">
        {artworkLoading && (
          <div className="w-full justify-center flex">
            <div className="flex space-x-2 animate-pulse">
              <div className="rounded-full p-4 bg-primary animate-bounce ease-out" />
              <div className="rounded-full p-4 bg-primary animate-bounce" />
              <div className="rounded-full p-4 bg-primary animate-bounce ease-out" />
            </div>
          </div>
        )}
        {!artworkLoading && artworks && (
          <Transition
            show
            appear
            enter="delay-150 transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="mb-4 flex justify-center"
          >
            <p className="text-center">({paginationMeta?.total} résultats )</p>
          </Transition>
        )}
        <Transition
          show
          appear
          enter="delay-150 transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className=" text-xl grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2"
        >
          {!artworkLoading &&
            artworks &&
            artworks.map(
              ({ id, attributes: { prompt, image, stand_by_url } }: any) => (
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
                  <Artwork
                    key={id}
                    url={`${
                      image.data ? image?.data?.attributes?.url : stand_by_url
                    }`}
                    prompt={prompt}
                    id={id}
                  />
                </Transition>
              )
            )}
        </Transition>
        {!artworkLoading && artworks && artworks.length === 0 && (
          <div className="w-full flex justify-center">
            <p className="text-center">Aucun résultat trouvé</p>
          </div>
        )}
        {!artworkLoading && artworks && artworks.length > 0 && (
          <Transition
            show
            appear
            enter="delay-150 transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="mt-16 flex items-center justify-between"
          >
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm md:btn-md btn-secondary"
                onClick={() => pagination > 1 && setPagination(pagination - 1)}
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
                  <button
                    onClick={() => {
                      setPageSize(20);
                      setPagination(1);
                    }}
                    type="button"
                  >
                    20
                  </button>
                </li>
                {paginationMeta?.total > 50 && (
                  <li>
                    <button
                      onClick={() => {
                        setPageSize(50);
                        setPagination(1);
                      }}
                      type="button"
                    >
                      50
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </Transition>
        )}
      </div>
      <FooterNavigation />
    </div>
  );
};

export default explore;
