import { Route, Routes } from 'react-router-dom';

import { Action } from './Action';
import { LogIn } from './LogIn';
import { SignUp } from './SignUp';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<LogIn />} />
      <Route path="action" element={<Action />} />
    </Routes>
  );
};
