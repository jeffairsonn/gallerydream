import { useRouter } from 'next/router';
import React from 'react';
import { FaEye, FaImage } from 'react-icons/fa';
import useWindowSize from '../hooks/useWindowSize';

const FramedArtwork = ({
  prompt,
  url,
  id,
}: {
  prompt: string;
  url: string;
  id: number;
}) => {
  const router = useRouter();
  const { width } = useWindowSize();
  return (
    <div
      role="navigation"
      className="shadow-lg p-4 rounded-xl h-full flex flex-col justify-between items-center"
      onClick={() => width < 760 && router.push(`/artwork/${id}`)}
    >
      <div className="w-full max-w-xs">
        <div className="border-8 border-black">
          <div className="border-2 border-gray-300 p-2">
            <img src={url} className="w-full aspect-square" alt="" />
          </div>
        </div>
      </div>
      <div className="">
        <p className="mt-4 text-center line-clamp-2">&rdquo;{prompt}&rdquo;</p>
        <div className="space-x-2 md:space-x-0 mt-4 flex justify-center md:flex-col md:space-y-2">
          <button type="button" className="btn btn-sm btn-primary btn-outline">
            <FaImage className="mr-2" /> Utiliser cette idée
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary md:w-full"
            onClick={() => {
              router.push(`/artwork/${id}`);
            }}
          >
            <FaEye className="mr-2" /> Voir
          </button>
        </div>
      </div>
    </div>
  );
};

export default FramedArtwork;
