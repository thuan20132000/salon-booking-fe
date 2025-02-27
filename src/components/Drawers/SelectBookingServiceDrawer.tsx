import React, { useState, useEffect } from 'react';
import { Drawer, Input, List, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Service } from '@/interfaces/salon';
import SalonServiceCard from '../Cards/SalonServiceCard';
import { useSalonStore, SalonState } from '@/store/useSalonStore';

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
  const {
    salonServices,
  } = useSalonStore((state: SalonState) => state);
  
  const [searchText, setSearchText] = useState('');
  const [filteredServices, setFilteredServices] = useState(salonServices);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = salonServices.filter((service) =>
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
