import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <ThemeProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </ThemeProvider>
);

export default App;
