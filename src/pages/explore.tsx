import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Artwork from '../components/Artwork';
import Container from '../components/Container';
import Navbar from '../components/Navbar';

const explore = () => {
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{ credits: number }>();
  const [artworks, setArtworks] = useState([]);
  const [reload] = useState(0);

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
  }, [data, reload]);

  useEffect(() => {
    axios
      .get(`/api/artworks`, {})
      .then((res) => {
        setArtworks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar user={user} status={status} />
      <div className="flex justify-center items-center mb-8 p-4 py-16 bg-red-300">
        <div className="max-w-xl">
          <h1 className="text-2xl  font-bold mb-4">
            Trouver de l&apos;inspiration ou immprimez les oeuvres créé par la
            communauté
          </h1>
          <div className="form-control w-full max-w-xl">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered w-full"
              />
              <button type="button" className="btn btn-square">
                <FaSearch />
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap">
            <p className="mr-2 font-medium">Tendance :</p>
            <div className="flex space-x-2 flex-wrap">
              <button type="button" className="btn btn-xs btn-outline">
                Chat
              </button>
              <button type="button" className="btn btn-xs btn-outline">
                Voiture
              </button>
              <button type="button" className="btn btn-xs btn-outline">
                Foret
              </button>
              <button type="button" className="btn btn-xs btn-outline">
                Saint valentin
              </button>
            </div>
          </div>
        </div>
      </div>
      <Container className="mt-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Les dernières oeuvres</h1>
          <button type="button" className="btn ">
            Filtrer
          </button>
        </div>
        <div className=" text-xl grid grid-cols-2 md:grid-cols-4 gap-2">
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
      </Container>
    </div>
  );
};

export default explore;
