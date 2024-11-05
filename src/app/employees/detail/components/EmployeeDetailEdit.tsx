import React, { use, useEffect } from 'react';
import { Card, Descriptions, Avatar, Form, Row, Col, Input, Select, DatePicker, RadioChangeEvent, Space, Button } from 'antd';
import { EmployeeType } from '@/types/user';
import { EmployeeStore, useEmployeeStore } from '@/store/useEmployeeStore';

type Props = {
  employee?: EmployeeType | undefined;
}

const EmployeeDetailEdit = ({ employee }: Props) => {
  // const employee = {
  //   name: 'John Doe',
  //   position: 'Senior Developer',
  //   department: 'Engineering',
  //   email: 'john.doe@example.com',
  //   phone: '123-456-7890',
  //   avatar: 'https://via.placeholder.com/150'
  // };
  const [form] = Form.useForm();
  const { updateEmployee } = useEmployeeStore((state: EmployeeStore) => state);


  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };


  const onChange = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`);
  };

  const onSubmit = async () => {
    console.log('onSubmit');
    const values: EmployeeType = await form.validateFields()
    values.id = employee?.id;
    console.log('values: ', values);
    await updateEmployee(values);
    // form.resetFields();
    // await addEmployee(values)
    // form.resetFields();
    // setOpen(false);
    // await getEmployees();


  }

  useEffect(() => {
    form.setFieldsValue({
      id: employee?.id,
      name: employee?.name,
      nickname: employee?.nickname,
      job_title: employee?.job_title,
      email: employee?.email,
      phone_number: employee?.phone_number,
      insurance_number: employee?.insurance_number,
      employee_role: employee?.role,
      employee_level: employee?.level,
      birthday: employee?.birth_date,
      start_date: employee?.start_date,
      address: employee?.address,
      employee_note: employee?.employee_note,
      description: employee?.description,
    });
  }, [employee, form]);


  return (
    <div>
      <Card style={{ margin: '0 auto' }}>
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
        <Space>
          <Button onClick={onSubmit} className='justify-end'>
            Submit
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default EmployeeDetailEdit;