import { Navigate } from 'react-router-dom';

import { useAuth } from '@/providers/auth';

export const Landing = () => {
  const { uid } = useAuth();

  if (uid) return <Navigate to="/app/habits" />;
  return <Navigate to="/auth/log-in" />;
};
