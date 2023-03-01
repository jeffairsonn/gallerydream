import { Transition } from '@headlessui/react';
import React from 'react';

const ChooseStyle = ({ show }: any) => (
  <div>
    <Transition
      show={show}
      appear
      enter="delay-150 transition-all duration-150"
      enterFrom="top-80 opacity-0"
      enterTo="top-0 opacity-100"
      leave="transition-all duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="h-full w-full fixed overflow-y-hidden top-0 left-0 z-[400] pt-8 bg-black bg-opacity-50"
    >
      <div className="bg-white h-full p-4 pt-2">
        <div className="flex flex-col items-center justify-center">
          <div className="h-1 w-full max-w-[40px] bg-gray-300 rounded-full" />
          <div className="mt-4">
            <h1 className="font-extrabold text-lg mb-2">Choisissez un style</h1>
            <p className="mb-4">
              Besoin d&rsquo;inspiration ? Choisissez style à appliquer à votre
              idée
            </p>
            <hr />
          </div>
          <div />
        </div>
      </div>
    </Transition>
  </div>
);

export default ChooseStyle;
