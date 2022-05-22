import { Box, Center, Container, Flex, Heading, Stack, VStack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BiHistory, BiMenu, BiNote } from 'react-icons/bi';

type LayoutProps = {
  title: string;
  footer?: true | undefined;
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ title, children, footer }) => {
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

      {footer && (
        <Box py="3" borderTopWidth="1px" bg="gray.50">
          <Container>
            <Flex justifyContent="space-around">
              <VStack spacing="1">
                <BiNote fontSize="30px" />
                <Box fontWeight="bold" fontSize="xs">
                  Record
                </Box>
              </VStack>

              <VStack spacing="1">
                <BiHistory fontSize="30px" />
                <Box fontWeight="bold" fontSize="xs">
                  History
                </Box>
              </VStack>

              <VStack spacing="1">
                <BiMenu fontSize="30px" />
                <Box fontWeight="bold" fontSize="xs">
                  Menu
                </Box>
              </VStack>
            </Flex>
          </Container>
        </Box>
      )}
    </Stack>
  );
};
