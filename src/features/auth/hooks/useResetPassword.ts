import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const useResetPassword = () => {
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(getAuth(), email, {
      url: import.meta.env.PROD
        ? 'https://a-habit.web.app/auth/log-in'
        : 'http://localhost:3000/auth/log-in',
      handleCodeInApp: true,
    });
  };

  return { resetPassword };
};
