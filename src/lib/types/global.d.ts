import { DefaultSession } from 'next-auth';

declare module '*jpg';

declare module 'next-auth' {
  interface Session {
    user: IUser & DefaultSession['user'];
  }

  export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    image: string | null;
    role: string;
    follower: string | null;
    // Social Relationships
    followers: {
      id: string;
      name: string;
      username: string;
      image: string | null;
    }[];
    following: {
      id: string;
      name: string;
      username: string;
      image: string | null;
    }[];

    bio: string | null;
    lat: number | null;
    lng: number | null;
  }
}
