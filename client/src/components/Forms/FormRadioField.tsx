import { Divider, Radio, RadioChangeEvent, Space } from "antd";
import { ReactNode, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

export type RadioOptions = {
  label: ReactNode | string;
  value: string | boolean | number;
  disabled?: boolean;
};

type RadioFieldProps = {
  name: string;
  options: RadioOptions[];
  size?: "large" | "middle" | "small";
  label?: string;
  onValueChange: (value: string | undefined) => void; 
};

const FormRadioField = ({
  name,
  size,
  options,
  label,
  onValueChange,
}: RadioFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label && <div>{label}</div>}
      <Controller
        control={control}
        name={name}
        render={({ field: {value,onChange} }) => (
          <Radio.Group
            size={size}
            style={{ width: "100%" }}
            value={value}
            onChange={(e: RadioChangeEvent) => {
              onChange(e);
              onValueChange(e.target.value);
            }}
          >
            <Space direction="vertical">
              {options.map((option, i) => (
                <Radio
                  key={i}
                  style={{ margin: "4px 1px" }}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        )}
      />
      <Divider style={{ width: "100%" }} orientationMargin={3} />
    </>
  );
};

export default FormRadioField;
