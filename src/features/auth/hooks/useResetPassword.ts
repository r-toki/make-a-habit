import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const useResetPassword = () => {
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(getAuth(), email, {
      url: import.meta.env.PROD
        ? 'https://a-habit.web.app/app/habits'
        : 'http://localhost:3000/app/habits',
      handleCodeInApp: true,
    });
  };

  return { resetPassword };
};
