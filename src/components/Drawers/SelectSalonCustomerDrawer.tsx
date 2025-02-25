import React, { useState } from 'react';
import { Drawer, Input, List, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Customer } from '@/interfaces/salon';



interface SelectSalonCustomerDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

const sampleCustomers: Customer[] = [
  { id: 1, name: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', phone: '234-567-8901', email: 'jane@example.com' },
  { id: 3, name: 'Mike Johnson', phone: '345-678-9012', email: 'mike@example.com' },
  { id: 4, name: 'Sarah Williams', phone: '456-789-0123', email: 'sarah@example.com' },
  { id: 5, name: 'David Brown', phone: '567-890-1234', email: 'david@example.com' },
  { id: 6, name: 'Emily Davis', phone: '678-901-2345', email: 'emily@example.com' },
  { id: 7, name: 'Michael Wilson', phone: '789-012-3456', email: 'michael@example.com' },
  { id: 8, name: 'Lisa Anderson', phone: '890-123-4567', email: 'lisa@example.com' },
  { id: 9, name: 'Robert Taylor', phone: '901-234-5678', email: 'robert@example.com' },
  { id: 10, name: 'Amy Martinez', phone: '012-345-6789', email: 'amy@example.com' },
];

const SelectSalonCustomerDrawer: React.FC<SelectSalonCustomerDrawerProps> = ({
  open,
  onClose,
  onSelectCustomer,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(sampleCustomers);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = sampleCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase()) ||
        customer.phone.includes(value) ||
        customer.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  return (
    <Drawer
      title="Select Customer"
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
    >
      <Input
        placeholder="Search by name, phone, or email"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <List
        itemLayout="horizontal"
        dataSource={filteredCustomers}
        renderItem={(customer) => (
          <List.Item
            onClick={() => onSelectCustomer(customer)}
            style={{ cursor: 'pointer' }}
            className="hover:bg-gray-100"
          >
            <List.Item.Meta
              avatar={<Avatar>{customer.name[0]}</Avatar>}
              title={customer.name}
              description={
                <>
                  <div>{customer.phone}</div>
                  <div>{customer.email}</div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default SelectSalonCustomerDrawer;
