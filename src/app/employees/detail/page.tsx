'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Badge, Button, Calendar, CalendarProps, Menu, MenuProps, Tabs } from "antd";

import type { Dayjs } from 'dayjs';
import { useRouter } from "next/navigation";
import { UserAddOutlined } from "@ant-design/icons";
import type { TabsProps } from 'antd';
import { useEffect, useState } from "react";
import { EmployeeType } from "@/types/user";
import { EmployeeStore, useEmployeeStore } from "@/store/useEmployeeStore";
import EmployeeDetail from "./components/EmployeeDetail";
import EmployeeDetailEdit from "./components/EmployeeDetailEdit";


const EmployeePage = () => {

  const [employee, setEmployee] = useState<EmployeeType>();
  const { getEmpployeeById } = useEmployeeStore((state: EmployeeStore) => state);

  const items: TabsProps['items'] = [
    {
      key: 'detail',
      label: 'Details',
      icon: <UserAddOutlined />,
      children: <div><EmployeeDetail employee={employee} /></div>
    },
    {
      label: 'Edit Employee',
      key: 'edit-emplyee',
      icon: <UserAddOutlined />,
      children: <div><EmployeeDetailEdit employee={employee} /></div>
    },
    {
      label: 'Skills',
      key: 'skills',
      icon: <UserAddOutlined />,
      children: <div>Details</div>
    },
    {
      label: 'Office Hours',
      key: 'office-hours',
      icon: <UserAddOutlined />,
      children: <div>Details</div>
    },
    {
      label: 'Clock In Time',
      key: 'clock-in-time',
      icon: <UserAddOutlined />,
      children: <div>Details</div>
    },
    {
      label: 'Review',
      key: 'review',
      icon: <UserAddOutlined />,
      children: <div>Details</div>
    },
    {
      label: 'Appointment',
      key: 'appointment',
      icon: <UserAddOutlined />,
      children: <div>Details</div>
    },
    {
      label: 'Permission',
      key: 'permission',
      icon: <UserAddOutlined />,
      children: <div>Details</div>
    },

  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    // fetch employee details
    // setEmployee()
    getEmpployeeById(1).then((data) => {
      console.log('data: ', data);
      setEmployee(data);
    })

  }, [])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employee Detail" />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </DefaultLayout>
  );
};

export default EmployeePage;
