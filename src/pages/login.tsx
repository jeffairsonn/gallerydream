import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import Form from '../auth/Form';

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  const connectWithGoolge = () => {
    signIn('google');
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="z-10 w-full max-w-2xl overflow-hidden p-4">
          <div className="flex flex-col items-center px-4 py-6">
            <Link href="/" className="max-w-[100px]">
              <img src="/assets/logo_gallery_dream.png" alt="" />
            </Link>
            <h3 className="text-5xl font-extrabold font-title mt-4">
              Connexion
            </h3>
            <p className="text-gray-500 text-lg text-center">
              Utilisez votre mail et votre mot de passe pour vous connecter
            </p>
          </div>
          <Form type="login" />
          <hr className="w-full mb-8 border-black" />
          <button
            className="btn btn-secondary w-full lg:btn-lg"
            type="button"
            onClick={() => {
              connectWithGoolge();
            }}
          >
            <FaGoogle className="mr-4" /> Se connecter avec Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
