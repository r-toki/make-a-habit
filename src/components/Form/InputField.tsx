import { Input, InputProps } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  registration: Partial<UseFormRegisterReturn>;
} & InputProps;

export const InputField = ({
  type = 'text',
  label,
  registration,
  error,
  ...rest
}: InputFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <Input {...rest} type={type} {...registration} />
    </FieldWrapper>
  );
};
