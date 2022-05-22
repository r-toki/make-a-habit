import { Box, CircularProgress, Flex, Heading, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { HabitDoc } from '@/fire/docs';
import { assertDefined } from '@/utils/assert-defined';

import { useHabit } from '../api/useHabit';

export const Habit: FC = () => {
  const { habitId } = useParams();
  assertDefined(habitId);

  const { habit, setHabit } = useHabit(habitId);

  const doToday = async (_habit: HabitDoc) => {
    _habit.doToday();
    await _habit.save();
    setHabit(new HabitDoc({ id: _habit.id, ref: _habit.ref, data: () => _habit.data }));
  };

  const undoToday = async (_habit: HabitDoc) => {
    _habit.undoToday();
    await _habit.save();
    setHabit(new HabitDoc({ id: _habit.id, ref: _habit.ref, data: () => _habit.data }));
  };

  console.log(habit?.doneAtList);

  return (
    <Layout title="Habits">
      {habit ? (
        <VStack py="4">
          <Flex direction="column" alignItems="center">
            <Heading size="sm">{habit.content}</Heading>
            <Box fontSize="sm">{habit.formattedDays}</Box>
            <Box fontSize="sm"> {habit.formattedPeriod}</Box>
          </Flex>

          <Box
            h="320px"
            w="320px"
            position="relative"
            cursor="pointer"
            onClick={habit.hasDoneToday ? () => undoToday(habit) : () => doToday(habit)}
          >
            <CircularProgress size="320px" thickness="4px" value={habit.achievementPercent} />
            <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
              <VStack>
                <Box>{habit.hasDoneToday ? 'Done!' : 'Not yet.'}</Box>
                <Box>{habit.achievementRate}</Box>
              </VStack>
            </Box>
          </Box>
        </VStack>
      ) : null}
    </Layout>
  );
};
