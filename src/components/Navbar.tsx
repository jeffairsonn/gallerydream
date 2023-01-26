import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { FaCoins, FaImages, FaSignOutAlt, FaStar } from 'react-icons/fa';

const Navbar = ({ user, status }: any) => (
  <div className="px-4 md:px-8 lg:px-40 py-4 md:py-20 gap-4 space-y-20">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <button type="button" className="btn btn-circle btn-lg btn-primary">
            GD
          </button>
        </Link>
        <h1 className="font-bold text-2xl">GalleryDream</h1>
      </div>
      {status === 'unauthenticated' && (
        <div className="hidden md:flex space-x-2">
          <Link href="/login">
            <button type="button" className="btn btn-primary btn-outline">
              Se connecter
            </button>
          </Link>
          <Link href="/register">
            <button type="button" className="btn btn-primary">
              S&apos;inscrire
            </button>
          </Link>
        </div>
      )}
      {status === 'authenticated' && (
        <div className="hidden md:flex space-x-4 items-center">
          <div className="flex items-center space-x-2">
            <FaCoins />{' '}
            <p className="font-bold">{user?.credits ? user?.credits : 0}</p>
          </div>
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <img alt="profile" src="https://placeimg.com/80/80/people" />
              </div>
            </button>
            <ul
              role="menu"
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/imagine">
                  <FaStar className="w-4 h-4" /> Créer
                </Link>
              </li>
              <li>
                <Link href="/credits">
                  <FaCoins className="w-4 h-4" /> Obtenir des crédits
                </Link>
              </li>
              <li>
                <Link href="/imagine">
                  <FaImages className="w-4 h-4" /> Mes créations
                </Link>
              </li>
              <hr className="border my-4" />
              <li>
                <button type="button" onClick={() => signOut()}>
                  <FaSignOutAlt className="w-4 h-4" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="flex md:hidden space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </div>
    </div>
  </div>
);

export default Navbar;
