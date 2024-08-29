'use client';

import React, { useEffect } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceType } from '@/types/service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AddService from '@/components/AddService/AddService';

const columns: TableProps<NailServiceType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
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

const ServiceListTable: React.FC = () => {
  const { services, getServices } = useServiceStore((state: ServiceStore) => state);

  useEffect(() => {
    getServices();
  }, [])

  return (
    <>
      <Space className='flex justify-end'  >
        <AddService />
      </Space>
      <Table columns={columns} dataSource={services} />

    </>
  )
};

export default ServiceListTable;