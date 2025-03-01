import React, { useState } from 'react';
import { Drawer, Input, List, Avatar, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Customer } from '@/interfaces/salon';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
import AddCustomerModal from '@/components/Modals/AddCustomerModal';
import { isOnlyNumbers, isOnlyAlphabets } from '@/utils/helpers';
interface SelectSalonCustomerDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

const SelectSalonCustomerDrawer: React.FC<SelectSalonCustomerDrawerProps> = ({
  open,
  onClose,
  onSelectCustomer,
}) => {
  const { salonCustomers } = useSalonStore((state: SalonState) => state);
  const [searchText, setSearchText] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(salonCustomers);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Customer>();

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = salonCustomers.filter(
      (customer) =>
        customer.full_name.toLowerCase().includes(value.toLowerCase()) ||
        customer.phone_number.includes(value) ||
        customer.email?.toLowerCase().includes(value.toLowerCase()) ||
        customer.address?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const handleAddCustomer = () => {
    // setIsAddCustomerModalOpen(true);
    let isNumber = isOnlyNumbers(searchText);

    if (isNumber) {
      setNewCustomer({
        full_name: '',
        phone_number: searchText,
      });
    } else if (isOnlyAlphabets(searchText)) {
      setNewCustomer({
        full_name: searchText,
        phone_number: '',
      });
    }
    setIsAddCustomerModalOpen(true);


  }
  return (
    <Drawer
      title="Select Customer"
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
    >
      <Input
        placeholder="Search by name or phone"
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
        footer={
          <div className="flex justify-center">
            {
              filteredCustomers.length <= 0 && (
                <Button
                  type="default"
                  onClick={() => handleAddCustomer()}
                >
                  Create new customer
                </Button>
              )
            }
          </div>
        }

      />
      <AddCustomerModal
        isOpen={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        initialCustomer={newCustomer}
      />
    </Drawer>
  );
};

export default SelectSalonCustomerDrawer;
