'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddStaff from "@/components/Staff/AddStaff";
import SalaryEmployeeListTable from "./components/EmployeeSalaryListTable";

const SalaryPage = () => {


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Salary" />
      <SalaryEmployeeListTable />
    </DefaultLayout>
  );
};

export default SalaryPage;
