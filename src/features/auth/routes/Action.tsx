import { Button, Center, Container, Divider, Heading, Stack, useToast } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import { Form, InputField } from '@/components/Form';
import { assertDefined } from '@/utils/assert-defined';

import { useAuthAction } from '../hooks';

const useVerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');

  const navigate = useNavigate();

  const toast = useToast();

  const { verifyEmail } = useAuthAction();

  const onVerifyEmail = async () => {
    assertDefined(oobCode);
    const success = await verifyEmail(oobCode);
    if (!success) return;
    toast({
      status: 'info',
      position: 'top-right',
      title: 'Verify email.',
    });
    navigate('/auth/log-in');
  };

  useEffect(() => {
    // TODO: ここなぜか2回呼ばれる
    if (mode === 'verifyEmail') onVerifyEmail();
  }, []);
};

const schema = z
  .object({
    password: z.string().min(1, 'Required'),
    confirm: z.string().min(1, 'Required'),
  })
  .refine((fields) => fields.password === fields.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

type RegisterValues = {
  password: string;
  confirm: string;
};

const PasswordResetForm: FC = () => {
  const [searchParams] = useSearchParams();

  const oobCode = searchParams.get('oobCode');

  const navigate = useNavigate();

  const toast = useToast();

  const { resetPassword } = useAuthAction();

  const onResetPassword = async ({ password }: RegisterValues) => {
    assertDefined(oobCode);
    await resetPassword(oobCode, password);
    toast({
      status: 'info',
      position: 'top-right',
      title: 'Reset password.',
    });
    navigate('/auth/log-in');
  };

  return (
    <Form<RegisterValues, typeof schema> onSubmit={onResetPassword} schema={schema}>
      {({ register, formState }) => (
        <Stack spacing="6">
          <Stack spacing="4">
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

          <Button type="submit">Reset Password</Button>
        </Stack>
      )}
    </Form>
  );
};

export const Action: FC = () => {
  const [searchParams] = useSearchParams();

  const mode = searchParams.get('mode');

  useVerifyEmail();

  return (
    <Container maxW="lg" py="4">
      <Stack spacing="4">
        <Center>
          <Heading>Make a Habit!</Heading>
        </Center>

        {mode === 'resetPassword' && <PasswordResetForm />}
      </Stack>
    </Container>
  );
};
