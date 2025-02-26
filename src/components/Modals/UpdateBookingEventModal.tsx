import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, Space, Avatar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { generateTimestampNumber } from '@/utils/helpers';
import BookingServiceCard from '@/components/Cards/BookingServiceCard';
import { DayPilot } from 'daypilot-pro-react';
import { PlusOutlined } from '@ant-design/icons';
import SelectBookingServiceDrawer from '@/components/Drawers/SelectBookingServiceDrawer';
import { BookingService, Customer, Service, Booking } from '@/interfaces/salon';
import { useBookingServiceStore, BookingServiceStore } from '@/store/useBookingServiceStore';
import SelectSalonCustomerDrawer from '@/components/Drawers/SelectSalonCustomerDrawer';
import CustomerCard from '@/components/Cards/CustomerCard';
import { SelectCustomerCard } from '@/components/Cards/SelectCustomerCard';
import { useSalonStore, SalonState } from '@/store/useSalonStore';

interface UpdateBookingEventModalProps {
  open: boolean;
  onCancel: () => void;
  eventData: DayPilot.EventData | null;
  
}

const UpdateBookingEventModal: React.FC<UpdateBookingEventModalProps> = ({
  open,
  onCancel,
  eventData,
}) => {

  const {
    selectedUpdateBooking,
    setSelectedUpdateBooking,
    updateBooking,
    resetBooking,
    updateSelectedUpdateBooking,
  } = useBookingServiceStore((state: BookingServiceStore) => state);
 
  const { salonTechnicians } = useSalonStore((state: SalonState) => state);

  const [form] = Form.useForm();
  const [isShowSelectBookingService, setIsShowSelectBookingService] = useState<boolean>(false);
  const [isShowSelectCustomer, setIsShowSelectCustomer] = useState<boolean>(false);



  const handleSelectBookingService = (service: Service) => {

    console.log('update service:: ', service);

    let technician = salonTechnicians.find((technician) => technician.id === eventData?.resource);

    // updateSelectedUpdateBooking({
    //   id: generateTimestampNumber(),
    //   service: service,
    //   technician: technician || null,
    //   price: service.price,
    //   duration: service.duration,
    //   start_at: dayjs(eventData?.start.toString()).format('YYYY-MM-DD HH:mm:ss'),
    //   end_at: dayjs(eventData?.start.toString()).add(service.duration, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
    //   is_requested: false,
    //   booking_date: dayjs(eventData?.metadata?.booking?.booking_date).format('YYYY-MM-DD'),
    // });
    setIsShowSelectBookingService(false);
  }

  const handleSelectCustomer = (customer: Customer) => {
    setIsShowSelectCustomer(false);
    updateBooking({
      customer: customer,
    });
  }

  const handleCancelSelectCustomer = () => {
    setIsShowSelectCustomer(false);
  }

  const handleRemoveCustomer = () => {
    updateBooking({
      customer: null,
    });
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
  

    let newBookingServices = selectedUpdateBooking?.booking_services?.map((bs) => {
      if (bs.id === bookingService.id) {
        return bookingService;
      }
      return bs;
    })

    let newBooking:Booking = {
      ...selectedUpdateBooking,
      booking_services: newBookingServices || [],
      customer: selectedUpdateBooking?.customer || null,
      total_price: selectedUpdateBooking?.total_price || 0,
      total_duration: selectedUpdateBooking?.total_duration || 0,
      status: selectedUpdateBooking?.status || 'pending',
      notes: selectedUpdateBooking?.notes || '',
      payment_method: selectedUpdateBooking?.payment_method || '',
      payment_status: selectedUpdateBooking?.payment_status || '',
      booking_date: selectedUpdateBooking?.booking_date || '',
      id: selectedUpdateBooking?.id || '',
    } 

    setSelectedUpdateBooking(newBooking);

    console.log('newBooking:: ', newBooking);

    // updateSelectedUpdateBooking(newBooking);   

    // updateSelectedUpdateBooking(bookingService, {
    //   booking_services: [...selectedUpdateBooking?.booking_services, bookingService],
    // });

    // updateBooking({
    //   booking_services: [...selectedUpdateBooking?.booking_services, bookingService],
    // });

  }

  useEffect(() => {
    // initBookingServices(eventData);
    setSelectedUpdateBooking(eventData?.metadata?.booking);
  }, [eventData]);

  const onCloseModal = () => {
      resetBooking();
    onCancel();
  }

  const handleSaveBookingEvent = () => {
    if(selectedUpdateBooking) {
      updateSelectedUpdateBooking(selectedUpdateBooking);
    }
    onCloseModal();
  }

  const onChangeBookingDate = (value: Dayjs) => {
    updateBooking({
      booking_date: value.format('YYYY-MM-DD'),
    });
  }

  console.log('update booking eventData:: ', eventData?.metadata);

  return (
    <Modal
      title="Update Booking"
      open={open}
      onCancel={onCloseModal}
      footer={[
        <Button key="cancel" onClick={onCloseModal}>
          Cancel
        </Button>,
        <Button key="submit" type="default" onClick={handleSaveBookingEvent}>
          Update Appointment
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
            selectedUpdateBooking?.customer ?
              <CustomerCard
                name={selectedUpdateBooking?.customer.name}
                phoneNumber={selectedUpdateBooking?.customer.phone}
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
            defaultValue={dayjs(selectedUpdateBooking?.booking_date)}
            format={'dddd, MMMM D, YYYY'}
            className='w-full'
            value={dayjs(selectedUpdateBooking?.booking_date)}
            onChange={onChangeBookingDate}
          />
        </Space>

        <Space direction='vertical' className='w-full'>
          {selectedUpdateBooking?.booking_services.map((bookingService: BookingService, index: number) => (
            <BookingServiceCard
              key={bookingService?.id}
              initialDateTime={dayjs(bookingService.start_at)}
              onClick={() => { }}
              bookingService={bookingService}
              booking={selectedUpdateBooking}
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

export default UpdateBookingEventModal;
