import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaDownload } from 'react-icons/fa';
import posters from '../lib/poster_price';
import '../hooks/useImageRightClick';
import useWindowSize from '../hooks/useWindowSize';

const ArtworkModal = ({
  setBuyArtModal,
  url,
  prompt,
}: {
  setBuyArtModal: any;
  url: string;
  prompt: string;
}) => {
  const { width } = useWindowSize();

  const [selectedProduct, setSelectedProduct] = useState<string>(
    posters[0].stripe_price_id
  );
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    console.log(selectedProduct);
  }, [selectedProduct]);

  const downloadImage = () => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // This tells the browser to request cross-origin access when trying to download the image data.
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#Implementing_the_save_feature
    img.src = url;
    img.onload = () => {
      // create Canvas
      const canvas = document.createElement('canvas');
      const ctx: any = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // create a tag
      const a = document.createElement('a');
      a.download = `${prompt.replaceAll(' ', '_')}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  };
  return (
    <div className="w-full h-screen fixed top-0 left-0 md:bg-black bg-opacity-50 z-50 md:px-8 md:flex md:justify-center md:items-center">
      <div className="bg-white max-w-xl p-0 w-full grid grid-cols-1 gap-4">
        <div className="relative">
          <div className="absolute top-4 left-4 space-x-2 bg-black bg-opacity-50 p-2 rounded">
            <button
              type="button"
              className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-black hover:border-white"
              onClick={() => setBuyArtModal(false)}
            >
              <FaChevronLeft className="mr-2" /> retour
            </button>
            <button
              onClick={() => downloadImage()}
              type="button"
              className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-black hover:border-white"
            >
              <FaDownload />
            </button>
          </div>
          <img src={url} className="w-full h-full rounded-t-sm" alt="" />
        </div>
        <div className="flex flex-col justify-between p-4">
          <div className="">
            <h3 className="font-extrabold text-xl">{prompt}</h3>
            <p className="font-medium mb-4">
              Choissez une taille, imprimez votre oeuvre, et recevez votre
              poster en 48h. Livraison incluse !
            </p>
            <div className="mb-4 flex gap-2">
              <div className="form-control w-full max-w-xs mb-2">
                <label htmlFor="quantity" className="label">
                  <span className="label-text font-bold">Taille</span>
                </label>
                <select
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled selected>
                    Choisir une taille
                  </option>
                  {posters.map(({ name, stripe_price_id }) => (
                    <option key={stripe_price_id} value={stripe_price_id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full max-w-xs">
                <label htmlFor="quantity" className="label">
                  <span className="label-text font-bold">Quantité</span>
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    parseInt(e.target.value, 10) > 0 &&
                    setQuantity(parseInt(e.target.value, 10))
                  }
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="mt-8">
              <p className="mb-4 font-bold" />
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setBuyArtModal(false)}
                  className="btn w-full btn-accent"
                >
                  {(
                    posters.filter(
                      ({ stripe_price_id }) =>
                        stripe_price_id === selectedProduct
                    )[0].price * quantity
                  ).toFixed(2)}{' '}
                  € - Ajouter au panier
                </button>
              </div>
            </div>
            {/* <div className="py-4">
              <ul className=" space-y-2">
                <li>
                  <span className="font-bold">Qualité haute définition :</span>
                  Imprimé en haute définition pour garantir une qualité
                  d&apos;image optimale.
                </li>
                <li>
                  <span className="font-bold">Idéal pour décorer :</span> Ce
                  poster généré par l&apos;IA est parfait pour décorer
                  n&apos;importe quelle pièce de votre maison ou de votre bureau
                  et ajouter une touche unique à votre décor.
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
