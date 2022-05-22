import './index.css';

import { FC } from 'react';

import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';

export const App: FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
