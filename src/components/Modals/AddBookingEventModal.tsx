import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import BookingServiceCard from '../Cards/BookingServiceCard';
import { DayPilot } from '@daypilot/daypilot-lite-react';

interface AddBookingEventModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (bookingData: BookingEventData) => void;
  eventData: DayPilot.EventData | null;
}

interface BookingEventData {
  title: string;
  dateRange: [string, string];
  description?: string;
  eventData: DayPilot.EventData | null;
} 

const AddBookingEventModal: React.FC<AddBookingEventModalProps> = ({
  open,
  onCancel,
  onSubmit,
  eventData,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedData: BookingEventData = {
        title: values.title,
        dateRange: [
          values.dateRange[0].format('YYYY-MM-DD HH:mm:ss'),
          values.dateRange[1].format('YYYY-MM-DD HH:mm:ss'),
        ],
        description: values.description,
        eventData: eventData,
      };
      onSubmit(formattedData);
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  
  return (
    <Modal
      title="Add New Booking"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Add Booking
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: '',
          description: '',
        }}
      >

        <BookingServiceCard
          service={{
            name: 'Pedicure with shellac',
            duration: 60,
            price: 100,
          }}
          technician={{
            id: '1',
            name: 'Ethan',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png',
          }}
          initialDateTime={dayjs(eventData?.start?.toString())}
          onClick={() => { }}
        />

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookingEventModal;
