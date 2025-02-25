import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, Space, Avatar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { generateTimestampNumber } from '@/utils/helpers';
import BookingServiceCard from '../Cards/BookingServiceCard';
import { DayPilot } from '@daypilot/daypilot-lite-react';
import { PlusOutlined } from '@ant-design/icons';
import SelectBookingServiceDrawer from '../Drawers/SelectBookingServiceDrawer';
import { BookingService, Customer, Service } from '@/interfaces/salon';
import { useBookingServiceStore, BookingServiceStore } from '@/store/useBookingServiceStore';
import SelectSalonCustomerDrawer from '../Drawers/SelectSalonCustomerDrawer';
import CustomerCard from '../Cards/CustomerCard';
import { SelectCustomerCard } from '../Cards/SelectCustomerCard';
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

  const {
    booking,
    initBookingServices,
    addBookingService,
    addBookingCustomer,
    removeBookingCustomer,
    removeBookingService,
    resetBooking,
    updateBookingService,
    addBookingEvent,
    updateBooking,
  } = useBookingServiceStore((state: BookingServiceStore) => state);

  const [form] = Form.useForm();
  const [isShowSelectBookingService, setIsShowSelectBookingService] = useState<boolean>(false);
  const [isShowSelectCustomer, setIsShowSelectCustomer] = useState<boolean>(false);



  const handleSelectBookingService = (service: Service) => {
    addBookingService({
      id: generateTimestampNumber(),
      service: service,
      technician: null,
      price: service.price,
      duration: service.duration,
      start_at: dayjs(eventData?.start.toString()).format('YYYY-MM-DD HH:mm:ss'),
      end_at: dayjs(eventData?.start.toString()).add(service.duration, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
      is_requested: false,
      booking_date: dayjs(booking.booking_date).format('YYYY-MM-DD'),
    });
    setIsShowSelectBookingService(false);
  }

  const handleSelectCustomer = (customer: Customer) => {
    setIsShowSelectCustomer(false);
    addBookingCustomer(customer);
  }

  const handleCancelSelectCustomer = () => {
    setIsShowSelectCustomer(false);
  }

  const handleRemoveCustomer = () => {
    removeBookingCustomer();
  }

  const handleCancelSelectBookingService = () => {
    setIsShowSelectBookingService(false);
  }

  const showSelectBookingServiceModal = () => {
    setIsShowSelectBookingService(true);
  }

  const showSelectCustomerModal = () => {
    setIsShowSelectCustomer(true);
  }

  const handleUpdateBookingService = (bookingService: BookingService) => {
    console.log('updating bookingService:: ', bookingService);
    
    let updatedBookingService = { 
      ...bookingService,
      price: bookingService.service?.price ?? null,
      duration: bookingService.service?.duration ?? null,
      start_at: dayjs(bookingService.start_at).format('YYYY-MM-DD HH:mm:ss'),
      end_at: dayjs(bookingService.end_at).format('YYYY-MM-DD HH:mm:ss'),
    };
    updateBookingService(bookingService);
  }

  useEffect(() => {
    initBookingServices(eventData);
  }, [initBookingServices, eventData]);

  const onCloseModal = () => {
    resetBooking();
    onCancel();
  }

  const handleSaveBookingEvent = () => {
    console.log('saving booking:: ', booking);
    
    addBookingEvent(booking);
  }

  const onChangeBookingDate = (value: Dayjs) => {
    console.log('value:: ', value);
    updateBooking({
      booking_date: value.format('YYYY-MM-DD'),
    });
    
  }

  return (
    <Modal
      title="Add New Booking"
      open={open}
      onCancel={onCloseModal}
      footer={[
        <Button key="cancel" onClick={onCloseModal}>
          Cancel
        </Button>,
        <Button key="submit" type="default" onClick={handleSaveBookingEvent}>
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


        <Space direction='vertical' className='w-full flex justify-end mb-2'>
          {
            booking.customer ?
              <CustomerCard
                name={booking.customer.name}
                phoneNumber={booking.customer.phone}
                onClose={handleRemoveCustomer}
              />
              :
              <SelectCustomerCard onClick={showSelectCustomerModal} />
          }
        </Space>
        <Space
          direction='vertical'
          className='w-full mb-2'
        >
          <DatePicker
            defaultValue={dayjs(booking.booking_date)}
            format={'dddd, MMMM D, YYYY'}
            className='w-full'
            value={dayjs(booking.booking_date)}
            onChange={onChangeBookingDate}
          />
        </Space>

        <Space direction='vertical' className='w-full'>
          {booking.booking_services.map((bookingService, index) => (
            <BookingServiceCard
              key={bookingService?.id}
              technician={bookingService?.technician}
              initialDateTime={dayjs(bookingService.start_at)}
              onClick={() => { }}
              onRemove={() => removeBookingService(bookingService.id)}
              bookingService={bookingService}
              booking={booking}
              onUpdateBookingService={handleUpdateBookingService}
            />
          ))}
        </Space>
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

        <SelectSalonCustomerDrawer
          open={isShowSelectCustomer}
          onClose={handleCancelSelectCustomer}
          onSelectCustomer={handleSelectCustomer}
        />
      </Form>
    </Modal>
  );
};

export default AddBookingEventModal;
