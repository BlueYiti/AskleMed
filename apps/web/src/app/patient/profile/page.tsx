import Header from "@/components/patient/dashboard-header";

const ProfilePage = () => {
  return (
    <div className="p-8">
      <Header 
        title={"Profile"}
        description={"Manage your profile information"}
      />

      <div className="mt-8">
        Profile Page
      </div>
    </div>
  );
};

export default ProfilePage;