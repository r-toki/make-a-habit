import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Link } from '@/components/Link';
import { assertDefined } from '@/utils/assert-defined';

import { useHabit } from '../hooks';

export const HabitHistoriesIndex: FC = () => {
  const { habitId } = useParams();
  assertDefined(habitId);

  const { habit } = useHabit(habitId);

  return (
    <Layout title="Histories">
      {habit ? (
        <>
          <Link to="/app/habits/all">back</Link>
          <Stack py="4" spacing="4"></Stack>
        </>
      ) : null}
    </Layout>
  );
};
