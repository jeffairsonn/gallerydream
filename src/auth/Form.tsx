import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import LoadingDots from './loading-dots';

const Form = ({
  type,
  setEmailSend,
}: {
  type: 'login' | 'register';
  setEmailSend: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   if (type === 'login') {
  //     signIn('credentials', {
  //       redirect: false,
  //       email: e.currentTarget.email.value,
  //       password: e.currentTarget.password.value,
  //       // @ts-ignore
  //     }).then(({ ok }) => {
  //       setLoading(false);
  //       if (ok) {
  //         router.push('/');
  //       } else {
  //         setErrorMessage("L'adresse email ou le mot de passe est incorrect");
  //         setTimeout(async () => {
  //           setErrorMessage('');
  //         }, 4000);
  //       }
  //     });
  //   } else {
  //     fetch('/api/auth/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: e.currentTarget.email.value,
  //         username: e.currentTarget.username.value,
  //       }),
  //     }).then(async (res) => {
  //       setLoading(false);
  //       if (res.status === 200) {
  //         toast.success('Account created! Redirecting to login...');
  //         setTimeout(() => {
  //           router.push('/login');
  //         }, 2000);
  //       } else {
  //         setErrorMessage(await res.text());
  //         setTimeout(async () => {
  //           setErrorMessage('');
  //         }, 4000);
  //       }
  //     });
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.currentTarget.email.value,
        username: e.currentTarget.username && e.currentTarget.username.value,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        toast.success('Account created! Redirecting to login...');
        setTimeout(() => {
          setEmailSend(true);
        }, 2000);
      } else {
        setErrorMessage(await res.text());
        setTimeout(async () => {
          setErrorMessage('');
        }, 4000);
      }
    });
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 py-8 sm:px-4"
    >
      {type === 'register' && (
        <div className="form-control w-full">
          <label htmlFor="username" className="label font-bold">
            Nom d&apos;utilisateur
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="jeanmarc"
            autoComplete="username"
            required
            className="input md:input-lg input-bordered w-full"
          />
        </div>
      )}
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
          className="input md:input-lg input-bordered w-full"
        />
      </div>
      {/* <div className="form-control w-full">
        <label htmlFor="password" className="label font-bold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="input lg:input-lg input-bordered w-full"
        />
      </div> */}
      <div className="flex space-x-2">
        <input id="cgu" type="checkbox" className="checkbox" />
        <label htmlFor="cgu" className="cursor-pointer p-0 w-fit">
          <span>
            J&apos;accepte les{' '}
            <span className="underline">
              conditions générales d&apos;utilisation
            </span>
          </span>
        </label>
      </div>
      {errorMessage !== '' && (
        <div className="alert alert-warning shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}.</span>
          </div>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className={`${
          loading ? 'cursor-not-allowed border-gray-200 bg-gray-100' : ''
        } btn lg:btn-lg btn-primary`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === 'login' ? 'Se connecter' : "S'inscrire"}</p>
        )}
      </button>
      {type === 'login' ? (
        <p className="text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link
            href="/register"
            className="font-semibold text-gray-800 underline"
          >
            S&lsquo;inscrire gratuitement.
          </Link>{' '}
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Vous possédez déja un compte ?{' '}
          <Link href="/login" className="font-semibold text-gray-800 underline">
            Connectez vous
          </Link>
        </p>
      )}
    </form>
  );
};

export default Form;
