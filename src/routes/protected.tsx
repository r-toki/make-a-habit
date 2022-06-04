import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { MeProvider } from '@/providers';
import { lazyImport } from '@/utils/lazy-import';

const { HabitsRoutes } = lazyImport(() => import('@/features/habits'), 'HabitsRoutes');

const App: FC = () => {
  return (
    <MeProvider>
      <Outlet />
    </MeProvider>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [{ path: 'habits/*', element: <HabitsRoutes /> }],
  },
];
