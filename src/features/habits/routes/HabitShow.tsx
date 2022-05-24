import {
  Box,
  Button,
  chakra,
  Heading,
  Stack,
  theme,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { isValidMotionProp, motion, useAnimation } from 'framer-motion';
import { FC, useEffect } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { Form, TextareaField } from '@/components/Form';
import { Layout } from '@/components/Layout';
import { assertDefined } from '@/utils/assert-defined';

import { useHabit } from '../hooks/useHabit';

const schema = z.object({ comment: z.string() });

type RegisterValues = { comment: string };

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

export const HabitShow: FC = () => {
  const { habitId } = useParams();
  assertDefined(habitId);

  const { loading, habit, doToday, undoToday, commentToday } = useHabit(habitId);

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

  const onToggleDone = () => {
    if (!habit) return;

    if (habit.hasDoneToday) {
      undoToday();
      return;
    }
    doToday();
  };

  const onComment = ({ comment }: { comment: string }) => {
    commentToday(comment);
  };

  const [isLargerThan30em] = useMediaQuery('(min-width: 30em)');

  return (
    <Layout title="Habits">
      {habit ? (
        <VStack py={{ base: '2', md: '4' }} spacing={{ base: '4', md: '8' }}>
          <VStack>
            <Heading>{habit.content}</Heading>
          </VStack>

          <Box onClick={onToggleDone}>
            <ChakraBox h="xs" w="xs" rounded="full" position="relative" animate={controls}>
              <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                <BiCheck fontSize="240px" color="white" />
              </Box>
            </ChakraBox>
          </Box>

          <Form<RegisterValues, typeof schema>
            onSubmit={onComment}
            schema={schema}
            options={{ defaultValues: { comment: habit.todayHistory?.comment ?? '' } }}
          >
            {({ register, formState }) => (
              <Stack w="xs">
                <TextareaField
                  registration={register('comment')}
                  error={formState.errors.comment}
                />

                <Button type="submit" disabled={loading} size={isLargerThan30em ? 'md' : 'sm'}>
                  Comment
                </Button>
              </Stack>
            )}
          </Form>
        </VStack>
      ) : null}
    </Layout>
  );
};
