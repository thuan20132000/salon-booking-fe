'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddStaff from "@/components/Staff/AddStaff";
import { Badge, Button, Calendar, CalendarProps } from "antd";
import type { Dayjs } from 'dayjs';
import { useRouter } from "next/navigation";
import EmployeeListTable from "../components/EmployeeListTable";
import EmployeeStatistic from "../components/EmployeeStatistic";


const EmployeePage = () => {

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);

  };

  const onCalendarChange = (value: any) => {
    console.log('====================================');
    console.log('calendar change:: ', value);
    console.log('====================================');
  }

  const onCalendarSelect = (value: any) => {
    // console.log('====================================');
    // console.log('select value: ', value);
    // console.log('====================================');
  }

  const router = useRouter();

  const dateCellRender = (value: Dayjs) => {

    const onDateClick = (value: Dayjs) => {
      console.log('====================================');
      console.log('date click: ', value.format('YYYY-MM-DD'));
      console.log('====================================');
      router.push(`/payroll?date=${value.format('YYYY-MM-DD')}`,);
    }

    return (
      <ul className="events">
        <Button onClick={() => onDateClick(value)}>Add </Button>
      </ul>
    );
  };

  // const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
  //   if (info.type === 'month') return monthCellRender(current);
  //   return info.originNode;
  // };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employee" />
      <EmployeeStatistic />
      <Calendar
        onPanelChange={onPanelChange}
        onChange={onCalendarChange}
        onSelect={onCalendarSelect}
        cellRender={dateCellRender}
      />
    </DefaultLayout>
  );
};

export default EmployeePage;
