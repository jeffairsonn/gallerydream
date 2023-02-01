import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  FaCoins,
  FaImages,
  FaSignInAlt,
  FaSignOutAlt,
  FaStar,
  FaUser,
} from 'react-icons/fa';

const Navbar = ({ user, status }: any) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <div className="px-4 md:px-8 lg:px-40 py-4 md:py-20 gap-4 space-y-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <button
              type="button"
              className="btn btn-circle md:btn-lg btn-primary"
            >
              GD
            </button>
          </Link>
          <h1 className="font-bold text-lg md:text-2xl">GalleryDream</h1>
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

        <div className="flex space-x-4 items-center">
          <div className="flex items-center space-x-2">
            <FaCoins />{' '}
            <p className="font-bold">{user?.credits ? user?.credits : 0}</p>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <img alt="profile" src="https://placeimg.com/80/80/people" />
              </div>
            </button>
            {isOpenMenu && (
              <ul
                role="menu"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 absolute right-0 z-50 top-12"
              >
                {status === 'authenticated' ? (
                  <>
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
                      <Link href="/creations">
                        <FaImages className="w-4 h-4" /> Mes créations
                      </Link>
                    </li>
                    <hr className="border my-4" />
                    <li>
                      <button type="button" onClick={() => signOut()}>
                        <FaSignOutAlt className="w-4 h-4" /> Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/login">
                        <FaUser className="w-4 h-4" /> S&apos;inscrire
                      </Link>
                    </li>
                    <li>
                      <Link href="/login">
                        <FaSignInAlt className="w-4 h-4" /> Se connecter
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
