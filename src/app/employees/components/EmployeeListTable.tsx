'use client';

import React, { useEffect } from 'react';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PayCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { EmployeeStore, useEmployeeStore } from '@/store/useEmployeeStore';
import { EmployeeType } from '@/types/user';
import AddEmployee from './AddEmployee';
import { EMPLOYEES } from '@/dummy';
import { useRouter } from 'next/navigation';
import UpdateEmployeeDrawer from './UpdateEmployeeDrawer';
import useAuthenticationStore, { AuthenticationState } from '@/store/useAuthenticationStore';


const EmployeeListTable: React.FC = () => {
  const { employees, getEmployees, setEmployees, deleteSalonEmployee } = useEmployeeStore((state: EmployeeStore) => state);
  const {
    user
  } = useAuthenticationStore((state: AuthenticationState) => state);
  const router = useRouter();

  const showEmployeeSalary = (employee: EmployeeType) => {
    console.log('showEmployeeSalary: ', employee);
    router.push(`/salary/payroll-calendar?employee_id=${employee.id}`);

  }

  const showEmployeeDetail = (employee: EmployeeType) => {
    console.log('showEmployeeDetail: ', employee);
    router.push(`/employees/detail?employee_id=${employee.id}`);

  }

  const onDeleteSalonEmployee = async (employee: EmployeeType) => {
    console.log('onDeleteSalonEmployee: ', employee);
    await deleteSalonEmployee({ salon_id: Number(user?.id), employee_id: Number(employee.id) });
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
            {/* <Button icon={<EditOutlined />} onClick={() => showEmployeeDetail(record)} /> */}
            <Button icon={<PayCircleOutlined />} onClick={() => showEmployeeSalary(record)} />
            <Popconfirm
              title="Delete employee"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => onDeleteSalonEmployee(record)}
              okText="Yes"
              okButtonProps={{ danger: true }}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
            <UpdateEmployeeDrawer
              employee={record}
            />
          </Space>
        )
      }

    },
  ];


  useEffect(() => {
    getEmployees();
  }, [])



  return (
    <>
      <Space className='flex justify-end'  >
        <AddEmployee />
      </Space>
      <Table
        columns={columns}
        dataSource={employees}
        rowKey='id'

      />
    </>
  )
};

export default EmployeeListTable;