import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import AuthServiceProvider from '../modules/auth/AuthServiceProvider';

function CustomNextApp({ Component, pageProps }: AppProps): JSX.Element {
  // We track if we've mounted the component in order to skip SSR, as we do not currently need it for the app
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {mounted && (
        <AuthServiceProvider>
          <Component {...pageProps} />
        </AuthServiceProvider>
      )}
    </>
  );
}

export default CustomNextApp;
