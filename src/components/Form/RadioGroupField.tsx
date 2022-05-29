import { HStack, Radio, RadioGroup } from '@chakra-ui/react';
import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type Option = {
  label: string;
  value: string;
};

type RadioGroupFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string | undefined;
};

export const RadioGroupField: FC<RadioGroupFieldProps> = ({
  label,
  error,
  options,
  registration,
  defaultValue,
}) => {
  return (
    <FieldWrapper label={label} error={error}>
      <RadioGroup defaultValue={defaultValue}>
        <HStack spacing="4">
          {options.map((o, i) => (
            <Radio key={i} value={o.value} {...registration}>
              {o.label}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    </FieldWrapper>
  );
};
