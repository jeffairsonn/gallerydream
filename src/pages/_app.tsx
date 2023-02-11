import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <Provider store={store}>
    <ThemeProvider>
      <SessionProvider session={session}>
        <Component className="font-sans" {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
