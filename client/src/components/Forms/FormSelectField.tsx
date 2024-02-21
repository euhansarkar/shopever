"use client";
import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";


export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[]
  name: string;
  size?: "large" | "small" | "middle";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
  selectedValue?: string | undefined;
  onSelectedValueChange?: (value: string | undefined) => void;
  disabled?: boolean;
};

const FormSelectField = ({
  name,
  size,
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  handleChange,
  selectedValue,
  onSelectedValueChange,
  disabled,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={(val) => {
              if (onSelectedValueChange) onSelectedValueChange(val);
              else onChange(val);
            }}
            value={selectedValue ? selectedValue : value}
            size={size}
            options={options}
            disabled={disabled}
            style={{ width: "100%" }}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
