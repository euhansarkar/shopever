import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";

const CouponPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "coupon",
            link: `/admin/promotion/coupon`,
          },
        ]}
      />
      <ActionBar title="coupon list">
        <Link href="/admin/cataglog/category/create">
          <Button type="primary">create new</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default CouponPage;
