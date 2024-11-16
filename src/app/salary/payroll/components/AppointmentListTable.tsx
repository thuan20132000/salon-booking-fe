'use client';

import React, { useEffect } from 'react';
import { Button, Col, Flex, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AddService from '@/components/AddService/AddService';
import useAppointmentStore, { AppointmentStore } from '@/store/useAppointmentStore';
import { AppointmentType } from '@/types/appointment';
import dayjs from 'dayjs';
import AddAppointment from './AddAppointment';

const columns: TableProps<AppointmentType>['columns'] = [
  {
    title: 'Customer',
    dataIndex: 'name',
    key: 'name',
    render: (_, { customer }) => <a>{customer?.username}</a>,
  },
  {
    title: 'Services',
    dataIndex: 'services',
    key: 'services',
    render: (_, { services }) => (
      <>
        {services?.map(({ service, id }) => (
          <Tag color='blue' key={id} className='mb-1'>
            {service?.name} {id}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Estimation(m)',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Employees',
    key: 'employees',
    dataIndex: 'employees',
    render: (_, { name }) => <Tag>{name}</Tag>,

  },
  {
    title: 'Schedule',
    key: 'schedule',
    dataIndex: 'schedule',
    render: (_, { start_at, end_at }) => (
      <Space className='flex flex-1'>
        <Tag>
          {dayjs(start_at?.toString()).format('HH:mm:ss ')} ~ {dayjs(end_at?.toString()).format('HH:mm:ss')}
        </Tag>

      </Space>
    ),
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

const AppointmentListTable: React.FC = () => {
  const { appointments, getAppointments } = useAppointmentStore((state: AppointmentStore) => state);

  useEffect(() => {
    getAppointments();
  }, [])

  return (
    <>
      <Space className='flex justify-end'  >
        <AddAppointment />
      </Space>
      <Table columns={columns} dataSource={appointments}
        pagination={{ pageSize: 50 }}
      />
    </>
  )
};

export default AppointmentListTable;