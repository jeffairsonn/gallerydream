import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';
import Form from '../auth/Form';

const Login = () => {
  const { status } = useSession();
  const router = useRouter();
  const [emailSend, setEmailSend] = useState<boolean>(false);

  const connectWithGoolge = () => {
    signIn('google');
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Inscription</title>
        <meta name="description" content="Inscrivez vous sur GalleryDream !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center">
          {!emailSend && (
            <Link href="/login">
              Pas encore de compte ?{' '}
              <span className=" btn btn-primary btn-xs"> Se connecter</span>
            </Link>
          )}
          {!emailSend && (
            <div className="z-10 w-full max-w-2xl overflow-hidden p-4">
              <div className="flex flex-col items-center px-4 py-6">
                <Link href="/" className="max-w-[100px]">
                  <img src="/assets/logo_gallery_dream.png" alt="" />
                </Link>

                <h3 className="text-5xl font-extrabold font-title mt-4">
                  Inscription
                </h3>
                <p className="text-gray-500 max-w-lg text-lg text-center">
                  Inscription sans mot de passe, renseignez seulement un nom
                  d&apos;utilisateur et un e-mail
                </p>
              </div>
              <Form type="register" setEmailSend={setEmailSend} />
              <hr className="w-full mb-8 border-black" />
              <button
                className="btn btn-secondary w-full lg:btn-lg"
                type="button"
                onClick={() => {
                  connectWithGoolge();
                }}
              >
                <FaGoogle className="mr-4" /> S&apos;inscrire avec Google
              </button>
            </div>
          )}
          {emailSend && (
            <div className="z-10 w-full max-w-2xl overflow-hidden p-4">
              <div className="flex flex-col items-center px-4 py-6">
                <Link href="/" className="max-w-[100px]">
                  <img src="/assets/logo_gallery_dream.png" alt="" />
                </Link>

                <h3 className="text-5xl font-extrabold font-title mt-4 text-center">
                  Vous êtes inscrit !
                </h3>
                <p className="text-gray-500 max-w-lg text-lg text-center mt-2">
                  Vous allez recevoir un lien de connexion qui vous permettra de
                  créer vos premiers posters
                </p>
                <button
                  onClick={() => router.push('/')}
                  type="button"
                  className="btn btn-primary mt-4"
                >
                  Retour à l&apos;accueil
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
