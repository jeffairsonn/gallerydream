import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const create = () => {
  const { status, data }: any = useSession();
  const [user, setUser] = useState<any>();

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

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <div>
      <Navbar user={user} status={status} />
      <div className="px-4 md:px-8 lg:px-40  gap-4 pb-16 pt-8">
        <div className="justify-center flex flex-col items-center">
          <div className="w-full grid grid-cols-2 gap-4 max-w-3xl">
            <div className="w-full aspect-square rounded-3xl animate-pulse bg-slate-700" />
            <div className="w-full aspect-square rounded-3xl animate-pulse bg-slate-700" />
            <div className="w-full aspect-square rounded-3xl animate-pulse bg-slate-700" />
            <div className="w-full aspect-square rounded-3xl animate-pulse bg-slate-700" />
          </div>
          <div className="mt-4 w-full max-w-3xl">
            <h1 className="text-2xl font-extrabold">
              Un chat dans la bouche d&apos;une grenouille
            </h1>
            <p className="mt-2">
              Image générée par <span className="underline">LLoris77</span>.
            </p>
            <p className="">
              <span className="font-bold">12</span> images générées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default create;
