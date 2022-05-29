import { confirmPasswordReset, getAuth, verifyPasswordResetCode } from 'firebase/auth';

export const useAuthAction = () => {
  const resetPassword = async (oobCode: string, password: string) => {
    await verifyPasswordResetCode(getAuth(), oobCode);
    await confirmPasswordReset(getAuth(), oobCode, password);
  };

  return {
    resetPassword,
  };
};
