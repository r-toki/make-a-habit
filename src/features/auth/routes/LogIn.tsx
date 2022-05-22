import { Button, Center, Container, Divider, Heading, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { z } from 'zod';

import { Form } from '../../../components/Form/Form';
import { InputField } from '../../../components/Form/InputField';
import { Link } from '../../../components/Link/Link';
import { useLogIn } from '../api/useLogIn';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type RegisterValues = {
  email: string;
  password: string;
};

export const LogIn: FC = () => {
  const { logIn } = useLogIn();

  return (
    <Container maxW="lg" py="4">
      <Stack spacing="4">
        <Center>
          <Heading>Make a Habit!</Heading>
        </Center>

        <Form<RegisterValues, typeof schema> onSubmit={logIn} schema={schema}>
          {({ register, formState }) => (
            <Stack spacing="4">
              <Stack>
                <InputField
                  label="email"
                  registration={register('email')}
                  error={formState.errors.email}
                />

                <InputField
                  type="password"
                  label="password"
                  registration={register('password')}
                  error={formState.errors.password}
                  autoComplete="on"
                />
              </Stack>

              <Divider />

              <Button type="submit" colorScheme="green">
                Log In
              </Button>
            </Stack>
          )}
        </Form>

        <Link alignSelf="start" to="/auth/sign-up">
          to Sign Up
        </Link>
      </Stack>
    </Container>
  );
};
