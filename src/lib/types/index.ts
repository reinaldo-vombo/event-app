import { IUser } from 'next-auth';

export type TLayout = {
  children: React.ReactNode;
};
export type TState = {
  message: string;
  error?: boolean;
  status: number;
  success?: boolean;
  fields?: Record<string, string>;
  issues?: string[];
};
export type TUserProps = {
  user:
    | (IUser & {
        name?: string | null;
        email?: string | null;
        image?: string | null;
      })
    | undefined;
};
