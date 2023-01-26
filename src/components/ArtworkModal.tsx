import React from 'react';

const ArtworkModal = ({ setBuyArtModal }: { setBuyArtModal: any }) => (
  <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 px-4 md:px-8 lg:px-40 flex justify-center items-center">
    <div className="p-4 bg-base-100 rounded-xl w-fit relative">
      <button
        type="button"
        className="btn btn-sm btn-circle absolute btn-primary right-6 top-6"
        onClick={() => setBuyArtModal(false)}
      >
        X
      </button>
      <img
        src="https://api.lorem.space/image?w=500&h=500"
        className="w-full h-full aspect-square object-cover rounded-lg"
        alt=""
      />
      <h3 className="text-xl font-bold mt-4 text-center">
        Prompt de l&apos;image qui a été genereé
      </h3>
      <div className="mt-4 space-y-2">
        <button type="button" className="btn btn-secondary btn-outline w-full">
          Générer une nouvelle oeuvre
        </button>
        <button type="button" className="btn btn-primary w-full">
          Acheter et imprimer !
        </button>
      </div>
    </div>
  </div>
);

export default ArtworkModal;
