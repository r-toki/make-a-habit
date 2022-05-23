import { Box, CircularProgress, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { Layout } from '@/components/Layout';
import { Link } from '@/components/Link';
import { HabitDoc } from '@/fire/docs';

import { useHabits } from '../api/useHabits';

type HabitItemProps = { habit: HabitDoc };

const HabitItem: FC<HabitItemProps> = ({ habit }) => {
  return (
    <Link to={`/app/habits/${habit.id}`}>
      <HStack>
        <CircularProgress size="64px" color="green.400" value={habit.progressPercent} />
        <Box flex="1">
          <Heading size="sm">{habit.content}</Heading>
          <Box fontSize="sm"> {habit.formattedPeriod}</Box>
        </Box>
      </HStack>
    </Link>
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
