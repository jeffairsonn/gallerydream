import React from 'react';
import { MdOutlineClose } from 'react-icons/md';

const About = ({ setisOpenAboutModal }: any) => {
  console.log('abloute');
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[300] p-4 flex justify-center items-center">
      <div
        role="navigation"
        onClick={() => setisOpenAboutModal(false)}
        className="bg-black bg-opacity-50 h-full w-full absolute top-0 left-0"
      />
      <div className="space-y-2 z-[400]">
        <div className="p-4 bg-white w-full rounded-xl text-sm max-h-96 overflow-y-scroll ">
          <h2 className="font-bold text-2xl mb-4">
            Créez des œuvres d'art personnalisées en quelques clics avec
            GalleryDream
          </h2>
          <p>
            Chez GalleryDream, nous croyons que tout le monde devrait avoir la
            possibilité de créer des œuvres d'art personnalisées, sans avoir à
            prendre rendez-vous ou à visiter une galerie d'art coûteuse. Avec
            notre service en ligne facile à utiliser, vous pouvez créer des
            œuvres d'art uniques en quelques clics seulement.
          </p>
          <br />
          <p>
            Notre technologie de pointe basée sur l'intelligence artificielle
            génère des œuvres d'art uniques à partir de vos idée et du style que
            vous aurez choisi. Vous pouvez facilement explorer différents styles
            d'art, des abstractions aux portraits, en passant par des paysages,
            et choisir celui qui correspond le mieux à votre vision.
          </p>
          <br />
          <p>
            Une fois que vous êtes satisfait de votre création, vous pouvez
            facilement commander une impression de haute qualité de votre œuvre
            d'art personnalisée sur du papier fine art. Nous vous enverrons
            ensuite votre commande directement chez vous, prête à être encadrée
            et exposée.
          </p>
          <br />

          <p>
            Avec GalleryDream, la création d'œuvres d'art personnalisées n'a
            jamais été aussi facile et abordable. Donnez vie à votre imagination
            et créez des œuvres d'art qui reflètent votre style et votre
            personnalité.
          </p>
        </div>
        <button
          type="button"
          className="btn w-full btn-primary"
          onClick={() => setisOpenAboutModal(false)}
        >
          <MdOutlineClose className="mr-2 text-2xl" /> Fermer
        </button>
      </div>
    </div>
  );
};

export default About;
