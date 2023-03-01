import React, { useEffect, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  FaBars,
  FaBox,
  FaCoins,
  FaImages,
  FaRocket,
  FaSignInAlt,
  FaSignOutAlt,
  FaStar,
  FaUser,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import useWindowSize from '../hooks/useWindowSize';
// import useCart from '../hooks/useCart';

function useOutsideAlerter(ref: any, setIsOpenMenu: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpenMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const Navbar = ({ user, status }: any) => {
  const router = useRouter();
  const window = useWindowSize();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsOpenMenu);

  return (
    <div className="px-4 md:px-8 py-4 gap-4 space-y-20 border-b border-black bg-base-100 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="max-w-[70px] md:max-w-[80px]">
            <img src="/assets/logo_gallery_dream.png" alt="" />
          </Link>
          <nav className="hidden md:block">
            <Transition
              show
              appear
              enter="delay-150 transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="flex space-x-2"
            >
              {status === 'authenticated' && (
                <>
                  <Link href="/imagine">
                    <button
                      type="button"
                      className={`btn ${
                        router.pathname === '/imagine'
                          ? 'btn-primary btn-active drop-shadow-active-button hover:drop-shadow-none'
                          : 'btn-ghost'
                      }`}
                    >
                      Créer
                    </button>
                  </Link>
                  <Link href="/creations">
                    <button
                      type="button"
                      className={`btn ${
                        router.pathname.startsWith('/creations')
                          ? 'btn-primary btn-active drop-shadow-active-button hover:drop-shadow-none'
                          : 'btn-ghost'
                      }`}
                    >
                      Mes créations
                    </button>
                  </Link>
                </>
              )}
              <Link href="/explore">
                <button
                  type="button"
                  className={`btn ${
                    router.pathname === '/explore'
                      ? 'btn-primary btn-active drop-shadow-active-button hover:drop-shadow-none'
                      : 'btn-ghost'
                  }`}
                >
                  Explorer
                </button>
              </Link>
              {/* <Link href="/deco-maison">
                  <button type="button" className="btn btn-ghost">
                    Déco / maison
                  </button>
                </Link> */}
            </Transition>
          </nav>
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
        <div
          style={{
            display:
              window.width > 768 && status === 'unauthenticated'
                ? 'none'
                : 'flex',
          }}
          className=" flex space-x-4 items-center"
        >
          {status === 'authenticated' && user?.credits && (
            <Link href="/credits">
              <Transition
                show
                appear
                enter="delay-150 transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="flex items-center space-x-2"
              >
                <FaCoins /> <p className="font-bold">{user?.credits}</p>
              </Transition>
            </Link>
          )}
          {/* <Link href="/imagine">
            <button type="button" className="md:hidden btn btn-primary btn-sm">
              <FaStar className="mr-2" /> Créer
            </button>
          </Link> */}
          {/* {status === 'authenticated' && (
            <Link href="/cart">
              <div className="flex items-center relative">
                <div className="rounded-full bg-primary text-white absolute text-xs w-4 aspect-video flex items-center justify-center bottom-2 left-2">
                  {total}
                </div>
                <FaShoppingBag className="" />
              </div>
            </Link>
          )} */}
          <div className="relative">
            {status === 'authenticated' && (
              <button
                type="button"
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                className="avatar"
              >
                <div className="border border-black rounded-full p-1">
                  <div className="w-10 mask mask-circle">
                    <img
                      alt="profile"
                      src="https://placeimg.com/80/80/people"
                    />
                  </div>
                </div>
              </button>
            )}
            {status === 'unauthenticated' && (
              <button type="button" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                <FaBars className="text-2xl" />
              </button>
            )}
            {isOpenMenu && (
              <ul
                role="menu"
                ref={wrapperRef}
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
                    <li>
                      <Link href="/orders">
                        <FaBox className="w-4 h-4" /> mes commandes
                      </Link>
                    </li>
                    <hr className="border my-4" />
                    <li>
                      <Link href="/explore">
                        <FaRocket className="w-4 h-4" /> Explorer
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/imagine">
                        <FaImages className="w-4 h-4" /> Posters
                      </Link>
                    </li>
                    <li>
                      <Link href="/imagine">
                        <FaHome className="w-4 h-4" /> Déco / Maison
                      </Link>
                    </li> */}
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
                      <Link href="/register">
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
