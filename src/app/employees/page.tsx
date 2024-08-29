import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddStaff from "@/components/Staff/AddStaff";
import EmployeeListTable from "./components/EmployeeListTable";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const EmployeePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employee" />
      <EmployeeListTable />
    </DefaultLayout>
  );
};

export default EmployeePage;
