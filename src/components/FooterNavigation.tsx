import { useRouter } from 'next/router';
import React from 'react';
import {
  MdHome,
  MdOutlineHome,
  MdOutlineFavorite,
  MdSearch,
  MdFavoriteBorder,
  MdOutlineAddCircleOutline,
  MdOutlineAddCircle,
} from 'react-icons/md';

const FooterNavigation = () => {
  const router = useRouter();
  return (
    <div className="btm-nav z-[50] md:hidden">
      <button
        type="button"
        className={`${router.pathname !== '/' ? '' : 'active'}`}
        onClick={() => {
          router.push('/');
        }}
      >
        {router.pathname !== '/' && <MdOutlineHome className="text-2xl" />}
        {router.pathname === '/' && <MdHome className="text-2xl" />}
      </button>
      <button
        type="button"
        className={`${router.pathname !== '/imagine' ? '' : 'active'}`}
        onClick={() => {
          router.push('/imagine');
        }}
      >
        {router.pathname !== '/imagine' && (
          <MdOutlineAddCircleOutline className="text-2xl" />
        )}
        {router.pathname === '/imagine' && (
          <MdOutlineAddCircle className="text-2xl" />
        )}
      </button>
      <button
        type="button"
        className={`${router.pathname !== '/explore' ? '' : 'active'}`}
        onClick={() => {
          router.push('/explore');
        }}
      >
        <MdSearch className="text-2xl" />
      </button>
      <button
        type="button"
        className={`${router.pathname !== '/creations' ? '' : 'active'}`}
        onClick={() => {
          router.push('/creations');
        }}
      >
        {router.pathname !== '/creations' && (
          <MdFavoriteBorder className="text-2xl" />
        )}
        {router.pathname === '/creations' && (
          <MdOutlineFavorite className="text-2xl" />
        )}
      </button>
      {/* <button
        type="button"
        className={`${router.pathname !== '/account' ? '' : 'active'}`}
      >
        {router.pathname !== '/account' && (
          <MdOutlineAccountCircle className="text-2xl" />
        )}
        {router.pathname === '/account' && (
          <MdAccountCircle className="text-2xl" />
        )}
      </button> */}
    </div>
  );
};

export default FooterNavigation;
