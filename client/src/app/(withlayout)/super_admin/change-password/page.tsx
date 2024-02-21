import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const ChangePasswordPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/super_admin`,
          },
          {
            label: "change-password",
            link: `/super_admin/change-password`,
          },
        ]}
      />
      <ActionBar title="change password page"/>
    </div>
  );
};

export default ChangePasswordPage;
