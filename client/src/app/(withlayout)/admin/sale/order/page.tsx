import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";

const OrderPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "order",
            link: `/admin/sale/order`,
          },
        ]}
      />
      <ActionBar title="order list">
        <Link href="/admin/cataglog/category/create">
          <Button type="primary">create new</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default OrderPage;
