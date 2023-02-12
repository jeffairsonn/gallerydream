import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import posters from '../../lib/poster_price';
import '../../hooks/useImageRightClick';

const Artwork = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<any>();
  const [artwork, setArtwork] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>(
    process.env.NEXT_PUBLIC_MODE === 'dev'
      ? posters[0].price_id
      : posters[0].live_price_id
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [displayImage, setDisplayImage] = useState<number>(1);

  useEffect(() => {
    if (data) {
      axios
        .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(`/api/artworks/${router.query.id}`, {})
        .then((res) => {
          setArtwork(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router]);

  const BuyArtwork = () => {
    axios
      .post(
        `/api/payment/create-checkout-session`,
        {
          // eslint-disable-next-line no-unsafe-optional-chaining
          price_id: selectedProduct,
          type: 'artwork',
          quantity,
          cancel_url: `/artwork/${router.query.id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        }
      )
      .then((res: any) => {
        window.location.replace(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar user={user} status={status} />
      <Container className="px-4 md:px-8 lg:px-40 gap-4 mt-4 md:mt-0 pb-16">
        <button
          type="button"
          className="btn btn-primary btn-outline mb-4"
          onClick={() => router.back()}
        >
          <FaChevronLeft /> Retour
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {displayImage === 1 && (
              <div className="relative">
                <img
                  draggable="false"
                  className="aspect-square absolute w-[35%] top-[15%] right-[20%] shadow-lg"
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${artwork?.attributes?.image?.data?.attributes?.url}`}
                  alt=""
                />
                <img
                  draggable="false"
                  className="w-full aspect-square"
                  src="/assets/mockup.png"
                  alt=""
                />
              </div>
            )}
            {displayImage === 2 && (
              <div className="relative">
                <img
                  draggable="false"
                  className="aspect-square absolute w-[35%] top-[18%] left-[16%] shadow-lg"
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${artwork?.attributes?.image?.data?.attributes?.url}`}
                  alt=""
                />
                <img
                  draggable="false"
                  className="w-full aspect-square"
                  src="/assets/mockup2.png"
                  alt=""
                />
              </div>
            )}
            {displayImage === 3 && (
              <img
                draggable="false"
                className="w-full aspect-square"
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${artwork?.attributes?.image?.data?.attributes?.url}`}
                alt=""
              />
            )}
            <div className="grid grid-cols-4 gap-2 mt-2">
              <button
                type="button"
                onClick={() => setDisplayImage(1)}
                className="relative"
              >
                <img
                  draggable="false"
                  className="aspect-square absolute w-[35%] top-[15%] right-[20%] shadow-lg"
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${artwork?.attributes?.image?.data?.attributes?.url}`}
                  alt=""
                />
                <img
                  draggable="false"
                  className="w-full aspect-square"
                  src="/assets/mockup.png"
                  alt=""
                />
              </button>
              <button
                type="button"
                onClick={() => setDisplayImage(2)}
                className="relative"
              >
                <img
                  draggable="false"
                  className="aspect-square absolute w-[35%] top-[18%] left-[16%] shadow-lg"
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${artwork?.attributes?.image?.data?.attributes?.url}`}
                  alt=""
                />
                <img
                  draggable="false"
                  className="w-full aspect-square"
                  src="/assets/mockup2.png"
                  alt=""
                />
              </button>
              <button type="button" onClick={() => setDisplayImage(3)}>
                <img
                  draggable="false"
                  className="w-full aspect-square"
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${artwork?.attributes?.image?.data?.attributes?.url}`}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="">
            <div className="mb-4">
              <h1 className="font-bold text-xl md:text-2xl">
                {artwork?.attributes?.prompt}
              </h1>
              <Link
                href={`/imagine/${artwork?.attributes?.generation?.data?.id}`}
                className=""
              >
                <p className="underline mt-2">
                  Découvrir la collection complète
                </p>
              </Link>
            </div>
            <div className="mb-4">
              <div className="form-control w-full md:max-w-xs mb-2">
                <label htmlFor="quantity" className="label">
                  <span className="label-text font-bold">Taille</span>
                </label>
                <select
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="select select-bordered w-full md:max-w-xs"
                >
                  <option disabled selected>
                    Choisir une taille
                  </option>
                  {posters.map(({ name, price_id, live_price_id }) => (
                    <option
                      key={
                        process.env.NEXT_PUBLIC_MODE === 'dev'
                          ? price_id
                          : live_price_id
                      }
                      value={
                        process.env.NEXT_PUBLIC_MODE === 'dev'
                          ? price_id
                          : live_price_id
                      }
                    >
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full md:max-w-xs">
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
                  className="input input-bordered w-full md:max-w-xs"
                />
              </div>
            </div>
            <div className="mt-8">
              <p className="mb-4 font-bold" />
              <div className="space-y-2">
                <button
                  onClick={() => BuyArtwork()}
                  type="button"
                  className="btn w-full btn-accent"
                >
                  {(
                    posters.filter(({ price_id, live_price_id }) =>
                      process.env.NEXT_PUBLIC_MODE === 'dev'
                        ? price_id === selectedProduct
                        : live_price_id === selectedProduct
                    )[0].price * quantity
                  ).toFixed(2)}{' '}
                  € - Commander maintenant
                </button>
              </div>
            </div>
            <div className="mt-8">
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
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Artwork;
