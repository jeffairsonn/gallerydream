import React from 'react';

const Step4 = () => (
  <div className="w-full">
    <div className="max-w-4xl w-full text-center mb-8">
      <h1 className="font-title text-5xl font-bold mb-4">
        Vos images sont en cours de préaration 🥳.
      </h1>
      <p className="text-xl">
        Elles seront pretes dans quelques instants ! Veullez patienter...
      </p>
    </div>
    <div className=" flex justify-center w-full">
      <div>
        <iframe
          src="https://giphy.com/embed/eNSUpqinyhIacptS86"
          width="500"
          height="500"
          className="giphy-embed"
          allowFullScreen
          title="loading"
        />
      </div>
    </div>
  </div>
);

export default Step4;
