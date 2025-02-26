import React, { useState } from 'react';
import { Drawer, Input, List, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Technician } from '@/interfaces/salon';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
interface SelectTechnicianDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (technician: Technician) => void;
}


const SelectTechnicianDrawer: React.FC<SelectTechnicianDrawerProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const { salonTechnicians } = useSalonStore((state: SalonState) => state);
  const [searchText, setSearchText] = useState('');
  const [technicians, setTechnicians] = useState<Technician[]>(salonTechnicians);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = salonTechnicians.filter((tech) =>
      tech.name.toLowerCase().includes(value.toLowerCase())
    );
    setTechnicians(filtered);
  };

  return (
    <Drawer
      title="Select Technician"
      placement="right"
      onClose={onClose}
      open={open}
      width={320}
    >
      <Input
        placeholder="Search technician"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <List
        itemLayout="horizontal"
        dataSource={technicians}
        renderItem={(technician) => (
          <List.Item
            onClick={() => onSelect(technician)}
            style={{ cursor: 'pointer' }}
            className="hover:bg-gray-100"
          >
            <List.Item.Meta
              avatar={
                <Avatar src={technician.avatar}>
                  {technician.name.charAt(0)}
                </Avatar>
              }
              title={technician.name}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default SelectTechnicianDrawer;
