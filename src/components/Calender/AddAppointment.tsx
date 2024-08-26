'use client';
import { NailServiceType } from '@/types/service';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, Col, DatePicker, Drawer, DrawerProps, Form, Input, InputNumber, RadioChangeEvent, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react'
const { Option } = Select;
import type { ConfigProviderProps, DatePickerProps, SelectProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import useAppointmentStore, { AppointmentStoreType } from '@/store/useAppointmentStore';

type SizeType = ConfigProviderProps['componentSize'];

type Props = {}

const defaultValue = dayjs('2024-01-01');

const _refPanel = React.createRef<HTMLDivElement>();

const AddAppointment = (props: Props) => {
  const { isShowAddAppointment, setShowAddAppointment, appointment } = useAppointmentStore((state: AppointmentStoreType) => state);
  // const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [service, setService] = useState<NailServiceType>();
  const [size, setSize] = useState<SizeType>('middle');
  const [appointmentTime, setAppointmentTime] = useState<Dayjs | null>(null);
  const [appointmentDuration, setAppointmentDuration] = useState<number>(30);
  const [appointmentPrice, setAppointmentPrice] = useState<number>(100);
  const [appointmentDescription, setAppointmentDescription] = useState<string>('');


  const showDrawer = () => {
    setShowAddAppointment(true);
  };

  // Handle date change
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setAppointmentTime(dayjs(date));
  };

  const onAppointmentTimeChange = (value: Dayjs) => {
    console.log('Selected Time: ', value);
    setAppointmentTime(value);
  }

  const onClose = () => {
    setShowAddAppointment(false);
  };

  const onSubmit = () => {
    console.log('====================================');
    console.log('appointmentTime:: ', appointmentTime);
    console.log('appointmentDuration:: ', appointmentDuration);
    console.log('appointmentPrice:: ', appointmentPrice);
    console.log('appointmentDescription:: ', appointmentDescription);
    console.log('====================================');
  }

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

  const onChangeDuration = (value: number) => {
    console.log('====================================');
    console.log('value:: ', value);
    console.log('====================================');
    setAppointmentDuration(value);
  }

  const onChangePrice = (value: number) => {
    console.log('====================================');
    console.log('value:: ', value);
    console.log('====================================');
    setAppointmentPrice(value);
  }

  useEffect(() => {
    console.log('====================================');
    console.log('appointment:: ', dayjs(appointment?.datetime));
    console.log('====================================');

    setAppointmentTime(dayjs(appointment?.datetime));
    form.setFieldsValue({
      appointment_datetime: dayjs(appointment?.datetime)
    });
  }, [appointment?.datetime])




  const [form] = Form.useForm();

  return (
    <div>
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
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="appointment_datetime"
                label="Appointment Datetime"
                rules={[{ required: true, message: 'Please select appointment time' }]}
              >
                <DatePicker
                  defaultValue={appointmentTime}
                  showHour
                  showMinute
                  value={appointmentTime}
                  // locale={buddhistLocale}
                  onChange={onChange}
                  showSecond={false}
                  needConfirm={false}
                  // onChange={onAppointmentTimeChange}    
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"

                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber
                  defaultValue={100}
                  addonAfter="$"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="duration"
                label="Duration (hh:mm)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <Select
                  size={size}
                  onChange={onChangeDuration}
                  style={{ width: 200 }}
                  options={getDurationOptions()}
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

export default AddAppointment