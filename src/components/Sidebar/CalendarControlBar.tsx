import { Button, DatePicker, Flex, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { DayPilot } from "@daypilot/daypilot-lite-react";

interface CalendarControlBarProps {
  startDate: DayPilot.Date;
  onDateChange: (date: DayPilot.Date) => void;
  onToday: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const CalendarControlBar = ({
  startDate,
  onDateChange,
  onToday,
  onPrevious,
  onNext,
}: CalendarControlBarProps) => {
  const onChange: DatePickerProps['onChange'] = (date) => {
    if (date) {
      const newDate = DayPilot.Date.fromYearMonthDay(
        date.year(),
        date.month() + 1,
        date.date()
      );
      onDateChange(newDate);
    }
  };

  return (
    <Space direction='horizontal' className='w-full mb-4'>
      <Flex className='mr-8'>
        <Button onClick={onToday}>Today</Button>
        <Flex className='ml-2'>
          <Button onClick={onPrevious}>Previous</Button>
        </Flex>
        <Flex className='mx-2'>
          <DatePicker
            onChange={onChange}
            value={dayjs(startDate.toString())}
          />
        </Flex>
        <Button onClick={onNext}>Next</Button>
      </Flex>
    </Space>
  );
};

export default CalendarControlBar;
