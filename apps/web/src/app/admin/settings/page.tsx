import Header from "@/components/layout/header";

const SettingsPage = () => {
  return (
    <div className="p-8">
      <Header 
        title={"Settings"}
        description={"Manage system settings"}
      />

      <div className="mt-8">
        Logs Page
      </div>
    </div>
  );
};

export default SettingsPage;