import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  const { status } = useSession();
  return (
    <div className="px-4 md:px-8 lg:px-40">
      <div className=" flex justify-center mt-20 md:mt-40 flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-black text-center max-w-5xl">
          <span className="text-primary">Transformez</span> votre intérieur en
          un lieu unique avec des tableaux personnalisés créés à partir de votre
          imagination.
        </h1>
        <Link href={status === 'unauthenticated' ? '/login' : '/imagine'}>
          <button
            type="button"
            className="btn btn-primary mt-12 md:mt-16 btn-lg"
          >
            Créez votre chef-oeuvre
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
