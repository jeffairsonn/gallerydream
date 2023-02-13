import React from 'react';

const Description = () => (
  <div className="px-4 md:px-8 lg:px-40 py-20 grid grid-cols-1 gap-2">
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col">
        <h3 className="text-4xl font-bold">
          Devenez le créateur de votre décoration d&apos;intérieur
        </h3>
        <div className="grid grid-cols-1 mt-4 text-justify">
          <div className="p-4 flex text-xl">
            <p className="mr-4 block">1.</p>
            <p className="block w-fit text-xl">
              <span className="text-primary font-bold">GalleryDream</span>,
              l&apos;application de décoration d&apos;intérieur innovante.
            </p>
          </div>
          <div className="p-4 flex text-xl">
            <p className="mr-4 block">2.</p>
            <p>
              <span className="text-primary font-bold">
                Créez des designs uniques
              </span>{' '}
              pour votre maison, votre appartement ou votre entreprise en
              utilisant l&apos;intelligence artificielle.
            </p>
          </div>
          <div className="p-4 flex text-xl">
            <p className="mr-4 block">3.</p>
            <p>
              <span className="text-primary font-bold">
                Imprimez vos designs
              </span>{' '}
              sous forme d&apos;affiche pour décorer votre espace.
            </p>
          </div>
        </div>
        <button type="button" className="btn md:btn-lg btn-primary w-fit mt-8">
          Essayez Gallery Dream dès maintenant.
        </button>
      </div>
    </div>
  </div>
);

export default Description;
