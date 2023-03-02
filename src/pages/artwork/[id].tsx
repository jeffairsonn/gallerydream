import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronLeft } from 'react-icons/fa';
import { Transition } from '@headlessui/react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import posters from '../../lib/poster_price';
import '../../hooks/useImageRightClick';
import LonelyFramedArtwork from '../../components/LonelyFramedArtwork';
import FooterNavigation from '../../components/FooterNavigation';

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
  const [reload, setReload] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      axios
        .get(`/api/user/verify`, {
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
          setValue('title', res.data.attributes.title);
          setValue('mask_prompt', res.data.attributes.mask_prompt);
          setValue('is_published', res.data.attributes.is_published);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router, reload]);

  const BuyArtwork = () => {
    axios
      .post(
        `/api/payment/create-checkout-session`,
        {
          // eslint-disable-next-line no-unsafe-optional-chaining
          price_id: selectedProduct,
          type: 'artwork',
          quantity,
          artwork_id: router.query.id,
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

  const EditArtworkProperties = (artworkData: any) => {
    if (
      artworkData.is_published !== artwork.attributes.is_published ||
      artworkData.title !== artwork.attributes.title ||
      artworkData.mask_prompt !== artwork.attributes.mask_prompt
    ) {
      axios
        .put(
          `/api/artworks/${router.query.id}`,
          {
            ...artworkData,
          },
          {
            headers: {
              Authorization: `Bearer ${data.jwt}`,
            },
          }
        )
        .then(() => {
          setReload((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                <Transition
                  show={
                    artwork?.attributes?.image?.data?.attributes?.url !==
                    undefined
                  }
                  appear
                  enter="delay-150 transition-opacity duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="aspect-square absolute w-[35%] top-[15%] right-[20%] shadow-xs"
                >
                  <LonelyFramedArtwork
                    url={`${artwork?.attributes?.image?.data?.attributes?.url}`}
                  />
                </Transition>
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
                <Transition
                  show={
                    artwork?.attributes?.image?.data?.attributes?.url !==
                    undefined
                  }
                  appear
                  enter="delay-150 transition-opacity duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="aspect-square absolute w-[35%] top-[15%] right-[45%] shadow-xs"
                >
                  <LonelyFramedArtwork
                    url={`${artwork?.attributes?.image?.data?.attributes?.url}`}
                  />
                </Transition>
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
                src={`${artwork?.attributes?.image?.data?.attributes?.url}`}
                alt=""
              />
            )}
            <div className="grid grid-cols-4 gap-2 mt-2">
              <button
                type="button"
                onClick={() => setDisplayImage(1)}
                className="relative"
              >
                <Transition
                  show={
                    artwork?.attributes?.image?.data?.attributes?.url !==
                    undefined
                  }
                  appear
                  enter="delay-150 transition-opacity duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="aspect-square absolute w-[35%] top-[15%] right-[20%] shadow-xs"
                >
                  <img
                    draggable="false"
                    className="aspect-square w-full shadow-xs"
                    src={`${artwork?.attributes?.image?.data?.attributes?.url}`}
                    alt=""
                  />
                </Transition>
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
                <Transition
                  show={
                    artwork?.attributes?.image?.data?.attributes?.url !==
                    undefined
                  }
                  appear
                  enter="delay-150 transition-opacity duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="aspect-square absolute w-[35%] top-[15%] right-[45%] shadow-xs"
                >
                  <img
                    draggable="false"
                    className="aspect-square w-full shadow-xs"
                    src={`${artwork?.attributes?.image?.data?.attributes?.url}`}
                    alt=""
                  />
                </Transition>
                <img
                  draggable="false"
                  className="w-full aspect-square"
                  src="/assets/mockup2.png"
                  alt=""
                />
              </button>
              <button type="button" onClick={() => setDisplayImage(3)}>
                <Transition
                  show={
                    artwork?.attributes?.image?.data?.attributes?.url !==
                    undefined
                  }
                  appear
                  enter="delay-150 transition-opacity duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="aspect-square"
                >
                  <img
                    draggable="false"
                    className="aspect-square w-full shadow-xs"
                    src={`${artwork?.attributes?.image?.data?.attributes?.url}`}
                    alt=""
                  />
                </Transition>
              </button>
            </div>
          </div>
          <div className="">
            <div className="mb-4">
              <div className="mb-4">
                <h1 className="font-bold text-xl md:text-2xl font-montserrat">
                  {artwork?.attributes?.title || artwork?.attributes?.prompt}
                </h1>
                {!artwork?.attributes?.mask_prompt && (
                  <p>
                    &rdquo;
                    {artwork?.attributes?.prompt}
                    &rdquo;
                  </p>
                )}
              </div>

              {artwork?.attributes?.style && (
                <button type="button" className="btn btn-xs">
                  {artwork?.attributes?.style}
                </button>
              )}
            </div>
            <div className="mb-4">
              <div className="form-control w-full md:max-w-xs mb-2">
                <label htmlFor="quantity" className="label">
                  <span className="label-text font-bold">Taille</span>
                </label>
                <select
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="select select-bordered w-full md:max-w-xs"
                  defaultValue={selectedProduct}
                >
                  <option disabled>Choisir une taille</option>
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
                  defaultValue={quantity}
                  onChange={(e: any) =>
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
                  className="btn w-full btn-primary"
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
              <div className="space-y-4 mb-4">
                <h3 className="font-bold text-2xl ">Description :</h3>
                <p>
                  Ajoutez une touche d&apos;originalité à votre décoration
                  intérieure avec notre affiche d&apos;art personnalisée générée
                  par intelligence artificielle. Choisissez parmi une large
                  sélection de prompts créatifs et laissez l&apos;IA générer une
                  image unique qui correspond à votre idée. Avec un choix de
                  styles différents, notre affiche d&apos;art sera la pièce
                  maîtresse de votre décoration intérieure. Une fois que vous
                  avez choisi votre design préféré, imprimez-le sur papier
                  d&apos;art de qualité musée pour une finition professionnelle.
                </p>
              </div>
              <div className="space-y-4 mb-4">
                <h3 className="font-bold text-2xl ">Caractéristiques :</h3>
                <ul className="list-disc ml-8">
                  <li>Affiche d&apos;art personnalisée générée par IA</li>
                  <li>Choisissez parmi une variété de prompts créatifs</li>
                  <li>Large sélection de styles différents</li>
                  <li>
                    Impression sur papier musée de haute qualité pour une
                    finition professionnelle
                  </li>
                  <li>
                    Parfait pour ajouter une touche d&apos;originalité à votre
                    décoration intérieure
                  </li>
                </ul>
              </div>
              <div className="space-y-4 mb-4">
                <h3 className="font-bold text-2xl ">Dimensions :</h3>
                <p>
                  Nos posters sont disponibles en différentes tailles pour
                  s&apos;adapter à votre espace. Les tailles disponibles sont :
                  30x30cm, 50x50cm, 70x70cm
                </p>
              </div>
              <div className="space-y-4 mb-4">
                <h3 className="font-bold text-2xl ">Matériaux :</h3>
                <p>
                  Nous utilisons des matériaux de haute qualité pour assurer une
                  impression de qualité supérieure. Nos posters sont imprimés
                  sur du papier photo 200g/m² pour une finition professionnelle
                  et une durabilité maximale.
                </p>
              </div>
              <div className="space-y-4 mb-4">
                <h3 className="font-bold text-2xl ">Livraison :</h3>
                <p>Tout simplement gratuit 😋.</p>
              </div>
            </div>
          </div>
        </div>
        {status === 'authenticated' &&
          artwork &&
          user &&
          artwork?.attributes?.user === user?.id && (
            <>
              <hr className="my-16 border-1 border-black" />
              <div className="rounded-md border border-black p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <h3 className="font-bold text-xl font-montserrat">
                    Paramètres
                  </h3>
                  <p>
                    Changer le titre, la disponibilité et le statut de votre
                    oeuvre
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(EditArtworkProperties)}
                  className="space-y-4"
                >
                  <div className="form-control w-full">
                    <label htmlFor="title" className="label">
                      <span className="label-text">Titre de votre œuvre</span>
                    </label>
                    <input
                      type="text"
                      // defaultValue={artwork?.attributes?.title}
                      {...register('title', { required: true })}
                      placeholder="Choisissez un titre..."
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <span className="label-text">Masquer le prompt</span>
                    <label className="label cursor-pointer">
                      <input
                        // defaultValue={artwork?.attributes?.mask_prompt}
                        {...register('mask_prompt', {})}
                        type="checkbox"
                        className="toggle"
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <span className="label-text">
                      Publier (Votre oeuvre sera visible par tous)
                    </span>
                    <label
                      // defaultValue={artwork?.attributes?.is_publish}

                      className="label cursor-pointer"
                    >
                      <input
                        {...register('is_published', {})}
                        type="checkbox"
                        className="toggle"
                      />
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary ">
                    Modifier
                  </button>
                </form>
              </div>
            </>
          )}
      </Container>
      <FooterNavigation />
    </div>
  );
};

export default Artwork;
