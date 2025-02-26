import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, Space, Avatar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { generateTimestampNumber } from '@/utils/helpers';
import BookingServiceCard from '@/components/Cards/BookingServiceCard';
import { DayPilot } from 'daypilot-pro-react';
import { PlusOutlined } from '@ant-design/icons';
import SelectBookingServiceDrawer from '@/components/Drawers/SelectBookingServiceDrawer';
import { BookingService, Customer, Service } from '@/interfaces/salon';
import { useBookingServiceStore, BookingServiceStore } from '@/store/useBookingServiceStore';
import SelectSalonCustomerDrawer from '@/components/Drawers/SelectSalonCustomerDrawer';
import CustomerCard from '@/components/Cards/CustomerCard';
import { SelectCustomerCard } from '@/components/Cards/SelectCustomerCard';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
interface AddBookingEventModalProps {
  open: boolean;
  onCancel: () => void;
  eventData: DayPilot.CalendarTimeRangeSelectedArgs | null;
}

const AddBookingEventModal: React.FC<AddBookingEventModalProps> = ({
  open,
  onCancel,
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
    addSalonBooking,
  } = useBookingServiceStore((state: BookingServiceStore) => state);

  const { salonTechnicians } = useSalonStore((state: SalonState) => state);

  const [form] = Form.useForm();
  const [isShowSelectBookingService, setIsShowSelectBookingService] = useState<boolean>(false);
  const [isShowSelectCustomer, setIsShowSelectCustomer] = useState<boolean>(false);



  const handleSelectBookingService = (service: Service) => {

    let technician = salonTechnicians.find((technician) => technician.id === eventData?.resource);

    addBookingService({
      id: generateTimestampNumber(),
      service: service,
      technician: technician || null,
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

    if (!bookingService.technician) {
      let technician = salonTechnicians.find((technician) => technician.id === bookingService.technician?.id);
      bookingService.technician = technician || null;
    }

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
    // addBookingEvent(booking);
    addSalonBooking({
      ...booking,
      id: generateTimestampNumber(),
    });
    onCloseModal();
  }

  const onChangeBookingDate = (value: Dayjs) => {
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
