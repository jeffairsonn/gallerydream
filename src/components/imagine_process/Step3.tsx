import React, { useEffect } from 'react';

const Step3 = ({
  chaneStep,
  step,
  numberOfImages,
  setNumberOfImages,
}: {
  chaneStep: any;
  step: number;
  numberOfImages: number;
  setNumberOfImages: any;
}) => {
  useEffect(() => {}, [numberOfImages]);

  const handleRangeChange = (evt: any) => {
    setNumberOfImages(evt.target.value / 10);
  };

  return (
    <div>
      <h2 className="text-6xl font-black max-w-4xl text-center mb-12 w-full">
        Combien d&apos;images souhaitez vous créer ?
      </h2>
      <div className="w-full ">
        <input
          type="range"
          min="0"
          max="100"
          value={numberOfImages * 10}
          className="range"
          step="10"
          onChange={(evt) => handleRangeChange(evt)}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
      </div>
      <div className="alert alert-error shadow-lg mt-8">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Task failed successfully.</span>
        </div>
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
          disabled={numberOfImages === 0}
          type="submit"
          className="btn btn-primary btn-lg mb-2 md:mb-0"
        >
          Générer pour {numberOfImages} crédits
        </button>
      </div>
    </div>
  );
};

export default Step3;
