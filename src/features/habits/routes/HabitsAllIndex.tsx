import { Box, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { Layout } from '@/components/Layout';
import { Link } from '@/components/Link';
import { HabitDoc } from '@/fire/docs';

import { useHabitsAll } from '../hooks';

type HabitItemProps = { habit: HabitDoc };

const HabitItem: FC<HabitItemProps> = ({ habit }) => {
  return (
    <Link to={`/app/habits/${habit.id}/histories`}>
      <Box>
        <Heading size="sm" whiteSpace="pre-wrap">
          {habit.content}
        </Heading>
        <HStack>
          <Box fontSize="sm">{habit.formattedPeriod}</Box>
          {!habit.hasEnded && <Box fontSize="sm">(in progress)</Box>}
        </HStack>
      </Box>
    </Link>
  );
};

export const HabitsAllIndex: FC = () => {
  const { loading, habits } = useHabitsAll();

  return (
    <Layout title="Histories">
      <Stack py="4" spacing="4">
        {!loading && habits.length === 0 && (
          <Link to="/app/habits/new" alignSelf="center" color="green.400" fontWeight="bold">
            Create a New habit
          </Link>
        )}
        {habits.map((h) => (
          <HabitItem key={h.id} habit={h} />
        ))}
      </Stack>
    </Layout>
  );
};
