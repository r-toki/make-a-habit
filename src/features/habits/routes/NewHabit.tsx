import { Box, Button, Divider, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { NestedValue } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Form } from '@/components/Form';
import { CheckboxGroupField } from '@/components/Form/CheckboxGroupFIeld';
import { TextAreaField } from '@/components/Form/TextareaField';
import { Layout } from '@/components/Layout';
import { daysOfWeekOptions } from '@/fire/docs';

import { useCreateHabit } from '../api';

const schema = z.object({
  content: z.string().min(1, 'Required').max(140),
  targetDaysOfWeek: z.array(z.string()).min(1, 'Required'),
});

type RegisterValues = {
  content: string;
  targetDaysOfWeek: NestedValue<string[]>;
};

export const NewHabit: FC = () => {
  const navigate = useNavigate();

  const { createHabit } = useCreateHabit();

  const onCreateHabit = async ({
    content,
    targetDaysOfWeek,
  }: {
    content: string;
    targetDaysOfWeek: string[];
  }) => {
    await createHabit({ content, targetDaysOfWeek });
    navigate('/app/habits');
  };

  return (
    <Layout title="Create a New Habit">
      <Box py="4">
        <Form<RegisterValues, typeof schema>
          onSubmit={onCreateHabit}
          schema={schema}
          options={{ defaultValues: { targetDaysOfWeek: [] } }}
        >
          {({ register, formState }) => (
            <Stack spacing="6">
              <Stack spacing="4">
                <TextAreaField
                  label="content"
                  registration={register('content')}
                  error={formState.errors.content}
                />

                <CheckboxGroupField
                  label="targetDaysOfWeek of the week"
                  registration={register('targetDaysOfWeek')}
                  error={formState.errors.targetDaysOfWeek}
                  options={daysOfWeekOptions}
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
