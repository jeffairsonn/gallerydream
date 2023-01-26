import React, { useEffect } from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import Home from '../components/Home';

export default function index() {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // dark mode
      setTheme('cupcake');
    }
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}
