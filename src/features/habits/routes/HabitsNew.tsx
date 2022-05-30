import { Box, Button, Divider, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Form } from '@/components/Form';
import { TextareaField } from '@/components/Form';
import { SelectField } from '@/components/Form';
import { Layout } from '@/components/Layout';

import { useHabitsNew } from '../hooks';

const schema = z.object({
  content: z.string().min(1, 'Required').max(140),
  targetDaysCount: z.string(),
});

type RegisterValues = {
  content: string;
  targetDaysCount: string;
};

export const HabitsNew: FC = () => {
  const navigate = useNavigate();

  const { createHabit } = useHabitsNew();

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
          {({ register, formState, control }) => (
            <Stack spacing="6">
              <Stack spacing="4">
                <TextareaField
                  label="content"
                  error={formState.errors.content}
                  registration={register('content')}
                />

                <SelectField
                  label="days"
                  error={formState.errors.targetDaysCount}
                  name="targetDaysCount"
                  control={control}
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

              <Button type="submit">Start</Button>
            </Stack>
          )}
        </Form>
      </Box>
    </Layout>
  );
};
