import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mClient } from '@/lib/magic-client';

import Loading from '@/components/loading/loading';

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await mClient.user.isLoggedIn();

      // if (loggedIn) {
      //   router.push('/');
      // } else {
      //   router.push('/login');
      // }
    };  

    checkLogin();
  }, [])

  useEffect(() => {
    const loadingComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeComplete", loadingComplete);
    router.events.on("routeChangeError", loadingComplete);

    return () => {
      router.events.off("routeChangeComplete", loadingComplete);
      router.events.off("routeChangeError", loadingComplete);
    };
  }, [router]);

  return (
    loading ? <Loading /> : <Component {...pageProps} />
  );
};
