import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const DepartmentPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `super admin`,
            link: `/super_admin`,
          },
          {
            label: "department_management",
            link: `/super_admin/management/department`,
          },
        ]}
      />
      <ActionBar title="department list">
        <Link href="/super_admin/management/department/create">
          <Button type="primary">create new</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default DepartmentPage;
