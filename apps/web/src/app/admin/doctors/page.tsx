import Header from "@/components/layout/header";

const DoctorsPage = () => {
  return (
    <div className="p-8">
      <Header 
        title={"Doctors"}
        description={"View and manage doctors"}
      />

      <div className="mt-8">
        Doctors Page
      </div>
    </div>
  );
};

export default DoctorsPage;