import { Button, Card, Drawer, Flex, Input, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
const { Search } = Input;

import type { GetProps } from 'antd';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import { AppointmentServiceType } from '@/types/appointment';
import useAppointmentStore, { AppointmentStore } from '@/store/useAppointmentStore';
import { EmployeeStore, useEmployeeStore } from '@/store/useEmployeeStore';
import { CustomerType, EmployeeType } from '@/types/user';
import { CustomerStore, useCustomerStore } from '@/store/useCustomerStore';

type SearchProps = GetProps<typeof Input.Search>;


type Props = {
  isShow: boolean;
  onClose: () => void;
  // onSelectService: (service: NailServiceType | null) => void;
  multiple_services?: boolean;
  selectedService?: NailServiceType | null;
  onAddCustomer: (customer: CustomerType) => void;
}

type SelectServiceType = {
  is_selected?: boolean;
} & NailServiceType;

type SelectServiceCategoryType = {
  is_selected?: boolean;
} & NailServiceCategoryType;

const SelectCustomerDrawer = (props: Props) => {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const {
    customers,
    getCustomers
  } = useCustomerStore((state: CustomerStore) => state)
  // const [selectedService, setSelectedService] = useState<NailServiceType | null>(null);
  const [selectServices, setSelectServices] = useState<NailServiceType[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>()

  const onSelectService = (service: NailServiceType) => {
    let newSelectServices = [...selectServices];
    newSelectServices = newSelectServices?.map((s) => {
      if (s.id == service.id) {
        s.is_selected = !s.is_selected;
      }
      return s
    })
    console.log('====================================');
    console.log('service:: ', service);
    console.log('newSelectServices:: ', newSelectServices);

    console.log('====================================');
    setSelectServices(newSelectServices);

  }

  const handleConfirm = () => {
    if (selectedCustomer) {
      props.onAddCustomer(selectedCustomer)
    }
    props.onClose();

  }

  const isSelectedCustomer = (user: CustomerType) => {
    return selectedCustomer?.id === user.id
  }

  const onSelectEmployee = (user: CustomerType) => {
    setSelectedCustomer(user)
  }

  useEffect(() => {
    getCustomers()

  }, [props.isShow])



  return (
    <Drawer
      title="Add Customer"
      width={820}
      onClose={props.onClose}
      open={props.isShow}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleConfirm} >
            Submit
          </Button>
        </Space>
      }
    >
      <Search
        placeholder="Search by customer name, phone number"
        onSearch={onSearch}
        inputMode='search'
      />
      <Flex className='flex-col cursor-pointer mt-6' gap={6} >
        {
          customers?.map(customer => (
            <Flex
              key={customer.id}
              className={`flex-1 border-l-8 border-l-sky-400 p-4 shadow-6 rounded-md justify-between ${isSelectedCustomer(customer) ? 'bg-sky-400' : ''}`}
              onClick={() => onSelectEmployee(customer)}

            >
              <Flex className='flex-col'>
                <p className='font-bold'>{customer.username}</p>
              </Flex>
              <Space className=''>
                {/* <h2 className='font-bold'>{employee.price}$</h2> */}
              </Space>
            </Flex>
          ))
        }
      </Flex>
    </Drawer>
  )
}

export default SelectCustomerDrawer