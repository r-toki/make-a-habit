import {
  applyActionCode,
  confirmPasswordReset,
  getAuth,
  verifyPasswordResetCode,
} from 'firebase/auth';

export const useAuthAction = () => {
  const verifyEmail = async (oobCode: string) => {
    try {
      console.log('[make-a-habit] verify email');
      await applyActionCode(getAuth(), oobCode);
      return true;
    } catch (e: any) {
      console.error(`[make-a-habit] ${e.toString()}`);
      return false;
    }
  };

  const resetPassword = async (oobCode: string, password: string) => {
    await verifyPasswordResetCode(getAuth(), oobCode);
    await confirmPasswordReset(getAuth(), oobCode, password);
  };

  return {
    verifyEmail,
    resetPassword,
  };
};
