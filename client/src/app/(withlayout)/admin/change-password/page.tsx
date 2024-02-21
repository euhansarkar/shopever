import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import React from "react";

const ChangePasswordPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "change-password",
            link: `/admin/change-password`,
          },
        ]}
      />
      <ActionBar title="change password page" />
    </div>
  );
};

export default ChangePasswordPage;
