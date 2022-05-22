import { Box, Button, Divider, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { NestedValue } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/Form';
import { CheckboxGroupField } from '@/components/Form/CheckboxGroupFIeld';
import { TextAreaField } from '@/components/Form/TextareaField';
import { Layout } from '@/components/Layout';

import { useCreateHabit } from '../api/useCreateHabit';

const schema = z.object({
  content: z.string().min(1, 'Required').max(140),
  days: z.array(z.string()).min(1, 'Required'),
});

type RegisterValues = {
  content: string;
  days: NestedValue<string[]>;
};

export const NewHabit: FC = () => {
  const { createHabit } = useCreateHabit();

  return (
    <Layout title="Create a New Habit">
      <Box py="4">
        <Form<RegisterValues, typeof schema>
          onSubmit={createHabit}
          schema={schema}
          options={{ defaultValues: { days: [] } }}
        >
          {({ register, formState }) => (
            <Stack spacing="4">
              <Stack>
                <TextAreaField
                  label="content"
                  registration={register('content')}
                  error={formState.errors.content}
                />

                <CheckboxGroupField
                  label="days of the week"
                  registration={register('days')}
                  error={formState.errors.days}
                  options={[
                    { label: 'Mon.', value: 'Monday' },
                    { label: 'Tue.', value: 'Tuesday' },
                    { label: 'Wed.', value: 'Wednesday' },
                    { label: 'Thu.', value: 'Thursday' },
                    { label: 'Fri.', value: 'Friday' },
                    { label: 'Sat.', value: 'Saturday' },
                    { label: 'Sun.', value: 'Sunday' },
                  ]}
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
