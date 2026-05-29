import Header from "@/components/layout/header";

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Settings"}
        description={"Manage system settings"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Settings Page
      </div>
    </div>
  );
};

export default SettingsPage;