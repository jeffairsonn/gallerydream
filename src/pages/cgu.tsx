import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
      <Navbar user={user} status={status} />
      <Container>
        <div className="w-full flex justify-center flex-col items-center">
          <h1 className="text-4xl font-title font-bold">
            Conditions générales d&apos;utilisation
          </h1>
          <div className="mt-12 text-justify">
            <p className="max-w-2xl text-lg mb-8">
              Merci d&apos;utiliser notre application ! Vous faites surement
              partit des meilleurs. En utilisant cette application, vous
              acceptez les conditions générales d&apos;utilisation suivantes :
            </p>
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold">
                1. Propriété intellectuelle
              </h2>
              <p>
                Les textes soumis par les utilisateurs (prompts) ainsi que les
                images générées par l&apos;application sont libres de droit et
                peuvent être utilisés à des fins personnelles et commerciales
                sans restrictions. Cela signifie que les utilisateurs peuvent
                utiliser ces éléments à leur guise sans avoir à payer de droits
                supplémentaires. Toutefois, l&apos;application se réserve le
                droit de retirer ou de supprimer tout contenu qui viole les
                conditions générales d&apos;utilisation.
              </p>
            </div>
            <div className="max-w-2xl space-y-4 mt-8">
              <h2 className="text-2xl font-bold">
                2. Utilisation des contenus générés
              </h2>
              <p>
                Les posters générés par l&apos;application sont libres de droit
                et peuvent être utilisés à des fins commerciales. Cela signifie
                que vous pouvez les utiliser pour promouvoir votre entreprise,
                vos produits ou vos services, sans avoir à payer de droits
                supplémentaires. Cependant, vous ne pouvez pas vendre les
                posters eux-mêmes en tant que produit. Vous êtes également
                responsable de vous assurer que vous disposez de tous les droits
                nécessaires pour utiliser les posters générés par
                l&apos;application.
              </p>
            </div>
            <div className="max-w-2xl space-y-4 mt-8">
              <h2 className="text-2xl font-bold">3. Contenu interdit</h2>
              <p>
                Il est interdit de soumettre des prompts contenant des
                références à du contenu pornographique, illégal ou offensant.
                L&apos;application se réserve le droit de refuser ou de
                supprimer tout contenu qui enfreint cette règle. En utilisant
                l&apos;application, vous vous engagez à ne pas soumettre de
                contenu offensant ou illégal.
              </p>
            </div>
            <div className="max-w-2xl space-y-4 mt-8">
              <h2 className="text-2xl font-bold">
                4. Limitation de responsabilité
              </h2>
              <p>
                L&apos;application n&apos;assume aucune responsabilité pour les
                pertes ou dommages directs, indirects, spéciaux, consécutifs ou
                exemplaires qui peuvent résulter de l&apos;utilisation de
                l&apos;application ou de l&apos;incapacité à utiliser
                l&apos;application. L&apos;application ne garantit pas que les
                posters générés par l&apos;application seront exempts
                d&apos;erreurs ou de défauts. Vous utilisez l&apos;application à
                vos propres risques et périls.
              </p>
            </div>
            <div className="max-w-2xl space-y-4 mt-8">
              <h2 className="text-2xl font-bold">
                5. Modification des conditions d&apos;utilisation
              </h2>
              <p>
                L&lsquo;application se réserve le droit de modifier ces
                conditions d&lsquo;utilisation à tout moment, sans préavis. Nous
                vous encourageons à vérifier régulièrement ces conditions pour
                vous assurer que vous êtes toujours en accord avec celles-ci.
              </p>
            </div>
            <div className="max-w-2xl space-y-4 mt-8">
              <h2 className="text-2xl font-bold">6. Loi applicable</h2>
              <p>
                Ces conditions d&apos;utilisation sont régies par les lois de
                [indiquer le pays ou l&apos;État]. Tout litige découlant de
                l&apos;utilisation de l&apos;application sera régi par les
                tribunaux compétents.
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
