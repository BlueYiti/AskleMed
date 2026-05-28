import Header from "@/components/layout/header";

const LogsPage = () => {
  return (
    <div className="p-8">
      <Header 
        title={"Logs"}
        description={"View system logs"}
      />

      <div className="mt-8">
        Logs Page
      </div>
    </div>
  );
};

export default LogsPage;