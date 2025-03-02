import { DefaultSession } from 'next-auth';

declare module '*jpg';

declare module 'next-auth' {
  interface Session {
    user: IUser & DefaultSession['user'];
  }

  export interface IUser {
    id: string;
    name: string;
    userName: string;
    email: string;
    avatar: string;
    role: string;
    password: string;
    bio: string;
    lat: number;
    lng: number;
  }
}
