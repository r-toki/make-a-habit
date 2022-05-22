import { Box, CircularProgress, Heading, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { assertDefined } from '@/utils/assert-defined';

import { useHabit } from '../api/useHabit';

export const Habit: FC = () => {
  const { habitId } = useParams();
  assertDefined(habitId);

  const { habit } = useHabit(habitId);

  return (
    <Layout title="Habits">
      {habit ? (
        <VStack py="4">
          <Heading size="sm">{habit.content}</Heading>
          <Box h="320px" w="320px" position="relative" cursor="pointer">
            <CircularProgress size="320px" thickness="4px" value={habit.achievementPercent} />
            <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
              <Box>I am a geek</Box>
            </Box>
          </Box>
        </VStack>
      ) : null}
    </Layout>
  );
};
