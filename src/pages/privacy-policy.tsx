import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Home/Footer';

const cgu = () => {
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
      <Head>
        <title>Politique de vie privée</title>
        <meta name="description" content="Connectez-vous à votre compte" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} status={status} />
      <Container>
        <div className="w-full flex justify-center flex-col items-center">
          <h1 className="text-4xl font-title font-bold">
            Politique de vie privée
          </h1>
          <div className="mt-12 text-justify">
            <p className="max-w-2xl text-lg mb-8">
              Chez GalleryDream, nous accordons une grande importance à la vie
              privée de nos utilisateurs. Nous collectons uniquement les
              informations nécessaires pour fournir nos services et nous nous
              engageons à ne pas les partager avec des tiers sans votre
              consentement explicite.
            </p>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">
                Collecte d&apos;informations :
              </h2>
              <p>
                Politique de vie privée de l&apos;application GalleryDream :
                Chez GalleryDream, nous accordons une grande importance à la vie
                privée de nos utilisateurs. Nous collectons uniquement les
                informations nécessaires pour fournir nos services et nous nous
                engageons à ne pas les partager avec des tiers sans votre
                consentement explicite. Collecte d&apos;informations : Nous
                collectons des informations sur votre activité sur
                l&apos;application GalleryDream, notamment vos créations
                d&apos;affiches, votre utilisation des fonctionnalités et vos
                interactions avec d&apos;autres utilisateurs. Nous collectons
                également des informations telles que votre adresse e-mail et
                votre nom d&apos;utilisateur si vous choisissez de vous
                inscrire.
              </p>
            </div>
            <div className="max-w-2xl space-y-4 mt-8">
              <h2 className="text-2xl font-bold">
                Utilisation des informations :
              </h2>
              <p>
                Nous utilisons les informations collectées pour fournir nos
                services et améliorer l&apos;expérience utilisateur sur
                l&apos;application. Nous pouvons également utiliser ces
                informations pour vous contacter à propos de nouveaux produits
                ou services que nous proposons. Nous ne partagerons jamais vos
                informations avec des tiers sans votre consentement explicite.
              </p>
            </div>
            <div className="max-w-2xl space-y-4 mt-8">
              <h2 className="text-2xl font-bold">
                Sécurité des informations :
              </h2>
              <p>
                Nous prenons des mesures de sécurité pour protéger vos
                informations contre toute utilisation, modification ou
                divulgation non autorisée. Cependant, aucun système de sécurité
                n&lsquo;est infaillible, et nous ne pouvons garantir la sécurité
                absolue de vos informations.
              </p>
            </div>
            <div className="max-w-2xl space-y-4 mt-8">
              <h2 className="text-2xl font-bold">
                Modification de la politique de vie privée :
              </h2>
              <p>
                Nous pouvons modifier cette politique de vie privée à tout
                moment. Si nous apportons des modifications importantes, nous
                vous en informerons par e-mail ou par une notification sur
                l&apos;application. Si vous avez des questions ou des
                préoccupations concernant notre politique de vie privée,
                veuillez nous contacter à l&apos;adresse e-mail suivante :
                privacy@gallerydream.com.
              </p>
            </div>
            <div className="max-w-2xl space-y-4 mt-8">
              <p>
                Nous vous remercions de votre confiance et de votre utilisation
                de l&apos;application GalleryDream. <br />
                <br />
                En ce qui concerne la création d&apos;affiches personnalisées
                avec GalleryDream, l&apos;application permet aux utilisateurs de
                donner vie à leur imagination en créant des designs uniques.
                L&apos;utilisateur peut décrire son idée de manière libre et
                choisir un style artistique parmi une sélection proposée.
                <br />
                <br />
                GalleryDream ne collecte pas les idées créatives ou les
                descriptions de l&apos;utilisateur, mais seulement les affiches
                finales créées par l&apos;utilisateur. Les affiches peuvent être
                partagées publiquement sur l&apos;application si
                l&apos;utilisateur le souhaite.
                <br />
                <br />
                GalleryDream ne revendique aucun droit de propriété
                intellectuelle sur les créations de l&apos;utilisateur, mais se
                réserve le droit de les utiliser à des fins promotionnelles de
                l&apos;application, avec l&apos;accord de l&apos;utilisateur. Si
                l&apos;utilisateur souhaite retirer une affiche de la galerie
                publique, il peut le faire à tout moment en supprimant
                l&apos;affiche de son compte personnel.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default cgu;
