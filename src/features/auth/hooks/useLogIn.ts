import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

export const useLogIn = () => {
  const logIn = async ({ email, password }: { email: string; password: string }) => {
    const { user: authUser } = await signInWithEmailAndPassword(getAuth(), email, password);
    if (authUser.emailVerified) return true;

    await sendEmailVerification(authUser, {
      url: import.meta.env.PROD
        ? 'https://a-habit.web.app/app/habits'
        : 'http://localhost:3000/app/habits',
      handleCodeInApp: true,
    });
    return false;
  };

  return { logIn };
};
