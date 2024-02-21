
import SEClientFooter from "@/components/ui/SEClientFooter";
import SEClientHeader from "@/components/ui/SEClientHeader";
import React, { ReactNode } from "react";

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SEClientHeader />
      {children}
      <SEClientFooter />
    </>
  );
};

export default ClientLayout;
