import Link from 'next/link';
import React from 'react';

const Footer = () => (
  <footer className="px-4 lg:mt-28 md:px-16 lg:flex lg:flex-col lg:justify-center lg:items-center border-t border-black py-8">
    <div className="w-full flex items-center justify-between">
      <div className="flex itmes-center space-x-4">
        <Link href="/">
          <img
            src="/assets/logo_gallery_dream.png"
            className="max-w-[90px]"
            alt=""
          />
        </Link>
        <nav className="flex items-center">
          <ul className="flex space-x-4 ">
            <li>
              <Link href="/cgu" className="hover:font-bold">
                CGU
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:font-bold">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:font-bold">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Link href="/">
        <img
          src="/assets/card_cb.svg"
          className="max-w-[200px] grayscale"
          alt=""
        />
      </Link>
    </div>
  </footer>
);

export default Footer;
