import React, { useState } from 'react';
import { Drawer, Input, List, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Service } from '@/interfaces/salon';
import SalonServiceCard from '../Cards/SalonServiceCard';

const { Item } = List;

interface SelectBookingServiceDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelectService: (service: Service) => void;
}



const SelectBookingServiceDrawer: React.FC<SelectBookingServiceDrawerProps> = ({
  open,
  onClose,
  onSelectService,
}) => {
  const sampleServices: Service[] = [
    { id: 1, name: 'Haircut', duration: 30, price: 35 },
    { id: 2, name: 'Hair Coloring', duration: 120, price: 120 },
    { id: 3, name: 'Manicure', duration: 60, price: 40 },
    { id: 4, name: 'Pedicure', duration: 60, price: 50 },
    { id: 5, name: 'Facial Treatment', duration: 60, price: 80 },
    { id: 6, name: 'Massage', duration: 60, price: 90 },
    { id: 7, name: 'Waxing', duration: 30, price: 45 },

  ];
  const [searchText, setSearchText] = useState('');
  const [filteredServices, setFilteredServices] = useState(sampleServices);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = sampleServices.filter((service) =>
      service.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  return (
    <Drawer
      title="Select Service"
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
    >
      <Input
        placeholder="Search services..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <List
        dataSource={filteredServices}
        itemLayout="horizontal"
        renderItem={(service) =>
          <SalonServiceCard
            serviceName={service.name}
            duration={service.duration}
            price={service.price}
            isSelected={false}
            onSelect={() => onSelectService(service)}
          />
        }
      />

    </Drawer>
  );
};

export default SelectBookingServiceDrawer;
