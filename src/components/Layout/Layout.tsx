import { Box, Center, Container, Flex, Heading, Stack, VStack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BiHistory, BiMenu, BiNote } from 'react-icons/bi';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ title, children }) => {
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
            <Flex direction="column" alignItems="center">
              <BiNote fontSize="30px" />
              <Box fontWeight="bold" fontSize="xs">
                Record
              </Box>
            </Flex>

            <Flex direction="column" alignItems="center">
              <BiHistory fontSize="30px" />
              <Box fontWeight="bold" fontSize="xs">
                History
              </Box>
            </Flex>

            <Flex direction="column" alignItems="center">
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
