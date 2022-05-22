import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const useLogIn = () => {
  const logIn = async ({ email, password }: { email: string; password: string }) => {
    await signInWithEmailAndPassword(getAuth(), email, password);
  };

  return { logIn };
};
