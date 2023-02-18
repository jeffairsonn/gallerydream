import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Home/Footer';

const contact = () => {
  const { status, data }: any = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    if (data) {
      axios
        .get(`/api/user/verify`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
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
      <Container>
        <div className="w-full flex justify-center flex-col items-center">
          <h1 className="text-4xl font-title font-bold">
            Conditions générales d&apos;utilisation
          </h1>
          <div className="mt-12 text-justify">
            <p className="max-w-2xl text-lg mb-8">
              Pour tout contact ou probleme rencontré sur la plateforme,
              veuillez nous contacter à l&apos;adresse suivante :{' '}
              <span className="font-bold">gallerydream.io@gmail.com</span>
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default contact;
