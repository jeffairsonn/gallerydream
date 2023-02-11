import React from 'react';

const Step = () => (
  <div className="px-4 md:px-8 lg:px-40 py-20 gap-4 space-y-36">
    <div className="items-center grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col justify-center h-full">
        <h2 className="text-6xl font-black max-w-5xl mb-4 md:mb-8">Étape 1</h2>
        <p className="text-2xl md:text-4xl font-bold max-w-4xl">
          Donnez libre cours à votre créativité et décrivez précisément ce que
          vous souhaitez voir sur votre tabelaux.
        </p>
      </div>
      <div className="bg-green-300 flex justify-center items-center sticky   h-[400px]">
        hh
      </div>
    </div>
    <div className="items-center grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex lg:hidden flex-col justify-center h-full">
        <h2 className="text-6xl font-black max-w-5xl mb-4 md:mb-8">Étape 2</h2>
        <p className="text-2xl md:text-4xl font-bold max-w-4xl">
          Choisissez parmi une variété de styles pour trouver celui qui
          s&apos;harmonisera parfaitement avec votre idée.
        </p>
      </div>
      <div className="bg-green-300 flex justify-center items-center sticky   h-[400px]">
        hh
      </div>
      <div className="hidden lg:flex flex-col justify-center h-full">
        <h2 className="text-6xl font-black max-w-5xl mb-4 md:mb-8">Étape 2</h2>
        <p className="text-2xl md:text-4xl font-bold max-w-4xl">
          Choisissez parmi une variété de styles pour trouver celui qui
          s&apos;harmonisera parfaitement avec votre idée.
        </p>
      </div>
    </div>
    <div className="items-center grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col justify-center h-full">
        <h2 className="text-6xl font-black max-w-5xl mb-4 md:mb-8">Étape 3</h2>
        <p className="text-2xl md:text-4xl font-bold max-w-4xl">
          Générez jusqu&apos;à 100 variantes de votre idée, sélectionnez celle
          qui vous plaît le plus et faites-la imprimer pour l&apos;accrocher sur
          votre mur.
        </p>
      </div>
      <div className="bg-green-300 flex justify-center items-center sticky   h-[400px]">
        pp
      </div>
    </div>
  </div>
);

export default Step;
