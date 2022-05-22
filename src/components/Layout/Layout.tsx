import { Box, Center, Container, Flex, Heading, Stack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BiHistory, BiMenu, BiNote } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ title, children }) => {
  const location = useLocation();
  const path = location.pathname.split('/').slice(1).join('/');

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
            >
              <BiNote fontSize="30px" />
              <Box fontWeight="bold" fontSize="xs">
                Record
              </Box>
            </Flex>

            <Flex
              direction="column"
              alignItems="center"
              color={path.startsWith('app/habits/all') ? 'black' : 'gray.500'}
            >
              <BiHistory fontSize="30px" />
              <Box fontWeight="bold" fontSize="xs">
                History
              </Box>
            </Flex>

            <Flex direction="column" alignItems="center" color="gray.500">
              <BiMenu fontSize="30px" />
              <Box fontWeight="bold" fontSize="xs">
                Menu
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Stack>
  );
};
