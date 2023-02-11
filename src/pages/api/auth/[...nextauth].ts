/* eslint-disable no-param-reassign */
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import signIn from '../../../services/auth';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      // authorization: {
      //   params: {
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //   },
      // },
    }),
    CredentialsProvider({
      name: 'Sign in with Email',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */

        try {
          const data: any = {
            email: credentials.email,
            password: credentials.password,
          };
          const { user, jwt } = await signIn(data);

          return { ...user, jwt };
        } catch (error) {
          // Sign In Fail
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const newSession = {
        ...session,
        id: token.id,
        jwt: token.jwt,
      };

      return Promise.resolve(newSession);
    },
    jwt: async ({ token, user, account }) => {
      const isSignIn = !!user;
      const newUser: any = user;

      if (isSignIn) {
        if (account?.provider === 'google') {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
          );
          const data = await response.json();

          token.jwt = data.jwt;
          token.id = data.user.id;
        } else {
          token.jwt = newUser.jwt;
          token.id = user.id;
        }
      }
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: '/login',
  },
};
export default NextAuth(authOptions);
