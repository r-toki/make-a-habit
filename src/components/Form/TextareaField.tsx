import { Textarea } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type TextareaFieldProps = FieldWrapperPassThroughProps & {
  registration: Partial<UseFormRegisterReturn>;
};

export const TextareaField = ({ label, registration, error }: TextareaFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <Textarea {...registration} />
    </FieldWrapper>
  );
};
