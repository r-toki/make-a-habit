import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const useResetPassword = () => {
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(getAuth(), email);
  };

  return { resetPassword };
};
