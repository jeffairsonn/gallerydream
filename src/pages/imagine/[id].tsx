import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const create = () => {
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<any>();
  const [generation, setGeneration] = useState<any>();

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
    if (user) {
      axios
        .get(`/api/artwork_group/${router.query.id}`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          setGeneration(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (generation && !generation.artwork_are_generated) {
      axios
        .post(
          `/api/generation/create`,
          {
            artwork_group_id: router.query.id,
          },
          {
            headers: {
              Authorization: `Bearer ${data.jwt}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setGeneration(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [generation]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  const images = ['', '', '', '', ''];

  return (
    <div>
      <Navbar user={user} status={status} />
      <div className="px-4 md:px-8 lg:px-40 gap-4 mt-4 md:mt-0 pb-16">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-6 gap-4 h-full">
          <aside className="col-span-2 rounded-3xl">
            <h1 className="text-2xl font-extrabold">
              {generation?.attributes?.prompt}
            </h1>
            <p className="mt-2">
              Image générée par <span className="underline">LLoris77</span>.
            </p>
            <p className="">
              <span className="font-bold">{generation?.attributes?.count}</span>{' '}
              images générées.
            </p>
          </aside>
          <div className="col-span-4">
            <div className="alert alert-warning w-full mb-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Vos images sont entrains de charger, patientez quelques
                  instant elles apparaitron ci-dessous
                </span>
              </div>
            </div>
            <div className=" grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 ">
              {images.map(() => (
                <div className="aspect-square w-full bg-primary rounded-3xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default create;
