import { lazyImport } from '../utils/lazy-import';

const { HabitsRoutes } = lazyImport(() => import('../features/habits'), 'HabitsRoutes');

export const protectedRoutes = [
  {
    path: '/habits/*',
    element: <HabitsRoutes />,
  },
];
