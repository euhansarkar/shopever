import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const AdminControlPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `super admin`,
            link: `/super_admin`,
          },
          {
            label: "admin_control",
            link: `/super_admin/control/admin`,
          },
        ]}
      />
      <ActionBar title="admin list">
        <Link href="/super_admin/control/admin/create">
          <Button type="primary">create new</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default AdminControlPage;
