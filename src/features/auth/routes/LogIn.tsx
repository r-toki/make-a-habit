import { Button, Center, Container, Divider, Heading, Stack, useToast } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Form, InputField } from '@/components/Form';
import { Link } from '@/components/Link';

import { useLogIn } from '../hooks';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type RegisterValues = {
  email: string;
  password: string;
};

export const LogIn: FC = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const { logIn } = useLogIn();

  const onLogIn = async ({ email, password }: RegisterValues) => {
    const success = await logIn({ email, password });
    if (success) {
      navigate('/app/habits');
    } else {
      toast({
        status: 'info',
        position: 'top-right',
        title: 'Sent verification email.',
      });
    }
  };

  return (
    <Container maxW="lg" py="4">
      <Stack spacing="4">
        <Center>
          <Heading>Make a Habit!</Heading>
        </Center>

        <Form<RegisterValues, typeof schema> onSubmit={onLogIn} schema={schema}>
          {({ register, formState }) => (
            <Stack spacing="6">
              <Stack spacing="4">
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

              <Button type="submit">Log In</Button>
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
