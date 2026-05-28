import Header from "@/components/layout/header";

const RecordsPage = () => {
  return (
    <div className="p-8">
      <Header 
        title={"Records"}
        description={"View your medical records"}
      />

      <div className="mt-8">
        Records Page
      </div>
    </div>
  );
};

export default RecordsPage;