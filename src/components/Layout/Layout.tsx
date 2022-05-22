import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BiCheck, BiHistory, BiLogOut, BiMenu, BiPlus } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLogOut } from '@/features/auth';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ title, children }) => {
  const location = useLocation();
  const path = location.pathname.split('/').slice(1).join('/');

  const navigate = useNavigate();

  const { logOut } = useLogOut();

  const onLogOut = async () => {
    await logOut();
    navigate('/auth/log-in');
  };

  return (
    <Stack h="full">
      <Box py="4" borderBottomWidth="1px">
        <Container>
          <Center>
            <Heading>{title}</Heading>
          </Center>
        </Container>
      </Box>

      <Box flex="1" overflow="auto">
        <Container>{children}</Container>
      </Box>

      <Box py="2" borderTopWidth="1px" bg="gray.50">
        <Container>
          <Flex justifyContent="space-around">
            <Flex
              direction="column"
              alignItems="center"
              color={
                path.startsWith('app/habits') && !path.startsWith('app/habits/all')
                  ? 'black'
                  : 'gray.500'
              }
              cursor="pointer"
              onClick={() => navigate('/app/habits')}
            >
              <BiCheck fontSize="30px" />
              <Box fontWeight="bold" fontSize="xs">
                Habits
              </Box>
            </Flex>

            <Flex
              direction="column"
              alignItems="center"
              color={path.startsWith('/app/habits/all') ? 'black' : 'gray.500'}
              cursor="pointer"
            >
              <BiHistory fontSize="30px" />
              <Box fontWeight="bold" fontSize="xs">
                History
              </Box>
            </Flex>

            <Box>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton>
                      <Flex
                        direction="column"
                        alignItems="center"
                        color={isOpen ? 'black' : 'gray.500'}
                      >
                        <BiMenu fontSize="30px" />
                        <Box fontWeight="bold" fontSize="xs">
                          Menu
                        </Box>
                      </Flex>
                    </MenuButton>

                    <MenuList>
                      <MenuItem onClick={() => navigate('/app/habits/new')}>
                        <HStack>
                          <BiPlus fontSize="20px" />
                          <Box>Create a New Habit</Box>
                        </HStack>
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={onLogOut}>
                        <HStack>
                          <BiLogOut fontSize="20px" />
                          <Box>Log Out</Box>
                        </HStack>
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Stack>
  );
};
