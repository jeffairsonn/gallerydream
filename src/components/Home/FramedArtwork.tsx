import React from 'react';
import { FaEye, FaImage } from 'react-icons/fa';

const FramedArtwork = ({ prompt, url }: { prompt: string; url: string }) => (
  <div className="shadow-lg p-4 rounded-xl">
    <div className="w-full max-w-xs">
      <div className="border-8 border-black">
        <div className="border-2 border-gray-300 p-2">
          <img src={url} className="w-full aspect-square" alt="" />
        </div>
      </div>
    </div>
    <div>
      <p className="mt-4 text-center">&rdquo;{prompt}&rdquo;</p>
      <div className="space-x-2 mt-4 flex justify-center">
        <button type="button" className="btn btn-sm btn-primary btn-outline">
          <FaImage className="mr-2" /> Utiliser cette idée
        </button>
        <button type="button" className="btn btn-sm btn-secondary">
          <FaEye className="mr-2" /> Voir
        </button>
      </div>
    </div>
  </div>
);

export default FramedArtwork;
