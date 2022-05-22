import { getAuth, signOut } from 'firebase/auth';

export const useLogOut = () => {
  const logOut = () => signOut(getAuth());

  return { logOut };
};
