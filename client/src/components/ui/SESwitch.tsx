"use client";

import { Input, Switch } from "antd";
import { SwitchChangeEventHandler, SwitchSize } from "antd/es/switch";
import { ReactElement, ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface ISwitch {
  name: string;
  size?: SwitchSize;
  value?: string | string[] | undefined;
  checkedChildren?: ReactNode | ReactElement;
  unCheckedChildren?: ReactNode | ReactElement;
  label?: string;
  defaultChecked?: boolean;
  handleChange?: (SwitchChangeEventHandler: boolean) => void;
}

const SESwitch = ({
  name,
  size,
  label,
  defaultChecked,
  handleChange,
}: ISwitch) => {
  const { control } = useFormContext();

  return (
    <>
      <p>{label ? label : null}</p>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Switch
            size={size}
            defaultChecked={defaultChecked ? defaultChecked : false}
            onChange={handleChange ? handleChange : onChange}
          />
        )}
      />
    </>
  );
};

export default SESwitch;
