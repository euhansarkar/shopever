import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const PermissionPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `super admin`,
            link: `/super_admin`,
          },
          {
            label: "permission",
            link: `/super_admin/permission`,
          },
        ]}
      />
      <ActionBar title="permission list">
        <Link href="/super_admin/permission/create">
          <Button type="primary">create new</Button>
        </Link>
      </ActionBar>
      <h2>this is permission page</h2>
    </div>
  );
};

export default PermissionPage;
