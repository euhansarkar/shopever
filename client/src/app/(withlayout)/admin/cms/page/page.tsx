import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const PageCreationPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "page",
            link: `/admin/cms/page`,
          },
        ]}
      />
      <ActionBar title="category list">
        <Link href="/admin/cataglog/category/create">
          <Button type="primary">create new</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default PageCreationPage;
