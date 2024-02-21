"use client";
import { Spin } from "antd";

type ISpinner = {
  size?: "small" | "default" | "large";
};

const SESpinner = ({ size = "small" }: ISpinner) => {
  return <Spin size={size} />;
};

export default SESpinner;
