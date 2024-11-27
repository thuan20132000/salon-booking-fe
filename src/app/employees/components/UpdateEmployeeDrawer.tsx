'use client';
import { NailServiceType } from '@/types/service';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Cascader, Col, DatePicker, Drawer, DrawerProps, Form, Input, InputNumber, RadioChangeEvent, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react'
const { Option } = Select;
import type { ConfigProviderProps, SelectProps } from 'antd';
import { EmployeeType } from '@/types/user';
import { addSalonEmployeeInputType, employeeAPI, updateSalonEmployeeInputType } from '@/apis/employeeAPI';
import { EmployeeStore, useEmployeeStore } from '@/store/useEmployeeStore';
import useAuthenticationStore, { AuthenticationState } from '@/store/useAuthenticationStore';
type SizeType = ConfigProviderProps['componentSize'];

type Props = {
  // isShow: boolean;
  // onClose: () => void;
  employee: EmployeeType;
}

const UpdateEmployeeDrawer = (props: Props) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [service, setService] = useState<NailServiceType>();
  const [size, setSize] = useState<SizeType>('middle');
  const {
    updateSalonEmployee,
    getEmployees
  } = useEmployeeStore((state: EmployeeStore) => state);
  const {
    user
  } = useAuthenticationStore((state:AuthenticationState) => state);
  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  const closeDrawer = () => {
    setOpen(false);
  }

  const handleFinish = async () => {

    try {
      // setIsLoading(true);

      const values = await form.validateFields();

      const inputData: updateSalonEmployeeInputType = {
        salon_id: Number(user?.id),
        employee: {
          name: values.name,
          nickname: values.nickname,
          email: values.email,
          phone_number: values.phone_number,
          address: values.address,
          birth_date: values.birthday,
          commission_rate: values.commision_rate
        },
        employee_id: Number(props.employee?.id)
      }


      if (updateSalonEmployee) {
        await updateSalonEmployee(inputData);
      }
      await getEmployees();
      form.resetFields();
      closeDrawer()
    } catch (error) {
      console.log('====================================');
      console.log('error:: ', error);
      console.log('====================================');
    } finally {
      // setIsLoading(false);
      // props.onClose();
    }
  };

  useEffect(() => {
    if (props.employee) {
      form.setFieldsValue({
        name: props.employee.name,
        nickname: props.employee.nickname,
        email: props.employee.email,
        phone_number: props.employee.phone_number,
        address: props.employee.address,
        birthday: props.employee.birth_date,
        commision_rate: props.employee.commission_rate
      })
    }

  }, [props.employee, form])


  return (
    <>
      <Button onClick={showDrawer} icon={<EditOutlined />}>
      </Button>
      <Drawer
        title="Edit team member"
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
            <Button htmlType='submit' onClick={handleFinish}>
              Submit
            </Button>
          </Space>
        }
      >
        <Card>

          <Form layout="vertical" form={form}
            onFinish={handleFinish}
          >
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
              {/* <Col span={12}>
              <Form.Item
                name="job_title"
                label="Job Title"
              >
                <Input placeholder="Job Title" />
              </Form.Item>
            </Col> */}
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                >
                  <Input placeholder="Email" />
                </Form.Item>

              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone_number"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter nick name' }]}
                >
                  <Input placeholder="Phone Number" />
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
                  name="commision_rate"
                  label="Commision Rate"
                  rules={[{ required: true, message: 'Please enter commision rate' }]}
                >
                  <InputNumber
                    min='0'
                    max='1'
                    step={'0.01'}
                  />
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
          </Form>
        </Card>

      </Drawer>


    </ >
  )
}

export default UpdateEmployeeDrawer