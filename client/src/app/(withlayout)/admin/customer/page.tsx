import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";

const CustomerPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "customer",
            link: `/admin/customer`,
          },
        ]}
      />
      <ActionBar title="customer list"></ActionBar>
    </div>
  );
};

export default CustomerPage;
