import { Transition } from '@headlessui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import useWindowSize from '../hooks/useWindowSize';
import Artwork from '../components/Artwork';
import Container from '../components/Container';
import Navbar from '../components/Navbar';

const explore = () => {
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{ credits: number }>();
  const [artworks, setArtworks] = useState([]);
  const [reload] = useState(0);
  const { width } = useWindowSize();

  const [pagination, setPagination] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<any>();
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [searchActive, setSearchActive] = useState('');

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
  }, [data, reload]);

  useEffect(() => {
    axios
      .get(
        `/api/artworks?page=${pagination}&pageSize=${pageSize}&search=${search}`
      )
      .then((res) => {
        setPaginationMeta(res.data.meta.pagination);
        setArtworks(res.data.data);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pagination, pageSize, search]);

  const handleSearch = () => {
    setSearch(searchActive);
  };

  return (
    <div>
      <Navbar user={user} status={status} />
      <div
        className="flex justify-center items-center py-20 px-4"
        // style={{
        //   background: `linear-gradient(
        //     rgba(0, 0, 0, 0.7),
        //     rgba(0, 0, 0, 0.7)
        //   ), url("http://localhost:1337/uploads/blob_70e27d1153.jpeg?updated_at=2023-02-06T16:03:27.773Z")`,
        // }}
        style={
          width > 768
            ? {
                backgroundImage: 'url(/assets/patternTop.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }
            : { backgroundImage: 'none' }
        }
      >
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl md:text-center font-bold font-title mb-8 text-black">
            Trouver de l&apos;inspiration ou immprimez les oeuvres créé par la
            communauté
          </h1>
          <div className="form-control w-full max-w-xl">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                value={searchActive}
                className="input input-bordered w-full"
                onChange={(evt) => setSearchActive(evt.target.value)}
              />
              <button
                type="button"
                className="btn btn-square btn-primary"
                onClick={() => handleSearch()}
              >
                <FaSearch />
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap">
            <p className="mr-2 font-medium text-black">Tendance :</p>
            <div className="flex space-x-2 flex-wrap">
              <button
                type="button"
                className="btn btn-xs btn-outline btn-primary"
                onClick={() => {
                  setSearch('homme');
                  setSearchActive('homme');
                }}
              >
                homme
              </button>
              <button
                type="button"
                className="btn btn-xs btn-outline btn-primary"
                onClick={() => {
                  setSearch('Lapin');
                  setSearchActive('Lapin');
                }}
              >
                Lapin
              </button>
              <button
                type="button"
                className="btn btn-xs btn-outline btn-primary"
                onClick={() => {
                  setSearch('love');
                  setSearchActive('love');
                }}
              >
                love
              </button>
              <button
                type="button"
                className="btn btn-xs btn-outline btn-primary"
                onClick={() => {
                  setSearch('panda');
                  setSearchActive('panda');
                }}
              >
                panda
              </button>
            </div>
          </div>
        </div>
      </div>
      <Container className=" bg-white">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Les dernières oeuvres
            </h1>
            <p>({paginationMeta?.total} résultats )</p>
          </div>
          <button type="button" className="btn ">
            Filtrer
          </button>
        </div>
        <div className=" text-xl grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
                    url={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
                    prompt={prompt}
                    id={id}
                  />
                </Transition>
              )
            )}
        </div>
        <div className="mt-16 flex items-center justify-between">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm md:btn-md "
              onClick={() => pagination > 1 && setPagination(pagination - 1)}
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
            <button type="button" tabIndex={0} className="btn btn-sm md:btn-md">
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
        </div>
      </Container>
    </div>
  );
};

export default explore;
