import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Container from '../../../components/Container';

const edit = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{
    credits: number;
    jwt: string;
    username: string;
    email: string;
    id: number;
  }>();

  useEffect(() => {
    if (data) {
      axios
        .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  useEffect(() => {
    if (status === 'authenticated' && router?.query?.id && user?.id) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (+router?.query?.id !== user?.id) {
        router.push('/profile');
      }
    }
  }, [user]);

  return (
    <div>
      <Navbar user={user} status={status} />
      <Container>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Editer mon profil
          </h1>
          <div className="mt-16 max-w-2xl w-full">
            <div className="">
              <h2 className="text-xl md:text-2xl font-medium">
                Informations générales :
              </h2>
              <p>Vos informations principales</p>
            </div>
            <div className="mt-8 space-y-4">
              <div>
                <p className="label-text font-bold mb-2">Avatar</p>
                <div className="flex items-center space-x-4">
                  <div className="avatar">
                    <div className="w-32 mask mask-squircle">
                      <img src="https://picsum.photos/200/300" alt="profile" />
                    </div>
                  </div>
                  <button
                    className="btn btn-outline btn-primary "
                    type="button"
                  >
                    Modifier
                  </button>
                </div>
              </div>
              <div className="form-control w-full">
                <label htmlFor="pseudo" className="label">
                  <span className="label-text font-bold">Pseudo</span>
                </label>
                <input
                  id="pseudo"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <label htmlFor="pseudo" className="label">
                  <span className="label-text">
                    Un nom d&lsquo;utilisateur unique pour l&lsquo;url de votre
                    profil. Lettres, chiffres, traits d&lsquo;union et
                    caractères de soulignement uniquement.
                  </span>
                </label>
              </div>
              <div className="form-control w-full">
                <label htmlFor="pseudo" className="label">
                  <span className="label-text font-bold">Description</span>
                </label>
                <input
                  id="pseudo"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <label htmlFor="pseudo" className="label">
                  <span className="label-text">
                    Parlez-nous un peu de vous !
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default edit;
