import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../db/client';
import { compare } from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";

import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { randomBytes } from 'crypto';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });


        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.image,
          bio: user.bio,
          lat: user.lat,
          lng: user.lng
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if(!profile?.email) {
        throw new Error('Email is required')
      }
      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name ?? '',
          username: profile.email.split("@")[0], // Auto-generate username
          password: randomBytes(32).toString("hex"),
        },
        update: {
          name: profile.name,
        },
      })
      return true
    },
  
    jwt: ({ token, user, session, trigger }) => {
      if (trigger === 'update' && session?.user) {
        return {
          ...token,
          name: session.user.name || token.name,
          email: session.user.email || token.email,
          avatar: session.user.avatar || token.avatar,
        };
      }

      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          id: u.id,
          role: u.role,
          avatar: u.image,
          lat: u.lat,
          lng: u.lng,
          bio: u.bio
        };
      }

      return token;
    },
    session: ({ session, token }) => {
      // console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          roleId: token.roleId,
          avatar: token.avatar,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the home page after successful login
      if (url === '/api/auth/signin') {
        return `${baseUrl}/`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/login',
  },
};
export const getServerAuthSession = () => getServerSession(authOptions);