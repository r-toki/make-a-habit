import { Textarea } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = ({ label, registration, error }: TextAreaFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <Textarea {...registration} />
    </FieldWrapper>
  );
};
