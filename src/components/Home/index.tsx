/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaArrowRight } from 'react-icons/fa';
import autosize from 'autosize';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MdArrowUpward } from 'react-icons/md';
import { Transition } from '@headlessui/react';
import FramedArtwork from './FramedArtwork';
import FooterNavigation from '../FooterNavigation';
import Header from '../Header';
import ChooseStyle from './ChooseStyle';

const Home = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState();

  const [artworks, setArtworks] = useState([]);
  const [reload] = useState(0);
  const [artworkLoading, setArtworkLoading] = useState<boolean>(true);
  const [modalChooseStyle, setModalChooseStyle] = useState(false);

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  }, []);

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
    axios
      .get(`/api/artworks?page=1&pageSize=10`)
      .then((res) => {
        setArtworks(res.data.data);
        setArtworkLoading(false);
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="top">
      <ChooseStyle show={modalChooseStyle} />
      <Header />
      <div className="px-4 mb-4 mt-4">
        <h1 className="font-montserrat text-2xl font-bold">
          Transformez vos idées en oeuvre d&apos;art unique
        </h1>
        <p className="font-montserrat mt-2">
          Transformez vos idées en une œuvre d&apos;art murale jamais vue
          auparavant ! Entrez votre idée dès maintenant.
        </p>
      </div>
      <div className="pb-4 sticky top-20 px-4 shadow-sm bg-base-100">
        <textarea
          rows={1}
          placeholder="Tapez votre idée ici..."
          className="textarea textarea-bordered overflow-hidden outline-none w-full text-center px-8 text-base"
        />
        <button
          onClick={() => setModalChooseStyle(true)}
          type="button"
          className="w-full btn btn-primary btn-md mt-1"
        >
          Créer mon oeuvre <FaArrowRight className="ml-2" />
        </button>
      </div>
      <div className="mt-8 px-4 space-y-4 pb-24">
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-xl font-bold max-w-xs">
            Les dernières oeuvres créées par la communauté
          </h2>
          <hr className="max-w-xs w-8" />
        </div>
        <div className="space-y-8">
          {/* {artworkLoading && (
            <div className="w-full justify-center flex">
              <div className="flex space-x-2 animate-pulse">
                <div className="rounded-full p-4 bg-primary animate-bounce ease-out" />
                <div className="rounded-full p-4 bg-primary animate-bounce" />
                <div className="rounded-full p-4 bg-primary animate-bounce ease-out" />
              </div>
            </div>
          )} */}
          {!artworkLoading &&
            artworks &&
            artworks.map(
              ({ id, attributes: { prompt, image, stand_by_url } }: any) => (
                <FramedArtwork
                  key={id}
                  prompt={prompt}
                  url={
                    image?.data ? image?.data?.attributes?.url : stand_by_url
                  }
                />
              )
            )}
        </div>
        {!artworkLoading && (
          <div className="space-y-4">
            <div className="flex space-x-4 justify-center">
              <MdArrowUpward className="text-4xl text-primary" />
              <MdArrowUpward className="text-4xl text-primary" />
              <MdArrowUpward className="text-4xl text-primary" />
            </div>
            <button
              onClick={() => {
                document
                  .getElementById('top')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              type="button"
              className="btn btn-primary w-full btn-outline"
            >
              Retour au top !
            </button>
          </div>
        )}
      </div>
      <FooterNavigation />
    </div>
  );
};

export default Home;
