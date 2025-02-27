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
  { id: 1, full_name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com' },
  { id: 2, full_name: 'Jane Smith', phone_number: '234-567-8901', email: 'jane@example.com' },
  { id: 3, full_name: 'Mike Johnson', phone_number: '345-678-9012', email: 'mike@example.com' },
  { id: 4, full_name: 'Sarah Williams', phone_number: '456-789-0123', email: 'sarah@example.com' },
  { id: 5, full_name: 'David Brown', phone_number: '567-890-1234', email: 'david@example.com' },
  { id: 6, full_name: 'Emily Davis', phone_number: '678-901-2345', email: 'emily@example.com' },
  { id: 7, full_name: 'Michael Wilson', phone_number: '789-012-3456', email: 'michael@example.com' },
  { id: 8, full_name: 'Lisa Anderson', phone_number: '890-123-4567', email: 'lisa@example.com' },
  { id: 9, full_name: 'Robert Taylor', phone_number: '901-234-5678', email: 'robert@example.com' },
  { id: 10, full_name: 'Amy Martinez', phone_number: '012-345-6789', email: 'amy@example.com' },
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
        customer.full_name.toLowerCase().includes(value.toLowerCase()) ||
        customer.phone_number.includes(value) ||
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
              avatar={<Avatar>{customer.full_name[0]}</Avatar>}
              title={customer.full_name}
              description={
                <>
                  <div>{customer.phone_number}</div>
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
