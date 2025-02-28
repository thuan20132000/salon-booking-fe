import React, { useState } from 'react';
import { Drawer, Input, List, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Employee } from '@/interfaces/salon';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
interface SelectTechnicianDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (technician: Employee) => void;
}


const SelectTechnicianDrawer: React.FC<SelectTechnicianDrawerProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const { salonEmployees } = useSalonStore((state: SalonState) => state);
  const [searchText, setSearchText] = useState('');
  const [technicians, setTechnicians] = useState<Employee[]>(salonEmployees);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = salonEmployees.filter((employee) =>
      employee.nick_name?.toLowerCase().includes(value.toLowerCase())
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
        renderItem={(employee) => (
          <List.Item
            onClick={() => onSelect(employee)}
            style={{ cursor: 'pointer' }}
            className="hover:bg-gray-100"
          >
            <List.Item.Meta
              avatar={
                <Avatar src={employee.avatar}>
                  {employee.nick_name?.charAt(0)}
                </Avatar>
              }
              title={employee.nick_name}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default SelectTechnicianDrawer;
