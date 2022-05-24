import { Box, Stack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { FC } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { History } from '@/fire/docs/habit';
import { assertDefined } from '@/utils/assert-defined';

import { useHabit } from '../hooks';

const formattedDay = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];

type HistoryItemProps = { history: History };

const HistoryItem: FC<HistoryItemProps> = ({ history }) => {
  return (
    <Stack direction="row" spacing={{ base: '2', md: '4' }}>
      <Box
        h="14"
        w="14"
        rounded="full"
        bg={history.done ? 'green.400' : 'gray.200'}
        flexShrink="0"
        position="relative"
      >
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <BiCheck fontSize="36px" color="white" />
        </Box>
      </Box>
      <Box>
        <Box fontSize="sm" color="gray.500">
          {format(history.createdAt.toDate(), 'MM/dd')}{' '}
          {formattedDay[history.createdAt.toDate().getDay()]}
        </Box>
        <Box fontSize="sm">{history.comment}</Box>
      </Box>
    </Stack>
  );
};

export const HabitHistoriesIndex: FC = () => {
  const { habitId } = useParams();
  assertDefined(habitId);

  const { habit } = useHabit(habitId);

  return (
    <Layout title="Histories">
      {habit ? (
        <Stack py="4" spacing="4">
          {habit.filledHistories.map((h) => (
            <HistoryItem key={h.id} history={h} />
          ))}
        </Stack>
      ) : null}
    </Layout>
  );
};
