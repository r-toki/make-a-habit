import { FC } from 'react';
import { useRoutes } from 'react-router-dom';

import { useAuth } from '@/providers/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes: FC = () => {
  const { uid } = useAuth();

  const routes = uid ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return element;
};
