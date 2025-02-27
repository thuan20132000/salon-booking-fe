import React, { useState, useEffect } from 'react';
import { Card, Typography, Space, Tag, Avatar, Button, Input, Select } from 'antd';
import { ClockCircleOutlined, HourglassOutlined, DollarOutlined, UserOutlined, DeleteOutlined, DownOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { formatPrice, formatDuration, formatTime } from '@/utils/helpers';
import SelectTechnicianDrawer from '@/components/Drawers/SelectTechnicianDrawer';
import SelectDateTimeDrawer from '@/components/Drawers/SelectDateTimeDrawer';
import { Service, Employee, } from '@/interfaces/salon';
import { BookingService, Booking } from '@/interfaces/booking';
import dayjs, { Dayjs } from 'dayjs';
import SelectBookingServiceDrawer from '../Drawers/SelectBookingServiceDrawer';
import SelectBookingTimeDrawer from '../Drawers/SelectBookingTimeDrawer';
import { SelectDurationDrawer } from '../Drawers/SelectDurationDrawer';
import SelectServicePriceDrawer from '../Drawers/SelectServicePriceDrawer';
const { Text, Title } = Typography;

interface BookingServiceCardProps {
  initialDateTime: Dayjs; // ISO string
  onClick?: () => void;
  onRemove?: () => void;
  bookingService: BookingService;
  booking: Booking;
  onUpdateBookingService?: (bookingService: BookingService) => void;
}

const BookingServiceCard: React.FC<BookingServiceCardProps> = ({
  initialDateTime,
  onClick,
  onRemove,
  onUpdateBookingService,
  bookingService,
  booking,
}) => {
  const [isShowSelectTechnician, setIsShowSelectTechnician] = useState<boolean>(false);
  const [isShowSalonServices, setIsShowSalonServices] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isShowSelectBookingTime, setIsShowSelectBookingTime] = useState<boolean>(false);
  const [isShowSelectDuration, setIsShowSelectDuration] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isShowSelectServicePrice, setIsShowSelectServicePrice] = useState<boolean>(false);

  const handleSelectServicePrice = (price: number) => {
    // setSelectedServicePrice(price);
    let updatedBookingService = {
      ...bookingService,
      price: price,
    };
    onUpdateBookingService?.(updatedBookingService);
    setIsShowSelectServicePrice(false);
  }

  const handleCancelSelectServicePrice = () => {
    setIsShowSelectServicePrice(false);
  }

  const handleSelectDuration = (duration: number) => {

    let startAt = dayjs(bookingService.start_at).format('YYYY-MM-DD HH:mm:ss');
    let endAt = dayjs(bookingService.start_at).add(duration, 'minutes').format('YYYY-MM-DD HH:mm:ss');

    let updatedBookingService = {
      ...bookingService,
      duration: duration,
      start_at: startAt,
      end_at: endAt,
    };

    onUpdateBookingService?.(updatedBookingService);
    setIsShowSelectDuration(false);
  }

  const handleCancelSelectDuration = () => {
    setSelectedDuration(null);
    setIsShowSelectDuration(false);
  }

  const handleSelectTechnician = (technician: Employee) => {
    setIsShowSelectTechnician(false);
    onUpdateBookingService?.({ ...bookingService, employee: technician });
  }

  const handleCancelSelectTechnician = () => {
    setIsShowSelectTechnician(false);
  }

  const handleSelectBookingTime = (datetime: Dayjs) => {

    let startAt = datetime.format('YYYY-MM-DD HH:mm:ss');
    let endAt = datetime.add(bookingService.service?.duration ?? 0, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    // return
    let updatedBookingService = {
      ...bookingService,
      start_at: startAt,
      end_at: endAt
    };
    onUpdateBookingService?.(updatedBookingService);
    setIsShowSelectBookingTime(false);
  }

  const handleCancelSelectBookingTime = () => {
    // setSelectedDateTime(null);
    setIsShowSelectBookingTime(false);
  }

  const handleSelectBookingService = (service: Service) => {

    let startAt = dayjs(bookingService.start_at).format('YYYY-MM-DD HH:mm:ss');
    let endAt = dayjs(bookingService.start_at).add(service.duration, 'minutes').format('YYYY-MM-DD HH:mm:ss');

    let updatedBookingService = {
      ...bookingService,
      service: service,
      price: service.price,
      duration: service.duration,
      start_at: startAt,
      end_at: endAt,
    };

    onUpdateBookingService?.(updatedBookingService);
    setIsShowSalonServices(false);
  }

  const handleCancelSelectBookingService = () => {
    setIsShowSalonServices(false);
  }

  const handleToggleRequested = () => {
    let updatedBookingService = { ...bookingService, is_requested: !bookingService.is_requested };
    onUpdateBookingService?.(updatedBookingService);
  }


  return (
    <Card
      hoverable
      style={{ width: '100%', marginBottom: 6, padding: 0, position: 'relative' }}
      onClick={(e) => {
        onClick?.();
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}

    >
      {
        isHover && (
          <Button
            type="text"
            icon={<DeleteOutlined style={{ fontSize: 16, color: 'red' }} />}
            className='float-right absolute bottom-0 right-0 p-0 m-0 bg-transparent'
            style={{ border: 'none', position: 'absolute', bottom: 0, right: 0 }}
            onClick={onRemove}
          />
        )
      }
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Space size="large" style={{ width: '100%', }}>
          <Space>
            <Input
              size="small"
              placeholder="service"
              onClick={() => setIsShowSalonServices(true)}
              value={bookingService.service?.name}
              suffix={<DownOutlined
                style={{ fontSize: 12, color: 'gray' }}
                onClick={() => setIsShowSalonServices(true)}
              />}
            />
            <Input
              size="small"
              placeholder="technician"
              onClick={() => setIsShowSelectTechnician(true)}
              value={bookingService.employee?.nick_name}
              prefix={<UserOutlined />}
              prefixCls="custom-prefix"
              suffix={
                <>
                  {
                    bookingService.is_requested ? (
                      <HeartFilled
                        style={{ fontSize: 14, color: 'red' }}
                        onClick={handleToggleRequested}
                      />
                    ) : (
                      <HeartOutlined
                        style={{ fontSize: 14, color: 'gray' }}
                        onClick={handleToggleRequested}
                      />
                    )
                  }
                  <DownOutlined
                    style={{ fontSize: 12, color: 'gray' }}
                    onClick={() => setIsShowSelectTechnician(true)}
                  />
                </>
              }
            />
          </Space>
        </Space>
        <Space
        >
          <Tag icon={<ClockCircleOutlined />} color="blue"
            onClick={() => setIsShowSelectBookingTime(true)}
          >
            {dayjs(bookingService.start_at).format('HH:mm')}
          </Tag>
          <Tag icon={<HourglassOutlined />} color="blue"
            onClick={() => setIsShowSelectDuration(true)}
          >
            {/* check if custom duration is set or use the service duration */}
            {bookingService.duration ? formatDuration(bookingService.duration) : formatDuration(bookingService.service?.duration)}
          </Tag>
          <Tag icon={<DollarOutlined />} color="green"
            onClick={() => setIsShowSelectServicePrice(true)}
          >
            {/* check if custom price is set or use the service price */}
            {bookingService.price ? formatPrice(bookingService.price) : formatPrice(bookingService.service?.price)}
          </Tag>
        </Space>
      </Space>
      <SelectTechnicianDrawer
        open={isShowSelectTechnician}
        onClose={handleCancelSelectTechnician}
        onSelect={handleSelectTechnician}
      />
      <SelectBookingTimeDrawer
        open={isShowSelectBookingTime}
        onClose={handleCancelSelectBookingTime}
        onSelectTime={handleSelectBookingTime}
        booking={booking}
      />
      <SelectBookingServiceDrawer
        open={isShowSalonServices}
        onClose={handleCancelSelectBookingService}
        onSelectService={handleSelectBookingService}
      />
      <SelectDurationDrawer
        open={isShowSelectDuration}
        onClose={handleCancelSelectDuration}
        onSelect={handleSelectDuration}
      />
      <SelectServicePriceDrawer
        open={isShowSelectServicePrice}
        onClose={handleCancelSelectServicePrice}
        onSubmit={handleSelectServicePrice}
      />
    </Card>
  );
};

export default BookingServiceCard;
