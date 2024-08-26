'use client';
import { NailServiceType } from '@/types/service';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, Col, DatePicker, Drawer, DrawerProps, Form, Input, InputNumber, RadioChangeEvent, Row, Select, Space } from 'antd';
import React, { useState } from 'react'
const { Option } = Select;
import type { ConfigProviderProps, SelectProps } from 'antd';
import { StaffType } from '@/types/user';
type SizeType = ConfigProviderProps['componentSize'];

type Props = {}

const AddStaff = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [staff, setStaff] = useState<StaffType | null>(null);
  const [size, setSize] = useState<SizeType>('middle');

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getDurationOptions = () => {
    const options: SelectProps['options'] = [];
    for (let i = 30; i <= 300; i += 30) {
      // format duration in hours if it is more than 60 minutes
      const hours = Math.floor(i / 60);
      const mins = i % 60;

      const hour_string = hours > 0 ? `${hours}` : '0';
      const min_string = mins > 0 ? `${mins}` : '00';

      const duration_formatted = `${hour_string}:${min_string}`;

      options.push({ value: i, label: duration_formatted });
    }
    return options;
  }

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };


  return (
    <div>
      <Button onClick={showDrawer} icon={<PlusOutlined />}>
        Add Staff
      </Button>
      <Drawer
        title="Add a new Staff"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} >
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          {/* create form to add new staff from StaffType */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="first_name"
                label="First Name*"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input placeholder="Please enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name"
                label="Last Name*"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input placeholder="Please enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="job_title"
                label="Job Title"
                rules={[{ required: true, message: 'Please enter job title' }]}
              >
                <Input placeholder="Please enter job title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email*"
                rules={[{ required: true, message: 'Please enter staff email' }]}
              >
                <Input placeholder="Please enter staff email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select staff role' }]}
              >
                <Select placeholder="Please select staff role" onChange={handleChange}>
                  <Option value="admin">Admin</Option>
                  <Option value="staff">Staff</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="level"
                label="Level"
                rules={[{ required: true, message: 'Please select staff level' }]}
              >
                <Select placeholder="Please select staff level" onChange={handleChange}>
                  <Option value="junior">Junior</Option>
                  <Option value="senior">Senior</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter staff phone number' }]}
              >
                <Input placeholder="Please enter staff phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="insurance_number"
                label="Insurance Number"
                rules={[{ required: true, message: 'Please confirm staff insurance number' }]}
              >
                <Input placeholder="Please confirm staff insurance number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birth_date"
                label="Birth Date"
                rules={[{ required: true, message: 'Please enter staff birth date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="start_date"
                label="Start Date"
                rules={[{ required: true, message: 'Please enter staff start date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter staff address' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Please enter staff address"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>


    </div>
  )
}

export default AddStaff