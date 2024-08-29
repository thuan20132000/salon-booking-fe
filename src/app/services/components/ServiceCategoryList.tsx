'use client';

import React, { useEffect } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AddService from '@/components/AddService/AddService';
import AddServiceCategory from './AddServiceCategory';

const columns: TableProps<NailServiceCategoryType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
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

const ServiceCategoryListTable: React.FC = () => {
  const { services, getServices, getServiceCategories, serviceCategories } = useServiceStore((state: ServiceStore) => state);

  useEffect(() => {
    getServices();
    getServiceCategories();
  }, [])

  return (
    <>
      <Space className='flex justify-end'  >
        <AddServiceCategory />
      </Space>
      <Table columns={columns} dataSource={serviceCategories} />
    </>
  )
};

export default ServiceCategoryListTable;