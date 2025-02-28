'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableSalonEmployee from "@/components/Tables/TableSalonEmployee";
const EmployeePage = () => {


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Team members" />
      <TableSalonEmployee />
    </DefaultLayout>
  );
};

export default EmployeePage;
