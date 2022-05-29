import { Props, Select } from 'chakra-react-select';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  name: string;
  control: Control<any>;
  defaultValue?: string | string[] | undefined;
} & Props;

export const SelectField: FC<SelectFieldProps> = ({
  label,
  error,
  options,
  name,
  control,
  defaultValue,
  ...rest
}) => {
  return (
    <FieldWrapper label={label} error={error}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { ref, onChange, value } }) => (
          <Select
            {...rest}
            ref={ref}
            options={options}
            value={
              rest.isMulti
                ? options.filter((o) => value.includes(o.value))
                : options.find((o) => o.value === value)
            }
            onChange={(v) =>
              rest.isMulti
                ? onChange((v as Option[]).map((v) => v.value))
                : onChange((v as Option).value)
            }
          />
        )}
      />
    </FieldWrapper>
  );
};
