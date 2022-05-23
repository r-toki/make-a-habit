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

  const { habit } = useHabit(habitId);

  const controls = useAnimation();

  useEffect(() => {
    controls.start(
      { backgroundColor: theme.colors.green[400], scale: [1, 1.1, 1] },
      { duration: 1 }
    );
  }, [habit]);

  const onClick = () => {
    //
  };

  return (
    <Layout title="Habits">
      {habit ? (
        <VStack py="4" spacing="8">
          <VStack>
            <Heading size="sm">{habit.content}</Heading>
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
