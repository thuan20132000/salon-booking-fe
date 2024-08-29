'use client';
import { NailServiceType } from '@/types/service';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, Col, DatePicker, Drawer, DrawerProps, Form, Input, InputNumber, RadioChangeEvent, Row, Select, Space } from 'antd';
import React, { useState } from 'react'
const { Option } = Select;
import type { ConfigProviderProps, SelectProps } from 'antd';
type SizeType = ConfigProviderProps['componentSize'];

type Props = {}

const AddServiceCategory = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [service, setService] = useState<NailServiceType>();
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
    <div style={{ marginBottom: 20, alignSelf: 'flex-end' }}>
      <Button onClick={showDrawer} icon={<PlusOutlined />}>
        New Employee
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
            <Button onClick={onClose} >
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name*"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter the name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category*"
                rules={[{ required: true, message: 'Please choose the category' }]}
              >
                <Select placeholder="Please choose the category">
                  <Option value="nail">Nail</Option>
                  <Option value="hair">Hair</Option>
                  <Option value="skin">Skin</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="price"
                label="Price($)*"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber
                  defaultValue={100}
                  addonAfter="$"
                />
              </Form.Item>
              <Form.Item
                name="duration"
                label="Duration (hh:mm)*"
                rules={[{ required: true, message: 'Please enter duration' }]}
              >
                <Select
                  size={size}
                  onChange={handleChange}
                  style={{ width: 200 }}
                  options={getDurationOptions()}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="original_price"
                label="Original Price ($)"
                rules={[{ required: false, message: 'Please enter original price' }]}
              >
                <InputNumber
                  defaultValue={''}
                  addonAfter="$"
                />
              </Form.Item>
              <Form.Item
                name="turn_number"
                label="Turn Number"
                rules={[{ required: false, message: 'Please enter turn number' }]}
              >
                <InputNumber
                  defaultValue={''}
                />
              </Form.Item>
              <Form.Item
                name="deduction_cost"
                label="Deduction Cost ($)"
                rules={[{ required: false, message: 'Please enter deduction cost' }]}
              >
                <InputNumber
                  defaultValue={''}
                  addonAfter="$"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter description',
                  },
                ]}
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

export default AddServiceCategory