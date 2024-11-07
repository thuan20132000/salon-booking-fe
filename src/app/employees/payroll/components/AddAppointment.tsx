'use client';
import { NailServiceType } from '@/types/service';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, Col, DatePicker, Drawer, DrawerProps, Form, Input, InputNumber, RadioChangeEvent, Row, Select, Space, Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
const { Option } = Select;
import type { ConfigProviderProps, DatePickerProps, SelectProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import useAppointmentStore, { AppointmentStore } from '@/store/useAppointmentStore';
import AddAppointmentService from './AddAppointmentService';
import AddAppointmentDetailTab from './AddAppointmentDetailTab';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';

type SizeType = ConfigProviderProps['componentSize'];

type Props = {}

const defaultValue = dayjs('2024-01-01');

const _refPanel = React.createRef<HTMLDivElement>();

const AddAppointment = (props: Props) => {
  const { isShowAddAppointment, setShowAddAppointment, appointment } = useAppointmentStore((state: AppointmentStore) => state);
  const { getServices, getServiceCategories } = useServiceStore((state: ServiceStore) => state);
  // const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setShowAddAppointment(true);
  };


  const onClose = () => {
    setShowAddAppointment(false);
  };

  const onSubmit = () => {
    console.log('====================================');
    console.log('onSubmit appointment:: ', appointment);
    console.log('====================================');
  }


  useEffect(() => {

    getServices();
    getServiceCategories();
  }, [appointment?.datetime])

  const TABS = [
    {
      label: 'Details',
      key: '1',
      children: <AddAppointmentDetailTab />,
    },
    {
      label: 'Notes',
      key: '2',
      children: 'Content of Tab Notes',
    },
    {
      label: 'Activities',
      key: '3',
      children: 'Content of Tab Activities'
    },
  ]




  const [form] = Form.useForm();

  return (
    <div style={{ marginBottom: 20, alignSelf: 'flex-end' }}>
      <Button onClick={showDrawer} icon={<PlusOutlined />}>
        New Appointment
      </Button>
      <Drawer
        title="Add a new appointment"
        width={720}
        onClose={onClose}
        open={isShowAddAppointment}
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
        panelRef={_refPanel}
      >
        <Tabs
          defaultActiveKey="1"
          tabPosition={'left'}
          style={{ height: 220 }}
          items={TABS.map((_, i) => {
            const id = String(i);
            return {
              label: _.label,
              key: id,
              disabled: i === 28,
              children: _.children,
            };
          })}
        />
      </Drawer>


    </div>
  )
}

export default AddAppointment