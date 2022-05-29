import { Navigate } from 'react-router-dom';

import { useAuth } from '@/providers/auth';

export const Landing = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/app/habits" />;
  return <Navigate to="/auth/log-in" />;
};
