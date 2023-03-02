/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import { useRouter } from 'next/router';
import Navbar from '../Navbar';
import useWindowSize from '../../hooks/useWindowSize';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from './Footer';
import FooterNavigation from '../FooterNavigation';

const Home = () => {
  const router = useRouter();
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
      url: 'https://gallerydream.ams3.digitaloceanspaces.com/96816b71fe016e6e87111d4fe708f8ec.jpeg',
    },
    {
      url: 'https://gallerydream.ams3.digitaloceanspaces.com/924e1780d92f150b759a35f14fb9d9b4.jpeg',
    },
    {
      url: 'https://gallerydream.ams3.digitaloceanspaces.com/601a69013397119a901a5f7f1d5a08cc.jpeg',
    },
    {
      url: 'https://gallerydream.ams3.digitaloceanspaces.com/3a5b85ca74796627730ed54848217e1d.jpeg',
    },
    {
      url: 'https://gallerydream.ams3.digitaloceanspaces.com/3c3773eb5673e325389ab9cfed080454.jpeg',
    },
    {
      url: 'https://gallerydream.ams3.digitaloceanspaces.com/bf715402fd4d5517377c0ba606794579.jpeg',
    },
    {
      url: 'https://gallerydream.ams3.digitaloceanspaces.com/06e4c47f33d05c4157d3ba6f84de98f3.jpeg',
    },
    {
      url: 'https://gallerydream.ams3.digitaloceanspaces.com/598d75ce4d968fb090da97af9d0e9dd6.jpeg',
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
              return (
                <img
                  src={currentImage.url}
                  className="w-full border-2 border-black "
                  alt=""
                />
              );
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
          <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl lg:text-6xl text-black lg:text-center lg:max-w-4xl">
            Créez une décoration unique pour votre maison avec GalleryDream.
          </h1>
          <p className="text-lg md:text-xl mt-4 text-slate-600 leading-6 lg:text-center lg:max-w-xl">
            Créez votre première œuvre d&apos;art aujourd&apos;hui à l&apos;aide
            de{' '}
            <span className="text-primary">
              l&apos;intelligence artificielle
            </span>
          </p>
          <button
            onClick={() =>
              status === 'authenticated'
                ? router.push('/imagine')
                : router.push('/register')
            }
            type="button"
            className="btn btn-lg btn-primary mt-12"
          >
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
        <h2 className="font-montserrat font-extrabold text-4xl md:text-7xl lg:text-5xl text-black lg:text-center lg:max-w-4xl">
          Donnez vie à votre imagination en créant des œuvres d&apos;art uniques
          avec GalleryDream
        </h2>
        <div className="mt-16 space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 max-w-7xl">
          <div className="flex">
            <div className="btn btn-square btn-primary mr-4 text-2xl font-montserrat">
              1
            </div>
            <div>
              <p className="text-3xl lg:text-2xl font-bold font-montserrat">
                Exprimez votre idée créative
              </p>
              <p className="mt-4 text-lg">
                Décrivez votre idée en utilisant nos prompts et laissez
                l&apos;intelligence artificielle créer une affiche unique pour
                vous.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="btn btn-square btn-primary mr-4 text-2xl font-montserrat">
              2
            </div>
            <div>
              <p className="text-3xl lg:text-2xl font-bold font-montserrat">
                Choisissez un style
              </p>
              <p className="mt-4 text-lg">
                Donnez une touche artistique à votre idée en choisissant parmi
                notre large sélection de styles et de thèmes. Créez ainsi une
                affiche qui vous ressemble vraiment.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="btn btn-square btn-primary mr-4 text-2xl font-montserrat">
              3
            </div>
            <div>
              <p className="text-3xl lg:text-2xl font-bold font-montserrat">
                Imprimez votre œuvre
              </p>
              <p className="mt-4 text-lg">
                Imprimez de haute qualité. Obtenez ainsi une œuvre d&apos;art
                unique, pièce maîtresse de votre décoration intérieure.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() =>
              status === 'authenticated'
                ? router.push('/imagine')
                : router.push('/register')
            }
            type="button"
            className="btn btn-lg btn-primary mt-12"
          >
            Tester maintenant !
          </button>
        </div>
      </div>
      <Footer />
      <FooterNavigation />

      {/* <Gallery /> */}
      {/* <Step /> */}
    </div>
  );
};

export default Home;
