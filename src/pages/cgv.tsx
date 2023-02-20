import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Home/Footer';

const cgv = () => {
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
            Conditions générales de vente
          </h1>
          <div className="mt-12 text-justify space-y-8">
            <p className="max-w-2xl text-lg">
              Les présentes conditions générales de vente (les &quot;CGV&quot;)
              régissent la vente de crédits pour la génération d&apos;images
              (les &quot;Crédits&quot;) et de posters imprimés (les
              &quot;Posters&quot;) proposés par GalleryDream
              (&quot;Entreprise&quot;) à ses clients (les &quot;Clients&quot;).
            </p>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">Article 1 - Objet</h2>
              <p>
                Les CGV ont pour objet de définir les conditions dans lesquelles
                l&apos;Entreprise vend des Crédits et des Posters à ses Clients.
              </p>
            </div>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">Article 2 - Commande</h2>
              <p>
                Les Clients peuvent passer commande de Crédits et de Posters via
                le site internet de l&apos;Entreprise ou par tout autre moyen
                mis à leur disposition. Toute commande vaut acceptation des prix
                et descriptions des Crédits et des Posters proposés à la vente.
              </p>
            </div>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">
                Article 3 - Prix et paiement
              </h2>
              <p>
                Les prix des Crédits et des Posters sont indiqués en euros,
                toutes taxes comprises. Le paiement des commandes
                s&apos;effectue par carte bancaire ou tout autre moyen de
                paiement proposé par l&apos;Entreprise.
              </p>
            </div>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">Article 4 - Livraison</h2>
              <p>
                Les Crédits sont immédiatement disponibles après le paiement de
                la commande. Les Posters sont imprimés sur demande et expédiés
                dans les délais indiqués sur le site internet de
                l&apos;Entreprise.
              </p>
            </div>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">
                Article 5 - Propriété intellectuelle
              </h2>
              <p>
                Les Crédits et les Posters proposés à la vente sont la propriété
                intellectuelle de l&apos;Entreprise. Toute reproduction,
                utilisation ou exploitation des Crédits et des Posters sans
                autorisation écrite de l&apos;Entreprise est interdite.
              </p>
            </div>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">Article 6 - Responsabilité</h2>
              <p>
                L&apos;Entreprise ne saurait être tenue pour responsable en cas
                d&apos;inexécution de la commande due à un cas de force majeure.
                En tout état de cause, la responsabilité de l&apos;Entreprise
                est limitée au montant de la commande.
              </p>
            </div>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">
                Article 7 - Droit de rétractation
              </h2>
              <p>
                Conformément aux dispositions légales en vigueur, les Clients
                disposent d&apos;un délai de rétractation de 14 jours à compter
                de la réception des Posters pour exercer leur droit de
                rétractation, sans avoir à justifier de motifs ni à payer de
                pénalités.
              </p>
            </div>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">
                Article 8 - Données personnelles
              </h2>
              <p>
                Les données personnelles collectées lors de la commande sont
                utilisées par l&apos;Entreprise pour la gestion de la commande
                et sont traitées dans le respect des dispositions légales en
                vigueur.
              </p>
            </div>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">
                Article 9 - Modification des CGV
              </h2>
              <p>
                L&lsquo;Entreprise se réserve le droit de modifier les présentes
                CGV à tout moment. Les CGV applicables sont celles en vigueur au
                moment de la passation de la commande.
              </p>
            </div>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">
                Article 10 - Loi applicable et juridiction compétente
              </h2>
              <p>
                Les présentes CGV sont soumises au droit français. En cas de
                litige, les tribunaux français seront seuls compétents.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default cgv;
