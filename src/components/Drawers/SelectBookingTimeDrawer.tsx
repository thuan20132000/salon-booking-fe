import React, { useState, useEffect } from 'react';
import { Drawer, TimePicker, Button, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Booking } from '@/interfaces/booking';

interface SelectBookingTimeDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelectTime: (datetime: Dayjs) => void;
  booking: Booking;
}

const SelectBookingTimeDrawer: React.FC<SelectBookingTimeDrawerProps> = ({
  open,
  onClose,
  onSelectTime,
  booking,
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(null);

  const handleTimeChange = (time: Dayjs | null) => {
    setSelectedDateTime(time);
  };

  const handleConfirm = () => {
    if (selectedDateTime) {
      onSelectTime(selectedDateTime);
      onClose();
    }
  };


  return (
    <Drawer
      title="Time"
      placement="right"
      onClose={onClose}
      open={open}
    // width={320}
    >
      <TimePicker
        use12Hours
        format="h:mm A"
        minuteStep={30}
        style={{ width: '100%' }}
        onChange={handleTimeChange}
        value={selectedDateTime}
        placeholder="Select time"
        needConfirm={false}
      />
      <Space
        className='flex mt-4'
      >
        <Button className='flex-1 ' onClick={onClose}>Cancel</Button>
        <Button
          className='flex-1 '
          type="default"
          onClick={handleConfirm}
          disabled={!selectedDateTime}
        >
          Confirm
        </Button>
      </Space>
    </Drawer>
  );
};

export default SelectBookingTimeDrawer;
