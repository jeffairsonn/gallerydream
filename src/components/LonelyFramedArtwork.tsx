import React from 'react';

const LonelyFramedArtwork = ({ url }: { url: string }) => (
  <div className="w-full max-full">
    <div className="border-4 border-black">
      <div className="border-2 border-gray-800 p-1">
        <img src={url} className="w-full aspect-square" alt="" />
      </div>
    </div>
  </div>
);

export default LonelyFramedArtwork;
