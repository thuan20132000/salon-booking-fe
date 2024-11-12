'use client';
import { NailServiceType } from '@/types/service';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, Col, DatePicker, Drawer, DrawerProps, Form, Input, InputNumber, RadioChangeEvent, Row, Select, Space } from 'antd';
import React, { useState } from 'react'
const { Option } = Select;
import type { ConfigProviderProps, SelectProps } from 'antd';
import { EmployeeType } from '@/types/user';
import { employeeAPI } from '@/apis/employeeAPI';
import { EmployeeStore, useEmployeeStore } from '@/store/useEmployeeStore';
type SizeType = ConfigProviderProps['componentSize'];

type Props = {}

const AddEmployee = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [service, setService] = useState<NailServiceType>();
  const [size, setSize] = useState<SizeType>('middle');
  const { getEmployees, addEmployee } = useEmployeeStore((state: EmployeeStore) => state);

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
  const [form] = Form.useForm();

  const onSubmit = async () => {
    console.log('onSubmit');
    const values: EmployeeType = await form.validateFields()
    console.log('values: ', values);
    // form.resetFields();
    await addEmployee(values)
    form.resetFields();
    setOpen(false);
    await getEmployees();


  }


  return (
    <div style={{ marginBottom: 20, alignSelf: 'flex-end' }}>
      <Button onClick={showDrawer} icon={<PlusOutlined />}>
        New Employee
      </Button>
      <Drawer
        title="Create a new employee"
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
            <Button onClick={onSubmit} >
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name*"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter the name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nickname"
                label="Nick Name*"
                rules={[{ required: true, message: 'Please enter nick name' }]}
              >
                <Input placeholder="Please enter the nick name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="job_title"
                label="Job Title"
              >
                <Input placeholder="Job Title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter nick name' }]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="insurance-number"
                label="Insurance Number"
              >
                <Input placeholder="Insurance Number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="employee_role"
                label="Employee Role"
              >
                <Select
                  defaultValue="0"
                  style={{ width: '100%' }}
                  onChange={handleChange}
                  options={[
                    { value: '0', label: 'Employee' },
                    { value: '1', label: 'Manager' },
                    { value: '2', label: 'Receptionist' },
                    { value: '3', label: 'Employee None Calendar' },
                    { value: '4', label: 'Viewer' },

                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="employee_level"
                label="Employee Level"
              >
                <Select
                  defaultValue="Fresher"
                  style={{ width: '100%' }}
                  onChange={handleChange}
                  options={[
                    { value: 'Fresher', label: 'Fresher' },
                    { value: 'Junior', label: 'Junior' },
                    { value: 'Senior', label: 'Senior' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthday"
                label="Birthday"
              >
                <DatePicker placeholder='Birthdate' onChange={onChange} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="start-date"
                label="Start Date"
              >
                <DatePicker placeholder='Start Date' onChange={onChange} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Adress"
              >
                <Input.TextArea rows={4} placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="employee_note"
                label="Employee Note"
              >
                <Input.TextArea rows={4} placeholder="Employee Note" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
              >
                <Input.TextArea rows={4} placeholder="please enter description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>


    </div>
  )
}

export default AddEmployee