import Link from 'next/link';
import React from 'react';

const Page404 = () => (
  <div>
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("http://localhost:1337/uploads/blob_70e27d1153.jpeg?updated_at=2023-02-06T16:03:27.773Z")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Oups...</h1>
          <p className="mb-5">
            Cette page n&apos;existe pas ou plus. Vous pouvez retourner à
            l&apos;accueil.
          </p>
          <Link href="/">
            <button type="button" className="btn btn-primary">
              Accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Page404;
