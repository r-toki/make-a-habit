import { Box, CircularProgress, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { Layout } from '@/components/Layout';
import { Link } from '@/components/Link';
import { HabitDoc } from '@/fire/docs';

import { useHabits } from '../api/useHabits';

type HabitItemProps = { habit: HabitDoc };

const HabitItem: FC<HabitItemProps> = ({ habit }) => {
  return (
    <HStack>
      <CircularProgress size="64px" value={habit.achievementPercent} />
      <Box flex="1">
        <Link to={`/app/habits/${habit.id}`}>
          <Heading size="sm">{habit.content}</Heading>
        </Link>
        <Box fontSize="sm">{habit.formattedDays}</Box>
        <Box fontSize="sm"> {habit.formattedPeriod}</Box>
      </Box>
    </HStack>
  );
};

export const Habits: FC = () => {
  const { habits } = useHabits();

  return (
    <Layout title="Habits">
      <Stack py="4" spacing="4">
        {habits.map((h) => (
          <HabitItem key={h.id} habit={h} />
        ))}
      </Stack>
    </Layout>
  );
};
