import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import BookingServiceCard from '../Cards/BookingServiceCard';
import { DayPilot } from '@daypilot/daypilot-lite-react';
import { PlusOutlined } from '@ant-design/icons';
import SelectBookingServiceDrawer from '../Drawers/SelectBookingServiceDrawer';
import { BookingService, Service } from '@/interfaces/salon';

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
  const [isShowSelectBookingService, setIsShowSelectBookingService] = useState<boolean>(false);
  const [bookingServices, setBookingServices] = useState<BookingService[]>([]);

  const handleSelectBookingService = (service: Service) => {
    console.log('service:: ', service);
    setIsShowSelectBookingService(false);
    setBookingServices([...bookingServices, {
      service: service,
      technician: {
        id: '1',
        name: 'Ethan',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png',
      },
      datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      price: service.price,
      duration: service.duration,
    }]);
  }

  const showSelectBookingServiceModal = () => {
    setIsShowSelectBookingService(true);
  }

  const handleCancelSelectBookingService = () => {
    setIsShowSelectBookingService(false);
  }
  

  useEffect(() => {
    const initialBookingServices = [
      {
        service: {
          id: 1,
          name: 'Manicure',
          price: 100,
          duration: 60,
        },
        technician: {
          id: '1',
          name: 'Ethan',
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png',
        },
        datetime: '2025-01-01 10:00:00',
        price: 100,
        duration: 60,
      },
    ];
    setBookingServices(initialBookingServices);
  }, []);


  return (
    <Modal
      title="Add New Booking"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="default" >
          Save Appointment
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

        {/* <BookingServiceCard
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
        /> */}
        {bookingServices.map((bookingService) => (
          <BookingServiceCard
            key={bookingService.service.id}
            service={bookingService.service}
            technician={bookingService.technician}
            initialDateTime={dayjs(bookingService.datetime)}
            onClick={() => { }}
          />
        ))} 
        <Button
          type="dashed"
          onClick={showSelectBookingServiceModal}
          icon={<PlusOutlined />}
        >
          Add Service
        </Button>
        {/* <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item> */}
        <SelectBookingServiceDrawer
          open={isShowSelectBookingService}
          onClose={handleCancelSelectBookingService}
          onSelectService={handleSelectBookingService}
        />
      </Form>
    </Modal>
  );
};

export default AddBookingEventModal;
