'use client';

import React, { useEffect } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { EmployeeStore, useEmployeeStore } from '@/store/useEmployeeStore';
import { EmployeeType } from '@/types/user';
import AddEmployee from './AddEmployee';

const columns: TableProps<EmployeeType>['columns'] = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
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
    title: 'Job Title',
    key: 'job_title',
    dataIndex: 'job_title',
    // render: (_, {  }) => (
    //   <>
    //     {tags.map((tag) => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} />
        <Button icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const EmployeeListTable: React.FC = () => {
  const { employees, getEmployees } = useEmployeeStore((state: EmployeeStore) => state);

  useEffect(() => {
    getEmployees();
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