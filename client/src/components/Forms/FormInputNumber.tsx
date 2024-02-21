"use client";

import { InputNumber } from "antd";
import { CSSProperties } from "react";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  max?: number;
  min?: number;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  styles?: CSSProperties;
  handleChange?: (el: string) => void;
}

const FormInputNumber = ({
  name,
  size,
  value,
  id,
  placeholder,
  validation,
  min,
  max,
  label,
  required,
  styles,
  handleChange,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      <p>{label ? label : null}</p>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputNumber
            size={size}
            max={max}
            min={min}
            placeholder={placeholder}
            style={styles}
            {...field}
            value={value ? value : field.value}
          />
        )}
      />
    </>
  );
};

export default FormInputNumber;
