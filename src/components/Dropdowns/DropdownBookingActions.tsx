import React from 'react';
import { Dropdown, Menu, Button, Space, message } from 'antd';
import { MoreOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Booking } from '@/interfaces/booking';
import { useBookingServiceStore, BookingServiceStore } from '@/store/useBookingServiceStore';
interface DropdownBookingActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  booking: Booking;
}

const DropdownBookingActions: React.FC<DropdownBookingActionsProps> = ({
  onEdit,
  onDelete,
  onCancel,
  booking,
}) => {

  const { 
    updateBookingMetadata,

  } = useBookingServiceStore((state: BookingServiceStore) => state);


  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: 'Edit Booking',
      onClick: onEdit,
    },
    {
      key: 'cancel',
      label: 'Cancel Booking',
      onClick: onCancel,
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: 'Delete Booking',
      danger: true,
      onClick: onDelete,
    },
  ];

  const getBookingStatusLabel = (): { label: string; status: Booking['status'] } => {
    switch (booking['status']) {
      case 'scheduled':
        return {
          label: 'Mask as Checked In',
          status: 'checked_in',
        };
      case 'checked_in':
        return {
          label: 'Mask as Checked Out',
          status: 'checked_out',
        };
      case 'in_service':
        return {
          label: 'Mask as Completed',
          status: 'checked_out',
        };
      default:
        return {
          label: 'Mask as Checked In',
          status: 'checked_in',
        };
    }
  };

  const handleBookingStatus = (status: Booking['status']) => {
    updateBookingMetadata({
      id: booking.id,
      status: status 
    });
    message.success('Booking status updated');
    onCancel?.();
  };

  return (
    <Space direction='horizontal' className='w-full justify-end mb-2'>
      <Button
        type="default"
        className="cursor-pointer text-sm"
        onClick={() => handleBookingStatus(getBookingStatusLabel().status)}
      >
        <CheckCircleOutlined style={{ color: '#008000' }} />
        {getBookingStatusLabel().label}
      </Button>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button type="default" className="cursor-pointer text-sm">
          <MoreOutlined />
        </Button>
      </Dropdown>
    </Space>
  );
};

export default DropdownBookingActions;
