import { Box, chakra, Heading, theme, VStack } from '@chakra-ui/react';
import { isValidMotionProp, motion, useAnimation } from 'framer-motion';
import { FC, useEffect } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { assertDefined } from '@/utils/assert-defined';

import { useHabit } from '../api/useHabit';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

export const Habit: FC = () => {
  const { habitId } = useParams();
  assertDefined(habitId);

  const { loading, habit, doToday, undoToday } = useHabit(habitId);

  const controls = useAnimation();

  useEffect(() => {
    if (!habit) return;

    controls.start(
      {
        backgroundColor: habit.hasDoneToday ? theme.colors.green[400] : theme.colors.gray[200],
        scale: [1, 1.1, 1],
      },
      { duration: 1 }
    );
  }, [habit]);

  const onClick = () => {
    if (!habit) return;
    if (habit.hasDoneToday) {
      undoToday();
      return;
    }
    doToday();
  };

  return (
    <Layout title="Habits">
      {habit ? (
        <VStack py="4" spacing="8">
          <VStack>
            <Heading>{habit.content}</Heading>
          </VStack>

          <Box onClick={onClick}>
            <ChakraBox h="xs" w="xs" rounded="full" position="relative" animate={controls}>
              <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                <VStack>
                  <BiCheck fontSize="240px" color="white" />
                </VStack>
              </Box>
            </ChakraBox>
          </Box>
        </VStack>
      ) : null}
    </Layout>
  );
};
