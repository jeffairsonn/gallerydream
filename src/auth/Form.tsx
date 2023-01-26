import React, { useState } from 'react';

import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoadingDots from './loading-dots';

const Form = ({ type }: { type: 'login' | 'register' }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === 'login') {
          signIn('credentials', {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ ok, error }) => {
            setLoading(false);
            if (ok) {
              router.push('/');
            } else {
              toast.error(error);
            }
          });
        } else {
          fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              toast.success('Account created! Redirecting to login...');
              setTimeout(() => {
                router.push('/');
              }, 2000);
            } else {
              toast.error(await res.text());
            }
          });
        }
      }}
      className="flex flex-col space-y-4 py-8 sm:px-4"
    >
      <div className="form-control w-full">
        <label htmlFor="email" className="label font-bold">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="panic@thedis.co"
          autoComplete="email"
          required
          className="input input-lg input-bordered w-full"
        />
      </div>
      <div className="form-control w-full">
        <label htmlFor="password" className="label font-bold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="input input-lg input-bordered w-full"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`${
          loading ? 'cursor-not-allowed border-gray-200 bg-gray-100' : ''
        } btn btn-lg btn-primary`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === 'login' ? 'Sign In' : 'Sign Up'}</p>
        )}
      </button>
      {type === 'login' ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-gray-800">
            Sign up
          </Link>{' '}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>{' '}
          instead.
        </p>
      )}
    </form>
  );
};

export default Form;
