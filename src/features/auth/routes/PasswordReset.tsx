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

import { Form, InputField } from '@/components/Form';
import { Link } from '@/components/Link';

import { useResetPassword } from '../hooks';

const schema = z.object({
  email: z.string().min(1, 'Required'),
});

type RegisterValues = {
  email: string;
};

export const ResetPassword: FC = () => {
  const toast = useToast();

  const { resetPassword } = useResetPassword();

  const onResetPassword = async ({ email }: RegisterValues) => {
    await resetPassword(email);
    toast({
      status: 'info',
      position: 'top-right',
      title: 'Sent email to reset password.',
    });
  };

  return (
    <Container maxW="lg" py="4">
      <Stack spacing="4">
        <Center>
          <Heading>Make a Habit!</Heading>
        </Center>

        <Form<RegisterValues, typeof schema> onSubmit={onResetPassword} schema={schema}>
          {({ register, formState }) => (
            <Stack spacing="6">
              <Stack spacing="4">
                <InputField
                  type="email"
                  label="email"
                  registration={register('email')}
                  error={formState.errors.email}
                />
              </Stack>

              <Divider />

              <Button type="submit">Reset Password</Button>
            </Stack>
          )}
        </Form>

        <Box>
          <Link display="block" to="/auth/sign-up">
            to Sign Up
          </Link>
          <Link display="block" to="/auth/log-in">
            to Log In
          </Link>
        </Box>
      </Stack>
    </Container>
  );
};
