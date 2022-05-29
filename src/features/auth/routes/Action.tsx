import { Box, Center, Container, Heading, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

export const Action: FC = () => {
  const [searchParams] = useSearchParams();

  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');

  return (
    <Container maxW="lg" py="4">
      <Stack spacing="4">
        <Center>
          <Heading>Make a Habit!</Heading>

          {mode === 'verifyEmail' && <Box></Box>}
        </Center>
      </Stack>
    </Container>
  );
};
