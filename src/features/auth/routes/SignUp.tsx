import { Button, Center, Container, Divider, Heading, Stack } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { FC } from 'react';
import { z } from 'zod';

import { Form } from '../../../components/Form/Form';
import { InputField } from '../../../components/Form/InputField';
import { Link } from '../../../components/Link/Link';

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
  const signUp = async ({ email, password }: { email: string; password: string }) => {
    await createUserWithEmailAndPassword(getAuth(), email, password);
  };

  return (
    <Container maxW="lg" py="4">
      <Stack spacing="4">
        <Center>
          <Heading>Make a Habit!</Heading>
        </Center>

        <Form<RegisterValues, typeof schema>
          onSubmit={({ email, password }) => {
            signUp({ email, password });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <Stack spacing="4">
              <Stack>
                <InputField
                  label="name"
                  registration={register('name')}
                  error={formState.errors.name}
                />

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

                <InputField
                  type="password"
                  label="confirm"
                  registration={register('confirm')}
                  error={formState.errors.confirm}
                  autoComplete="on"
                />
              </Stack>

              <Divider />

              <Button type="submit" colorScheme="green">
                Sign Up
              </Button>
            </Stack>
          )}
        </Form>

        <Link alignSelf="start" to="/auth/log-in">
          to Log In
        </Link>
      </Stack>
    </Container>
  );
};
