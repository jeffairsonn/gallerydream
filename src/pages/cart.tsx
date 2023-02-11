import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useCart from '../hooks/useCart';
import Container from '../components/Container';
import Navbar from '../components/Navbar';

const cartPage = () => {
  const { cart } = useCart();
  const router = useRouter();
  const { status, data }: any = useSession();
  const [user, setUser] = useState<{
    credits: number;
    jwt: string;
    username: string;
    email: string;
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
          console.log(res.data);

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
    if (user) {
      axios
        .get(`/api/cart?cart=${JSON.stringify(cart)}`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <div>
      <Navbar user={user} status={status} />
      <Container>
        <div className="flex flex-col items-center w-full space-y-2">
          <h1 className="text-3xl text-center">Mon panier</h1>
          <button
            onClick={() => router.push('/explore')}
            type="button"
            className="btn btn-primary btn-outline"
          >
            continuer mon shopping
          </button>
        </div>
        <div className="overflow-x-auto w-full mt-12">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <img src="https://picsum.photos/200/200" alt="" />
                </th>
                <td>24,99</td>
                <td>
                  <div className="form-control">
                    <label className="input-group">
                      <input
                        type="number"
                        className="input input-bordered w-16"
                      />
                    </label>
                  </div>
                </td>
                <td>Zemlak, Daniel and Leannon</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default cartPage;
