import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Gallery from './Gallery';
import Hero from './Hero';
import Navbar from '../Navbar';
import Step from './Step';

const Home = () => {
  const { status, data }: any = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    if (data) {
      axios
        .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);
  return (
    <div>
      <Navbar user={user} status={status} />
      <Hero />
      <Gallery />
      <Step />
    </div>
  );
};

export default Home;
