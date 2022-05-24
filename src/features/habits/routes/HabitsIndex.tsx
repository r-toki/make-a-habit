import { Box, CircularProgress, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { Layout } from '@/components/Layout';
import { Link } from '@/components/Link';
import { HabitDoc } from '@/fire/docs';

import { useHabits } from '../hooks/useHabits';

type HabitItemProps = { habit: HabitDoc };

const HabitItem: FC<HabitItemProps> = ({ habit }) => {
  return (
    <Link to={`/app/habits/${habit.id}`}>
      <HStack spacing={{ base: '2', md: '4' }}>
        <CircularProgress
          size="64px"
          color={habit.hasDoneToday ? 'green.400' : 'gray.400'}
          value={habit.progressPercent}
        />
        <Box flex="1">
          <Heading size="sm">{habit.content}</Heading>
          <Box fontSize="sm"> {habit.formattedPeriod}</Box>
        </Box>
      </HStack>
    </Link>
  );
};

export const HabitsIndex: FC = () => {
  const { loading, habits } = useHabits();

  return (
    <Layout title="Habits">
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
