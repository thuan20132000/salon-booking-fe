import React, { useState, useEffect } from 'react';
import { Card, Typography, Space, Tag, Avatar } from 'antd';
import { ClockCircleOutlined, HourglassOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import { formatPrice, formatDuration, formatTime } from '@/utils/helpers';
import SelectTechnicianDrawer from '@/components/Drawers/SelectTechnicianDrawer';
import SelectDateTimeDrawer from '@/components/Drawers/SelectDateTimeDrawer';
import { Technician } from '@/interfaces/salon';
import dayjs, { Dayjs } from 'dayjs';
const { Text, Title } = Typography;

interface BookingServiceCardProps {
  service: {
    name: string;
    description?: string;
    duration: number; // in minutes
    price: number;
  };
  technician: Technician;
  initialDateTime: Dayjs; // ISO string
  onClick?: () => void;
}

const BookingServiceCard: React.FC<BookingServiceCardProps> = ({
  service,
  technician,
  initialDateTime,
  onClick,
}) => {
  const [isShowSelectTechnician, setIsShowSelectTechnician] = useState<boolean>(false);
  const [isShowSelectDateTime, setIsShowSelectDateTime] = useState<boolean>(false);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(technician);
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(null);

  const handleSelectTechnician = (technician: Technician) => {
    console.log('technician:: ', technician);
    setSelectedTechnician(technician);
    setIsShowSelectTechnician(false);
  }

  const handleCancelSelectTechnician = () => {
    setSelectedTechnician(null);
    setIsShowSelectTechnician(false);
  }

  const handleSelectDateTime = (date: Dayjs) => {
    console.log('change date:: ', date);
    setSelectedDateTime(date);
    setIsShowSelectDateTime(false);
  }

  const handleCancelSelectDateTime = () => {
    // setSelectedDateTime(null);
    setIsShowSelectDateTime(false);
  }

  useEffect(() => {
    setSelectedDateTime(initialDateTime);
  }, [initialDateTime]);

  return (
    <Card
      hoverable
      onClick={onClick}
      style={{ width: '100%', marginBottom: 16, padding: 0 }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Space size="large" style={{ width: '100%', }}>
          <Space onClick={() => setIsShowSelectTechnician(true)}>
            <Space>
              <Text type="secondary">{service.name}</Text>
            </Space>
            <Space>
              <Avatar
                icon={<UserOutlined />}
                src={selectedTechnician?.avatar}
                alt={selectedTechnician?.name}
              />
              <Text>{selectedTechnician?.name}</Text>
            </Space>
          </Space>
        </Space>
        <Space
        >
          <Tag icon={<ClockCircleOutlined />} color="blue"
            onClick={() => setIsShowSelectDateTime(true)}
          >
            {selectedDateTime?.format('HH:mm')}
          </Tag>
          <Tag icon={<HourglassOutlined />} color="blue"
            onClick={() => setIsShowSelectDateTime(true)}
          >
            {formatDuration(service.duration)}
          </Tag>
          <Tag icon={<DollarOutlined />} color="green">
            {formatPrice(service.price)}
          </Tag>

        </Space>

      </Space>
      <SelectTechnicianDrawer
        open={isShowSelectTechnician}
        onClose={handleCancelSelectTechnician}
        onSelect={handleSelectTechnician}
      />
      <SelectDateTimeDrawer
        open={isShowSelectDateTime}
        onClose={handleCancelSelectDateTime}
        onSelect={handleSelectDateTime}
      />
    </Card>
  );
};

export default BookingServiceCard;
