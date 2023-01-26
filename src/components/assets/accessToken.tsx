import React from 'react';
import { useSession } from 'next-auth/react';

const Component = () => {
  const { data } = useSession();
  const { accessToken }: any = data;
  return <div>Access Token: {accessToken}</div>;
};

export default Component;
