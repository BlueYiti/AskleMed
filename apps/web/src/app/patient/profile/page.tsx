import Header from "@/components/layout/header";

const ProfilePage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Profile"}
        description={"Manage your profile information"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Profile Page
      </div>
    </div>
  );
};

export default ProfilePage;