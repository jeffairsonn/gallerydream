import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Form from '../auth/Form';

const Login = () => {
  const { status } = useSession();
  const router = useRouter();
  const [emailSend, setEmailSend] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Se connecter</title>
        <meta name="description" content="Connectez-vous à votre compte" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center">
          {!emailSend && (
            <Link href="/register">
              Pas encore de compte ?{' '}
              <span className=" btn btn-primary btn-xs">S&apos;inscrire</span>
            </Link>
          )}
          {!emailSend && (
            <div className="z-10 w-full overflow-hidden p-4 max-w-sm">
              <div className="flex flex-col items-center px-4 py-2">
                <Link href="/" className="max-w-[80px]">
                  <img src="/assets/logo_gallery_dream.png" alt="" />
                </Link>
                <h3 className="text-3xl font-extrabold font-title mt-4">
                  Welcome back
                </h3>
              </div>
              <Form type="login" setEmailSend={setEmailSend} />
            </div>
          )}
          {emailSend && (
            <div className="z-10 w-full max-w-2xl overflow-hidden p-4">
              <div className="flex flex-col items-center px-4 py-6">
                <Link href="/" className="max-w-[100px]">
                  <img src="/assets/logo_gallery_dream.png" alt="" />
                </Link>

                <h3 className="text-5xl font-extrabold font-title mt-4 text-center">
                  Vérifiez votre boite mail !
                </h3>
                <p className="text-gray-500 max-w-lg text-lg text-center mt-2">
                  Vous avez recu votre lien de connexion par mail
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
