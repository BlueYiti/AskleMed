import Header from "@/components/layout/header";

const RecordsPage = () => {
  return (
    <div className="space-y-8">
      <Header 
        title={"Records"}
        description={"View your medical records"}
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Records Page
      </div>
    </div>
  );
};

export default RecordsPage;