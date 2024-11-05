'use client';

import React, { useEffect } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PayCircleOutlined } from '@ant-design/icons';
import { EmployeeStore, useEmployeeStore } from '@/store/useEmployeeStore';
import { EmployeeType } from '@/types/user';
import AddEmployee from './AddEmployee';
import { EMPLOYEES } from '@/dummy';
import { useRouter } from 'next/navigation';


const EmployeeListTable: React.FC = () => {
  const { employees, getEmployees, setEmployees } = useEmployeeStore((state: EmployeeStore) => state);
  const router = useRouter();

  const showEmployeeSalary = (employee: EmployeeType) => {
    console.log('showEmployeeSalary: ', employee);
    router.push(`/employees/employee?employee_id=${employee.id}`);

  }

  const showEmployeeDetail = (employee: EmployeeType) => {
    console.log('showEmployeeDetail: ', employee);
    router.push(`/employees/detail?employee_id=${employee.id}`);

  }

  const columns: TableProps<EmployeeType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a onClick={() => showEmployeeDetail(record)}>{text}</a>,
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Phonenumber',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button icon={<EditOutlined />} onClick={() => showEmployeeDetail(record)} />
            <Button icon={<PayCircleOutlined />} onClick={() => showEmployeeSalary(record)} />
            <Button icon={<DeleteOutlined />} />
          </Space>
        )
      }

    },
  ];


  useEffect(() => {
    getEmployees();
    // setEmployees(EMPLOYEES)
  }, [])

  return (
    <>
      <Space className='flex justify-end'  >
        <AddEmployee />
      </Space>
      <Table columns={columns} dataSource={employees} />
    </>
  )
};

export default EmployeeListTable;