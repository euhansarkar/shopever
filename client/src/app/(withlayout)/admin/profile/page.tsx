import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";

const ProfilePage = () => {
  return (
    <>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "profile",
            link: `/admin/profile`,
          },
        ]}
      />
      <ActionBar title="profile page"/>
    </>
  );
};

export default ProfilePage;
