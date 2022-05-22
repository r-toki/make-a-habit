import { Box, Button, Divider, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { z } from 'zod';

import { Form } from '../../../components/Form';
import { TextAreaField } from '../../../components/Form/TextareaField';
import { Layout } from '../../../components/Layout';

const schema = z.object({ content: z.string().min(1, 'Required') });

type RegisterValues = {
  content: string;
};

export const NewHabit: FC = () => {
  return (
    <Layout title="Create a New Habit!">
      <Box py="4">
        <Form<RegisterValues, typeof schema>
          onSubmit={(v) => {
            console.log(v);
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <Stack spacing="4">
              <Stack>
                <TextAreaField
                  label="content"
                  registration={register('content')}
                  error={formState.errors.content}
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
