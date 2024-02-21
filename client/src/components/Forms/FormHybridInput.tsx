"use client";

import { Button, Input, Space } from "antd";
import { ReactElement, ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  element?: ReactNode | ReactElement;
}

const FormHybridInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  element,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Space.Compact style={{ width: "100%" }}>
              <Input
                type={type}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
              />
              <Button size="large" htmlType="submit" type="primary">Submit</Button>
            </Space.Compact>
          )
        }
      />
    </>
  );
};

export default FormHybridInput;
