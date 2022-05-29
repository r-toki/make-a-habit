import { Checkbox, Wrap, WrapItem } from '@chakra-ui/react';
import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type Option = {
  label: string;
  value: string;
};

type CheckboxGroupFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  registration: Partial<UseFormRegisterReturn>;
};

export const CheckboxGroupField: FC<CheckboxGroupFieldProps> = ({
  label,
  error,
  options,
  registration,
}) => {
  return (
    <FieldWrapper label={label} error={error}>
      <Wrap>
        {options.map((o, i) => (
          <WrapItem key={i}>
            <Checkbox value={o.value} {...registration}>
              {o.label}
            </Checkbox>
          </WrapItem>
        ))}
      </Wrap>
    </FieldWrapper>
  );
};
