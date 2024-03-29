import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const success = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (router.query.session_id && router.isReady) {
      axios
        .get(`/api/payment/order/success?session_id=${router.query.session_id}`)
        .then((res) => {
          if (res.data.type === 'credit_added') {
            setDisplay('credit_added');
          }
          if (res.data.type === 'artwork') {
            setDisplay('artwork');
          }
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.data) {
            router.push('/404');
          }
        });
    }
  }, [router]);

  if (!loading) {
    if (display === 'credit_added') {
      return (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">
                Merci pour votre commande de crédit
              </h1>
              <p className="py-6">
                Vos crédits ont étés crédité sur votre compte. Vous pouvez dès à
                présent créé des posters uniques et originaux !
              </p>
              <Link href="/imagine">
                <button type="button" className="btn btn-primary">
                  Créer.
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    if (display === 'artwork') {
      return (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">
                Merci ! Votre commande à bien été enregistrer !
              </h1>
              <p className="py-6">
                Vous recevrez un mail dans quelques minutes contenant la
                facture. Vous pourrez suivre l&apos;etat de votre commande
                directement depuis votre espace &quot;Commande&quot;.
              </p>
              <Link href="/imagine">
                <button type="button" className="btn btn-primary">
                  Créer de nouveau
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
  return <div />;
};

export default success;
