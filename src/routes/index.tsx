import { FC } from 'react';
import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './public';

export const AppRoutes: FC = () => {
  const routes = publicRoutes;

  const element = useRoutes([...routes]);

  return element;
};
