'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddStaff from "@/components/Staff/AddStaff";
import SalaryEmployeeListTable from "./components/EmployeeSalaryListTable";
import { Button, DatePicker, Flex } from "antd";
import ShowSalariesDrawer from "./components/ShowSalariesDrawer";
import { useState } from "react";
const { RangePicker } = DatePicker;

const SalaryPage = () => {


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Salary" />

      <Flex className="mb-4" flex={1} justify="flex-end">
        <Flex justify="space-around">
          <ShowSalariesDrawer />
        </Flex>

      </Flex>
      <SalaryEmployeeListTable />
    </DefaultLayout>
  );
};

export default SalaryPage;
