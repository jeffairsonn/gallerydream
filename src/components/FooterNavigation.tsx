import { useRouter } from 'next/router';
import React from 'react';
import {
  MdHome,
  MdOutlineHome,
  MdOutlineFavorite,
  MdAccountCircle,
  MdSearch,
  MdFavoriteBorder,
  MdOutlineAccountCircle,
} from 'react-icons/md';

const FooterNavigation = () => {
  const router = useRouter();
  return (
    <div className="btm-nav">
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
        className={`${router.pathname !== '/explore' ? '' : 'active'}`}
        onClick={() => {
          router.push('/explore');
        }}
      >
        <MdSearch className="text-2xl" />
      </button>
      <button
        type="button"
        className={`${router.pathname !== '/favorite' ? '' : 'active'}`}
      >
        {router.pathname !== '/favorite' && (
          <MdFavoriteBorder className="text-2xl" />
        )}
        {router.pathname === '/favorite' && (
          <MdOutlineFavorite className="text-2xl" />
        )}
      </button>
      <button
        type="button"
        className={`${router.pathname !== '/account' ? '' : 'active'}`}
      >
        {router.pathname !== '/account' && (
          <MdOutlineAccountCircle className="text-2xl" />
        )}
        {router.pathname === '/account' && (
          <MdAccountCircle className="text-2xl" />
        )}
      </button>
    </div>
  );
};

export default FooterNavigation;
