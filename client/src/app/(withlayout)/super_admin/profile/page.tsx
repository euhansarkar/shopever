import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";

const ProfilePage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `super admin`,
            link: `/super_admin`,
          },
          {
            label: "profile",
            link: `/super_admin/profile`,
          },
        ]}
      />
      <ActionBar title="profile page" />
    </div>
  );
};

export default ProfilePage;
