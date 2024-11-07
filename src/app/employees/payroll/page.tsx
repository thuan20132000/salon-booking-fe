'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PayrollTable from "./components/PayrollTable";


const AppointmentPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employee Payroll" />
      <PayrollTable/>
    </DefaultLayout>
  );
};

export default AppointmentPage;
