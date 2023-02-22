import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const confirmation = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      if (router.query.loginToken) {
        signIn('credentials', {
          redirect: false,
          tokenFromEmail: router.query.loginToken,
          // @ts-ignore
        }).then(({ ok }) => {
          if (ok) {
            router.push('/');
          } else {
            router.push('/404');
          }
        });
      }
    }
  }, [router]);
};

export default confirmation;
