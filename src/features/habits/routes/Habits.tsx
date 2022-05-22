import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { Layout } from '@/components/Layout';

import { useHabits } from '../api/useHabits';

export const Habits: FC = () => {
  const { habits } = useHabits();
  console.log(habits);

  return (
    <Layout title="Habits">
      <Box py="4"></Box>
    </Layout>
  );
};
