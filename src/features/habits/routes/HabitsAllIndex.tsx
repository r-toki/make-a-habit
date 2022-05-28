import {
  Box,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { BiDotsVertical, BiTrash } from 'react-icons/bi';

import { Layout } from '@/components/Layout';
import { Link } from '@/components/Link';
import { formattedPeriod, HabitDoc } from '@/fire/docs';

import { useHabitsAll } from '../hooks';

type HabitItemProps = { habit: HabitDoc; onRemove: () => void };

const HabitItem: FC<HabitItemProps> = ({ habit, onRemove }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Link to={`/app/habits/${habit.id}/histories`} flex="1">
        <Box>
          <Heading size="sm" whiteSpace="pre-wrap">
            {habit.content}
          </Heading>
          <HStack>
            <Box fontSize="sm">{formattedPeriod(habit)}</Box>
            {habit.inProgress && <Box fontSize="sm">(in progress)</Box>}
          </HStack>
        </Box>
      </Link>

      {!habit.inProgress && (
        <Box>
          <Menu>
            <MenuButton color="gray.500">
              <BiDotsVertical fontSize="20px" />
            </MenuButton>

            <MenuList>
              <MenuItem onClick={onRemove}>
                <HStack>
                  <BiTrash fontSize="20px" />
                  <Box>Delete</Box>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Flex>
  );
};

export const HabitsAllIndex: FC = () => {
  const { loading, habits, remove } = useHabitsAll();

  return (
    <Layout title="Histories">
      <Stack py="4" spacing="4">
        {!loading && habits.length === 0 && (
          <Link to="/app/habits/new" alignSelf="center" color="primary.main" fontWeight="bold">
            Create a New habit
          </Link>
        )}
        {habits.map((h) => (
          <HabitItem key={h.id} habit={h} onRemove={() => remove(h)} />
        ))}
      </Stack>
    </Layout>
  );
};
