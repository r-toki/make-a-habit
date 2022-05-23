import { Box, Button, Divider, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Form } from '@/components/Form';
import { TextAreaField } from '@/components/Form';
import { RadioGroupField } from '@/components/Form/RadioGroupField';
import { Layout } from '@/components/Layout';

import { useCreateHabit } from '../api';

const schema = z.object({
  content: z.string().min(1, 'Required').max(140),
  targetDaysCount: z.string(),
});

type RegisterValues = {
  content: string;
  targetDaysCount: string;
};

export const NewHabit: FC = () => {
  const navigate = useNavigate();

  const { createHabit } = useCreateHabit();

  const onCreateHabit = async ({
    content,
    targetDaysCount,
  }: {
    content: string;
    targetDaysCount: string;
  }) => {
    await createHabit({ content, targetDaysCount: Number(targetDaysCount) });
    navigate('/app/habits');
  };

  return (
    <Layout title="Create a New Habit">
      <Box py="4">
        <Form<RegisterValues, typeof schema> onSubmit={onCreateHabit} schema={schema}>
          {({ register, formState }) => (
            <Stack spacing="6">
              <Stack spacing="4">
                <TextAreaField
                  label="content"
                  registration={register('content')}
                  error={formState.errors.content}
                />

                <RadioGroupField
                  label="days"
                  registration={register('targetDaysCount')}
                  error={formState.errors.targetDaysCount}
                  options={[
                    { label: '1 day', value: '1' },
                    { label: '3 days', value: '3' },
                    { label: '1 week', value: '7' },
                    { label: '3 weeks', value: '21' },
                  ]}
                  defaultValue="3"
                />
              </Stack>

              <Divider />

              <Button type="submit" colorScheme="green">
                Start
              </Button>
            </Stack>
          )}
        </Form>
      </Box>
    </Layout>
  );
};
