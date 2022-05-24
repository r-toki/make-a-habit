import { Box, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { HabitDoc } from '@/fire/docs';

import { useHabitsAll } from '../hooks';

type HabitItemProps = { habit: HabitDoc };

const HabitItem: FC<HabitItemProps> = ({ habit }) => {
  return (
    <Link to={`/app/habits/${habit.id}/histories`}>
      <Box>
        <Heading size="sm">{habit.content}</Heading>
        <HStack>
          <Box fontSize="sm">{habit.formattedPeriod}</Box>
          {!habit.hasEnded && <Box fontSize="sm">(in progress)</Box>}
        </HStack>
      </Box>
    </Link>
  );
};

export const HabitsAllIndex: FC = () => {
  const { habits } = useHabitsAll();

  return (
    <Layout title="Histories">
      <Stack py="4" spacing="4">
        {habits.map((h) => (
          <HabitItem key={h.id} habit={h} />
        ))}
      </Stack>
    </Layout>
  );
};
