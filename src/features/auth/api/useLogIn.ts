import { signInWithEmailAndPassword } from 'firebase/auth';

import { getAuth } from '../../../config/firebase';

export const useLogIn = () => {
  const logIn = async ({ email, password }: { email: string; password: string }) => {
    await signInWithEmailAndPassword(getAuth(), email, password);
  };

  return { logIn };
};
