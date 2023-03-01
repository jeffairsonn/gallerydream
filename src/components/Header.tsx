import { Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaImages } from 'react-icons/fa';
import { MdHelpOutline } from 'react-icons/md';
import About from './pop-up/about';

const Header = () => {
  const [isOpenAboutModal, setisOpenAboutModal] = useState(false);
  return (
    <>
      <Transition
        show={isOpenAboutModal}
        appear
        enter="delay-150 transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className=" text-xl grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 z-[300] absolute"
      >
        <About setisOpenAboutModal={setisOpenAboutModal} />
      </Transition>
      <nav className="flex justify-between p-4 items-center sticky top-0 w-full h-20 bg-base-100 z-40">
        <Link href="/" className="max-w-[80px]">
          <img src="/assets/logo_gallery_dream.png" alt="" />
        </Link>
        <div className="flex space-x-2">
          <button
            type="button"
            className="btn btn-primary btn-sm btn-square btn-outline"
          >
            <MdHelpOutline />
          </button>
          <button
            onClick={() => setisOpenAboutModal(true)}
            type="button"
            className="btn btn-primary btn-sm btn-outline"
          >
            À propos
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
