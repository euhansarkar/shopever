"use client";

import { Input } from "antd";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small" | "middle";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label: string;
  required?: boolean;
  styles?: CSSProperties;
  addonBefore?: ReactNode | ReactElement;
  addonAfter?: ReactNode | ReactElement;
  defaultValue?: string;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  styles,
  addonBefore,
  addonAfter,
  defaultValue,
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
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              style={styles}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              style={styles}
              addonBefore={addonBefore}
              addonAfter={addonAfter}
              defaultValue={defaultValue}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
