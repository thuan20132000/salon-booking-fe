import React, { useState } from 'react';
import { PayCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { EmployeePayrollStatisticsResponse, PayslipType } from '@/types/payroll';
import { EmployeeType } from '@/types/user';

const { Option } = Select;
const { RangePicker } = DatePicker;

type Props = {
  payslip?: PayslipType
  payrollStatistics?: EmployeePayrollStatisticsResponse
  employee?: EmployeeType
}

const CreatPayslipsDrawer = (props: Props) => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <>
        <Button onClick={showDrawer} icon={<PayCircleOutlined />}>
          Create Payslips
        </Button>
        <Drawer
          title="Create a new account"
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
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="pay_period_start"
                  label="Pay Period Start"
                  rules={[{ required: true, message: 'Please select the start date' }]}
                >
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="employee"
                  label="Employee"
                  rules={[{ required: true, message: 'Please select an employee' }]}
                >
                  <Select placeholder="Select an employee">
                    <Option value="5">Linda</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="share"
                  label="Share"
                  rules={[{ required: true, message: 'Please enter the share' }]}
                >
                  <Input placeholder="Enter share" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="bonus"
                  label="Bonus"
                >
                  <Input placeholder="Enter bonus" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>

            </Row>
          </Form>
        </Drawer>
      </>

    </div>
  )
}

export default CreatPayslipsDrawer