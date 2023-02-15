import React, { useEffect } from 'react';
import { FaChevronLeft, FaGoogle } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Form from '../auth/Form';
import Container from '../components/Container';

const Register = () => {
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
    <>
      <header className="flex justify-between w-full p-4">
        <a href="/" className="flex items-center space-x-2">
          <button
            onClick={() => router.push('/')}
            type="button"
            className="btn btn-primary btn-outline"
          >
            <FaChevronLeft className="mr-2" /> Retour
          </button>
        </a>
      </header>
      <Container>
        <div className="flex flex-col items-center justify-center">
          <div className="z-10 w-full max-w-2xl overflow-hidden p-4">
            <div className="flex flex-col items-center justify-center space-y-4  px-4 py-6 pt-8 text-center">
              <button type="button" className="btn btn-primary">
                GD
              </button>
              <h3 className="text-5xl font-black">Inscription</h3>
              <p className="text-gray-500">
                Utilisez votre mail et votre mot de passe pour vous inscrire
              </p>
            </div>
            <Form type="register" />
            <hr className="w-full my-8" />
            <button
              className="btn btn-primary w-full btn-lg"
              type="button"
              onClick={() => {
                connectWithGoolge();
              }}
            >
              <FaGoogle className="mr-4" /> S&apos;enregistrer avec Google
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
