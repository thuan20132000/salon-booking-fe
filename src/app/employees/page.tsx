'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EmployeeListTable from "./components/EmployeeListTable";

const EmployeePage = () => {


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Team members" />
      <EmployeeListTable />
    </DefaultLayout>
  );
};

export default EmployeePage;
