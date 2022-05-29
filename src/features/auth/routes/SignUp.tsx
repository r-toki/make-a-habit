import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { FC } from 'react';
import { z } from 'zod';

import { Form, InputField } from '../../../components/Form';
import { Link } from '../../../components/Link';
import { useSignUp } from '../hooks';

const schema = z
  .object({
    email: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required'),
    confirm: z.string().min(1, 'Required'),
    name: z.string().min(1, 'Required'),
  })
  .refine((fields) => fields.password === fields.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

type RegisterValues = {
  email: string;
  password: string;
  confirm: string;
  name: string;
};

export const SignUp: FC = () => {
  const toast = useToast();

  const { signUp } = useSignUp();

  const onSignUp = async ({
    name,
    email,
    password,
  }: Pick<RegisterValues, 'name' | 'email' | 'password'>) => {
    await signUp({ name, email, password });
    toast({
      status: 'info',
      position: 'top-right',
      title: 'Sent email to verify.',
    });
  };

  return (
    <Container maxW="lg" py="4">
      <Stack spacing="4">
        <Center>
          <Heading>Make a Habit!</Heading>
        </Center>

        <Form<RegisterValues, typeof schema> onSubmit={onSignUp} schema={schema}>
          {({ register, formState }) => (
            <Stack spacing="6">
              <Stack spacing="4">
                <InputField
                  label="name"
                  registration={register('name')}
                  error={formState.errors.name}
                />

                <InputField
                  type="email"
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

                <InputField
                  type="password"
                  label="confirm"
                  registration={register('confirm')}
                  error={formState.errors.confirm}
                  autoComplete="on"
                />
              </Stack>

              <Divider />

              <Button type="submit">Sign Up</Button>
            </Stack>
          )}
        </Form>

        <Box>
          <Link display="block" to="/auth/log-in">
            to Log In
          </Link>
          <Link display="block" to="/auth/reset-password">
            to Reset Password
          </Link>
        </Box>
      </Stack>
    </Container>
  );
};
