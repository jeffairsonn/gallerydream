import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';

const Hero = () => {
  const { status } = useSession();
  const { width } = useWindowSize();
  return (
    <div
      className="h-[600px] md:h-[800px] max-h-screen"
      style={{
        background:
          width > 750
            ? `linear-gradient(
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.4)
        ), center / cover no-repeat url(/assets/bghero.png)`
            : `linear-gradient(
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.4)
        ), top / cover no-repeat url(/assets/bgherosm.png)`,
      }}
    >
      <div className="px-4 md:px-8 lg:px-40 flex flex-col h-full justify-center">
        <h1 className="text-3xl md:text-5xl font-black max-w-4xl text-white">
          Créez une décoration unique pour votre maison avec GalleryDream.
        </h1>
        <p className="text-white mt-2">
          Créez votre première œuvre d&apos;art aujourd&apos;hui
        </p>
        <Link href={status === 'unauthenticated' ? '/login' : '/imagine'}>
          <button
            type="button"
            className="btn btn-primary mt-4 md:mt-8 md:btn-lg"
          >
            Inscrivez-vous gratuitement !
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
