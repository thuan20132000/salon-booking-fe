'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddStaff from "@/components/Staff/AddStaff";
import { Badge, Button, Calendar, CalendarProps, Statistic, Tag } from "antd";
import type { Dayjs } from 'dayjs';
import { useRouter, useSearchParams } from "next/navigation";
import EmployeeListTable from "../components/EmployeeListTable";
import EmployeeStatistic from "../components/EmployeeStatistic";
import { use, useEffect, useState } from "react";
import { EmployeeStore, useEmployeeStore } from "@/store/useEmployeeStore";
import { EmployeeType } from "@/types/user";
import { PayrollStore, usePayrollStore } from "@/store/usePayrollStore";
import dayjs from "dayjs";
import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";


const EmployeePage = () => {
  const searchParams = useSearchParams()
  const [employee, setEmployee] = useState<EmployeeType>();
  const [totalPrice, setTotalPrice] = useState(0);
  const employee_id = searchParams.get('employee_id')
  const { getEmployeeById } = useEmployeeStore((state: EmployeeStore) => state);
  const { getEmployeePayrollTurns, employeePayrollTurns } = usePayrollStore((state: PayrollStore) => state);

  const [selectDate, setSelectDate] = useState<Dayjs>(dayjs(new Date()));

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);

  };

  const onCalendarChange = (value: any) => {
    console.log('====================================');
    console.log('calendar change:: ', value);
    console.log('====================================');
    setSelectDate(value);
  }

  const onCalendarSelect = (value: any) => {
    // console.log('====================================');
    // console.log('select value: ', value);
    // console.log('====================================');
  }

  const getDatePayrollData = (date: Dayjs) => {
    try {
      let payroll = employeePayrollTurns?.find((item) => {
        return dayjs(item.date).format('YYYY-MM-DD') == date.format('YYYY-MM-DD');
      });
      return payroll;

    } catch (error) {
      return null
    }
  }

  const router = useRouter();
  const dateCellRender = (value: Dayjs) => {

    const onDateClick = (value: Dayjs) => {
      router.push(`payroll?date=${value.format('YYYY-MM-DD')}&employee=${employee?.id}`,);
    }

    let payroll = getDatePayrollData(value);
    // console.log('payroll: ', payroll);

    return (
      <ul className="events">
        {/* <Button onClick={() => onDateClick(value)}>  </Button> */}
        {
          payroll ? (
            <Tag color="blue" onClick={() => onDateClick(value)}>
              <Statistic
                value={payroll?.total_price}
                valueStyle={{ fontSize: 16 }}
              />
            </Tag>
          ) :
            <PlusCircleOutlined onClick={() => onDateClick(value)} />
        }
      </ul>
    );
  };

  useEffect(() => {
    getEmployeeById(Number(employee_id)).then((data) => {
      setEmployee(data);
    })


    getEmployeePayrollTurns({
      employee: Number(employee_id),
      year: Number(selectDate.get('year')),
      month: Number(selectDate.get('month') + 1)
    }
    ).then((data) => {
      setTotalPrice(data.total_price);
    })


  }, [selectDate, employee_id])
  // const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
  //   if (info.type === 'month') return monthCellRender(current);
  //   return info.originNode;
  // };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={employee?.name || ''} />
      <EmployeeStatistic monthlyTotal={totalPrice} />
      <Calendar
        onPanelChange={onPanelChange}
        onChange={onCalendarChange}
        onSelect={onCalendarSelect}
        cellRender={dateCellRender}
        value={selectDate}
      // value={dayjs(new Date())}

      />
    </DefaultLayout>
  );
};

export default EmployeePage;
