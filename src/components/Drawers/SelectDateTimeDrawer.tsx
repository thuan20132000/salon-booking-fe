import React, { useState } from 'react';
import { Drawer, DatePicker, TimePicker, Button, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface SelectDateTimeDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (date: Dayjs) => void;
  initialDateTime?: Date;
}

const SelectDateTimeDrawer: React.FC<SelectDateTimeDrawerProps> = ({
  open,
  onClose,
  onSelect,
  initialDateTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    initialDateTime ? dayjs(initialDateTime) : null
  );
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(
    initialDateTime ? dayjs(initialDateTime) : null
  );

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const combinedDateTime = selectedDate
        .hour(selectedTime.hour())
        .minute(selectedTime.minute());
      onSelect(combinedDateTime);
      onClose();
    }
  };

  const disablePastDates = (current: Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <Drawer
      title="Select Date and Time"
      // placement="right"
      onClose={onClose}
      open={open}
     
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 font-medium">Date</div>
          <DatePicker
            className="w-full"
            value={selectedDate}
            onChange={setSelectedDate}
            disabledDate={disablePastDates}
            format="YYYY-MM-DD"
          />
        </div>

        <div>
          <div className="mb-2 font-medium">Time</div>
          <TimePicker
            className="w-full"
            value={selectedTime}
            onChange={setSelectedTime}
            format="HH:mm"
            minuteStep={15}
            use12Hours
          />
        </div>
      </div>
      <Button
        type="default"
        onClick={handleConfirm}
        disabled={!selectedDate || !selectedTime}
        className="w-full mt-10"
      >
        Confirm
      </Button>
    </Drawer>
  );
};

export default SelectDateTimeDrawer;
