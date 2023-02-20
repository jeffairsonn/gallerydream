import Link from 'next/link';
import React from 'react';

const Footer = () => (
  <footer className="px-4 lg:mt-28 md:px-16 lg:flex lg:flex-col lg:justify-center lg:items-center border-t border-black py-8">
    <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between">
      <div className="flex flex-col md:flex-row itmes-center justify-center md:space-x-4 mb-8 md:mb-0">
        <Link href="/" className="flex justify-center">
          <img
            src="/assets/logo_gallery_dream.png"
            className="max-w-[90px]"
            alt=""
          />
        </Link>
        <ul className="flex justify-center items-center space-x-2 mt-2 md:mt-0">
          <li>
            <Link href="/cgu" className="hover:font-bold">
              CGU
            </Link>
          </li>
          <li>
            <Link href="/cgv" className="hover:font-bold">
              CGV
            </Link>
          </li>
          <li>
            <Link href="/privacy-policy" className="hover:font-bold">
              Vie privée
            </Link>
          </li>
        </ul>
        <p className="md:hidden text-center text-xs"> GalleryDream © 2023</p>
      </div>
      <Link href="/">
        <img
          src="/assets/card_cb.svg"
          className="max-w-[200px] grayscale"
          alt=""
        />
      </Link>
    </div>
    <p className="hidden md:block mt-4"> GalleryDream © 2023</p>
  </footer>
);

export default Footer;
