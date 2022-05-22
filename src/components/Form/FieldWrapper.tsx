import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
  label: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children'>;

export const FieldWrapper = ({ label, children, error }: FieldWrapperProps) => {
  return (
    <FormControl isInvalid={!!error?.message}>
      <FormLabel>{label}</FormLabel>
      {children}
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
