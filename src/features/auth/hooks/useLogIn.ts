import { getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const useLogIn = () => {
  const logIn = async ({ email, password }: { email: string; password: string }) => {
    const { user: authUser } = await signInWithEmailAndPassword(getAuth(), email, password);
    if (authUser.emailVerified) return true;

    await signOut(getAuth());
    await sendEmailVerification(authUser);
    return false;
  };

  return { logIn };
};
