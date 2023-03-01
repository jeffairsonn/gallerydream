// import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React from 'react';
// import ArtworkModal from './ArtworkModal';
import '../hooks/useImageRightClick';

const Artwork = ({
  url,
  prompt,
  id,
}: {
  url: string;
  prompt: string;
  id: number;
}) => {
  const router = useRouter();
  return (
    <div>
      {' '}
      <button
        type="button"
        className="w-full cursor-pointer h-full aspect-square relative"
        onClick={() => {
          router.push(`/artwork/${id}`);
        }}
      >
        <div className="h-full w-full absolute bg-black opacity-0 hover:opacity-100 ease-in duration-200 bg-opacity-50">
          <div className="flex flex-col justify-between h-full w-full p-4">
            <p className="font-medium text-left text-white text-sm lg:text-lg font-montserrat">
              &rdquo;{prompt}&rdquo;
            </p>
            <button type="button" className="btn btn-primary w-fit">
              Voir
            </button>
          </div>
        </div>
        <img src={url} className="w-full h-full" alt="" />
      </button>
      {/* <Transition
        className="z-[100] absolute"
        show={buyArtModal}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ArtworkModal
          setBuyArtModal={setBuyArtModal}
          url={url}
          prompt={prompt}
        />
      </Transition> */}
    </div>
  );
};

export default Artwork;
