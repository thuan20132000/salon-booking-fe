import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, Space, Avatar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { generateTimestampNumber } from '@/utils/helpers';
import BookingServiceCard from '@/components/Cards/BookingServiceCard';
import { DayPilot } from 'daypilot-pro-react';
import { PlusOutlined } from '@ant-design/icons';
import SelectBookingServiceDrawer from '@/components/Drawers/SelectBookingServiceDrawer';
import { BookingService, Booking } from '@/interfaces/booking';
import { Customer } from '@/interfaces/salon';
import { Service } from '@/interfaces/salon';
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
    updateSelectedUpdateBooking,
    resetSelectedUpdateBooking,
  } = useBookingServiceStore((state: BookingServiceStore) => state);

  const { salonTechnicians } = useSalonStore((state: SalonState) => state);

  const [form] = Form.useForm();
  const [isShowSelectBookingService, setIsShowSelectBookingService] = useState<boolean>(false);
  const [isShowSelectCustomer, setIsShowSelectCustomer] = useState<boolean>(false);



  const handleAddMoreBookingService = (service: Service) => {

    let technician = salonTechnicians.find((technician) => technician.id === eventData?.resource);

    let newBookingService: BookingService = {
      id: generateTimestampNumber(),
      service: service,
      employee: technician || null,
      price: service.price,
      duration: service.duration,
      start_at: dayjs(eventData?.start.toString()).format('YYYY-MM-DD HH:mm:ss'),
      end_at: dayjs(eventData?.start.toString()).add(service.duration, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
      is_requested: false,
      selected_date: dayjs(eventData?.metadata?.booking?.selected_date).format('YYYY-MM-DD'),
    }

    let newBooking: Booking = {
      ...selectedUpdateBooking,
      booking_services: [...(selectedUpdateBooking?.booking_services || []), newBookingService],
    }

    setSelectedUpdateBooking(newBooking);
    setIsShowSelectBookingService(false);
  }

  const handleSelectCustomer = (customer: Customer) => {
    setIsShowSelectCustomer(false);
    setSelectedUpdateBooking({
      ...selectedUpdateBooking,
      customer: customer,
    });
  }

  const handleCancelSelectCustomer = () => {
    setIsShowSelectCustomer(false);
  }

  const handleRemoveCustomer = () => {
    setSelectedUpdateBooking({
      ...selectedUpdateBooking,
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

    let newBooking: Booking = {
      ...selectedUpdateBooking,
      booking_services: newBookingServices || [],
    }

    setSelectedUpdateBooking(newBooking);

  }

  const handleRemoveBookingService = (bookingService: BookingService) => {
    let newBookingServices = selectedUpdateBooking?.booking_services?.filter((bs) => bs.id !== bookingService.id);
    let newBooking: Booking = {
      ...selectedUpdateBooking,
      booking_services: newBookingServices || [],
    }
    setSelectedUpdateBooking(newBooking);
  }

  useEffect(() => {

    if (open) {
      setSelectedUpdateBooking(eventData?.metadata?.booking);
    }

  }, [eventData, open]);

  const onCloseModal = () => {
    resetSelectedUpdateBooking();
    onCancel();
  }

  const handleSaveBookingEvent = () => {
    if (selectedUpdateBooking) {
      updateSelectedUpdateBooking(selectedUpdateBooking);
    }
    onCloseModal();
  }

  const onChangeBookingDate = (value: Dayjs) => {

    let newBooking: Booking = {
      ...selectedUpdateBooking,
      selected_date: value.format('YYYY-MM-DD'),
      booking_services: selectedUpdateBooking?.booking_services?.map((bookingService: BookingService) => {
        let newStart = dayjs(bookingService.start_at).set('date', value.date()).format('YYYY-MM-DD HH:mm:ss');
        let newEnd = dayjs(bookingService.end_at).set('date', value.date()).format('YYYY-MM-DD HH:mm:ss');
        return {
          ...bookingService,
          start_at: newStart,
          end_at: newEnd,
          selected_date: value.format('YYYY-MM-DD'),
        }
      }),
    }
    setSelectedUpdateBooking(newBooking);
  }

  const renderBookingServices = () => {
    return selectedUpdateBooking?.booking_services?.map((bookingService: BookingService) => (
      <BookingServiceCard
        key={bookingService?.id}
        initialDateTime={dayjs(bookingService.start_at)}
        bookingService={bookingService}
        booking={selectedUpdateBooking}
        onUpdateBookingService={handleUpdateBookingService}
        onRemove={() => handleRemoveBookingService(bookingService)}
      />
    ))
  }


  return (
    <Modal
      title={`Update Booking #${selectedUpdateBooking?.id}`}
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
                name={selectedUpdateBooking?.customer.full_name}
                phoneNumber={selectedUpdateBooking?.customer?.phone_number}
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
            defaultValue={dayjs(selectedUpdateBooking?.selected_date)}
            format={'dddd, MMMM D, YYYY'}
            className='w-full'
            value={dayjs(selectedUpdateBooking?.selected_date)}
            onChange={onChangeBookingDate}
          />
        </Space>

        <Space direction='vertical' className='w-full'>
          {renderBookingServices()}
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
          onSelectService={handleAddMoreBookingService}

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
