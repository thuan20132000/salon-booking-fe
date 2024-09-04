import { Button, Card, Drawer, Flex, Input, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
const { Search } = Input;

import type { GetProps } from 'antd';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceCategoryType, NailServiceType } from '@/types/service';

type SearchProps = GetProps<typeof Input.Search>;


type Props = {
  isShow: boolean;
  onClose: () => void;
  multiple_services?: boolean;
  selectedService?: NailServiceType | null;
  onUpdateService: (service: NailServiceType | null) => void;
}

type SelectServiceType = {
  is_selected?: boolean;
} & NailServiceType;

type SelectServiceCategoryType = {
  is_selected?: boolean;
} & NailServiceCategoryType;

const UpdateServiceDrawer = (props: Props) => {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const { getServiceCategories, getServices, services, serviceCategories } = useServiceStore((state: ServiceStore) => state);
  const [selectedService, setSelectedService] = useState<NailServiceType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NailServiceCategoryType | null>(null);
  const onSelectService = (service: NailServiceType) => {
    setSelectedService(service);
  }

  const onSelectCategory = (category: NailServiceCategoryType) => {
    setSelectedCategory(category);
  }

  const handleConfirm = () => {
    props.onUpdateService(selectedService);
    props.onClose();
  }

  return (
    <Drawer
      title="Update Service"
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
        placeholder="Search by service name"
        onSearch={onSearch}
        inputMode='search'
      />

      <Flex wrap className='mt-4 mb-4' gap={8}>
        {serviceCategories?.map(category => (
          <Button className={
            `border-cyan-300 ${category == selectedCategory ? 'bg-sky-500' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            <p>{category?.name}</p>
          </Button>
        ))}
      </Flex>

      <Flex className='flex-col cursor-pointer' gap={6} >
        {
          services.map(service => (
            <Flex
              className={`flex-1 border-l-8 border-l-sky-400 p-4 shadow-6 rounded-md justify-between ${service == selectedService ? 'bg-sky-400' : ''}`}
              onClick={() => onSelectService(service)}

            >
              <Flex className='flex-col'>
                <p className='font-bold'>{service.name}</p>
                <p className='text-sm'>{service.duration} min</p>
              </Flex>
              <Space className=''>
                <h2 className='font-bold'>{service.price}$</h2>
              </Space>
            </Flex>
          ))
        }
      </Flex>
    </Drawer>
  )
}

export default UpdateServiceDrawer