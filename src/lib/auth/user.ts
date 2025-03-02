import { useSession } from 'next-auth/react';

export const User = () => {
  const user = useSession();

  return user.data?.user;
};
