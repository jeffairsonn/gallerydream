import React from 'react';
import Image from 'next/image';
import Form from '../auth/Form';

const Register = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="z-10 w-full max-w-2xl overflow-hidden p-4">
      <div className="flex flex-col items-center justify-center space-y-4  px-4 py-6 pt-8 text-center">
        <a href="https://dub.sh">
          <Image
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full"
            width={20}
            height={20}
          />
        </a>
        <h3 className="text-5xl font-black">S&apos;inscrire</h3>
        <p className="text-gray-500">
          Utilisez votre mail et votre mot de passe pour vous inscrire
        </p>
      </div>
      <Form type="register" />
    </div>
  </div>
);

export default Register;
