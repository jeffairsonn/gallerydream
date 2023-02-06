import React, { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import preGeneratedStyles from '../../lib/style_list';

const Step2 = ({
  chaneStep,
  step,
  styles,
  setStyles,
}: {
  chaneStep: any;
  step: number;
  styles: string;
  setStyles: any;
}) => {
  useEffect(() => {}, [styles]);

  return (
    <div>
      <h2 className="text-6xl font-black max-w-4xl text-center mb-12 w-full">
        Choisissez un style
      </h2>
      <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-4xl gap-4">
        {preGeneratedStyles.map(({ name, image }) => (
          <button
            type="button"
            key={name}
            onClick={() => {
              setStyles(name);
            }}
          >
            <div className="relative">
              <div
                className={`${
                  styles.includes(name) ? 'block' : 'hidden'
                } absolute w-full h-full bg-black bg-opacity-50 rounded-3xl flex items-center justify-center`}
              >
                <div className="btn btn-circle btn-primary">
                  <FaCheck color="white" />
                </div>
              </div>
              <div className="w-full aspect-square">
                <img src={image} className="rounded-3xl" alt="" />
              </div>
            </div>
            <p className="font-bold mt-2 text-start truncate">{name}</p>
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setStyles('no');
          }}
        >
          <div className="relative">
            <div
              className={`${
                styles === 'no' ? 'block' : 'hidden'
              } absolute w-full h-full bg-black bg-opacity-50 rounded-3xl flex items-center justify-center`}
            >
              <div className="btn btn-circle btn-primary">
                <FaCheck color="white" />
              </div>
            </div>
            <img
              src="/assets/cancel_icon.png"
              className="rounded-3xl p-4"
              alt=""
            />
          </div>
          <p className="font-bold mt-2 text-start">Aucun style</p>
        </button>
      </div>
      <div className="flex flex-col-reverse md:space-y-0 md:flex-row justify-between w-full max-w-4xl mt-8">
        <button
          onClick={() => chaneStep(step - 1)}
          type="button"
          className="btn btn-primary btn-lg btn-outline"
        >
          Retour
        </button>
        <button
          type="button"
          disabled={styles === ''}
          onClick={() => styles !== '' && chaneStep(step + 1)}
          className="btn btn-primary btn-lg mb-2 md:mb-0"
        >
          Je passe à la suite
        </button>
      </div>
    </div>
  );
};

export default Step2;
