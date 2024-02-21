import { ReactElement, ReactNode } from "react";

type ActionBarProps = {
  title?: string;
  children?: ReactNode | ReactElement;
};

const ActionBar = ({ title, children }: ActionBarProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px 0px",
      }}
    >
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default ActionBar;
