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
  targetWeeksCount: z.string(),
});

type RegisterValues = {
  content: string;
  targetWeeksCount: string;
};

export const NewHabit: FC = () => {
  const navigate = useNavigate();

  const { createHabit } = useCreateHabit();

  const onCreateHabit = async ({
    content,
    targetWeeksCount,
  }: {
    content: string;
    targetWeeksCount: string;
  }) => {
    await createHabit({ content, targetWeeksCount });
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
                  label="weeks"
                  registration={register('targetWeeksCount')}
                  error={formState.errors.targetWeeksCount}
                  options={[
                    { label: '1 week', value: '1' },
                    { label: '2 weeks', value: '2' },
                    { label: '3 weeks', value: '3' },
                  ]}
                  defaultValue="1"
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
