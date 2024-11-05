import React from 'react';
import { Card, Descriptions, Avatar } from 'antd';
import { EmployeeType } from '@/types/user';

type Props = {
  employee?: EmployeeType | undefined;
  onClick?: () => void;
}

const EmployeeDetail = ({ employee, onClick }: Props) => {
  // const employee = {
  //   name: 'John Doe',
  //   position: 'Senior Developer',
  //   department: 'Engineering',
  //   email: 'john.doe@example.com',
  //   phone: '123-456-7890',
  //   avatar: 'https://via.placeholder.com/150'
  // };

  return (
    <div>
      <Card style={{ margin: '0 auto' }}>
        <Avatar size={100} src={employee?.avatar} style={{ marginBottom: 20 }} />
        <Descriptions >
          <Descriptions.Item label="Name">{employee?.name}</Descriptions.Item>
          <Descriptions.Item label="Nickname">{employee?.nickname}</Descriptions.Item>
          <Descriptions.Item label="Email">{employee?.email}</Descriptions.Item>
          <Descriptions.Item label="Start Date">{employee?.start_date?.toString()}</Descriptions.Item>
          <Descriptions.Item label="Phone">{employee?.phone_number}</Descriptions.Item>
          <Descriptions.Item label="Address">{employee?.address}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default EmployeeDetail;