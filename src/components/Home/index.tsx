/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import Navbar from '../Navbar';
import useWindowSize from '../../hooks/useWindowSize';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from './Footer';

const Home = () => {
  const { status, data }: any = useSession();
  const [user, setUser] = useState();
  const { width } = useWindowSize();

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

  const img = [
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
    {
      url: 'https://picsum.photos/300/300',
    },
  ];

  const getSwipperSlides = () => {
    const content: any = [];
    const gridCols = width > 1024 ? 4 : width > 768 ? 4 : 2;

    for (let i = 0; i < img.length / gridCols; i += 1) {
      content.push(
        <SwiperSlide className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full">
          {img.map((currentImage, index) => {
            if (index >= i * gridCols && index < (i + 1) * gridCols) {
              return <img src={currentImage.url} className="w-full" alt="" />;
            }
            return null;
          })}
        </SwiperSlide>
      );
    }
    return content;
  };

  return (
    <div>
      <Navbar user={user} status={status} />
      <div
        className="px-8 md:px-16 h-screen"
        style={{
          backgroundImage: 'url(/assets/patternTop.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="mt-20 md:mt-28 lg:flex lg:flex-col lg:justify-center lg:items-center">
          <h1 className="font-title font-extrabold text-4xl md:text-7xl lg:text-6xl text-black lg:text-center lg:max-w-2xl">
            Créez une affiche unique pour votre maison avec{' '}
            <span className="text-primary">GalleryDream.</span>
          </h1>
          <p className="text-lg md:text-xl mt-4 text-slate-600 leading-6 lg:text-center lg:max-w-2xl">
            Faites de votre maison un endroit qui vous ressemble en créant vos
            propres affiches avec l&apos;intelligence artificielle
          </p>
          <button type="button" className="btn btn-lg btn-primary mt-12">
            Tester gratuitement !
          </button>
          <Swiper
            slidesPerView={1}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mt-8 mb-8 px-8 md:px-16 lg:max-w-6xl w-full"
          >
            {getSwipperSlides()}
          </Swiper>
        </div>
      </div>
      <div className="px-4 mt-16 lg:mt-28 md:px-16 lg:flex lg:flex-col lg:justify-center lg:items-center mb-8">
        <h2 className="font-title font-extrabold text-4xl md:text-7xl lg:text-6xl text-black lg:text-center lg:max-w-4xl">
          Et si vous décoriez votre maison avec votre imagination ?
        </h2>
        <div className="mt-16 space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 max-w-7xl">
          <div className="flex">
            <div className="btn btn-square btn-primary mr-4 text-2xl font-title">
              1
            </div>
            <div>
              <p className="text-3xl lg:text-2xl font-bold font-title">
                Décrivez votre idée.
              </p>
              <p className="mt-4 text-lg">
                Décrivez votre idée de la manière que vous le souhaitez : ex:
                &ldquo;un panda dans l&apos;espace&ldquo;, &ldquo;un chat qui
                fait du sport&ldquo; etc...
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="btn btn-square btn-primary mr-4 text-2xl font-title">
              2
            </div>
            <div>
              <p className="text-3xl lg:text-2xl font-bold font-title">
                Donnez un style à votre idée.
              </p>
              <p className="mt-4 text-lg">
                Choisissez parmis un pannel de style afin de donner la touche
                artistique de votre choix à votre idée.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="btn btn-square btn-primary mr-4 text-2xl font-title">
              3
            </div>
            <div>
              <p className="text-3xl lg:text-2xl font-bold font-title">
                Imprimez c&apos;est gagné !
              </p>
              <p className="mt-4 text-lg">
                Choisissez parmis les variantes généres par l&apos;intelligence
                artificielle puis imprimez votre affiche !
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="button" className="btn btn-lg btn-primary mt-12">
            Tester maintenant !
          </button>
        </div>
      </div>
      <Footer />

      {/* <Gallery /> */}
      {/* <Step /> */}
    </div>
  );
};

export default Home;
