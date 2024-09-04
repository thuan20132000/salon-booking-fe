import { Button, Card, Drawer, Flex, Input, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
const { Search } = Input;

import type { GetProps } from 'antd';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import { AppointmentServiceType } from '@/types/appointment';
import useAppointmentStore, { AppointmentStore } from '@/store/useAppointmentStore';

type SearchProps = GetProps<typeof Input.Search>;


type Props = {
  isShow: boolean;
  onClose: () => void;
  // onSelectService: (service: NailServiceType | null) => void;
  multiple_services?: boolean;
  selectedService?: NailServiceType | null;
}

type SelectServiceType = {
  is_selected?: boolean;
} & NailServiceType;

type SelectServiceCategoryType = {
  is_selected?: boolean;
} & NailServiceCategoryType;

const SelectServiceDrawer = (props: Props) => {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const {
    services,
    serviceCategories,
    getServices
  } = useServiceStore((state: ServiceStore) => state);
  const {
    appointmentServices,
    updateAppointmentServices,
    appointment,
    updateAppointment
  } = useAppointmentStore((state: AppointmentStore) => state);
  // const [selectedService, setSelectedService] = useState<NailServiceType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NailServiceCategoryType | null>(null);
  const [selectServices, setSelectServices] = useState<NailServiceType[]>([]);

  const onSelectService = (service: NailServiceType) => {

  

    let newSelectServices = [...selectServices];
    newSelectServices = newSelectServices?.map((s) => {
      if (s.id == service.id) {
        s.is_selected = !s.is_selected;
        s.created_at = new Date().getTime().toString()
      }
      return s
    })
    setSelectServices(newSelectServices);


  }

  const onSelectCategory = (category: NailServiceCategoryType) => {
    setSelectedCategory(category);
  }

  const handleConfirm = () => {

    // props.onAddService(sele);
    let selectedServices = selectServices?.filter(s => s.is_selected)
    if (selectedServices?.length <= 0) {
      props.onClose()
      return
    };

    let selectedAppointmentServices: AppointmentServiceType[] = selectedServices?.map(service => {
      return {
        id: service.created_at,
        employee: {},
        service: service
      }
    })

    console.log('====================================');
    console.log('newAppointmentServices:: ', selectedAppointmentServices);
    console.log('====================================');
    updateAppointmentServices([...appointmentServices,...selectedAppointmentServices])
    
    updateAppointment({
      ...appointment,
      services: [...appointmentServices, ...selectedAppointmentServices]
    })

    props.onClose();

  }

  useEffect(() => {
    const tempServices = services?.map(service => {
      return { ...service, is_selected: false }
    })
    setSelectServices(tempServices)
    // console.log('====================================');
    // console.log('sadsadsa:: ', tempServices);
    // console.log('====================================');

  }, [props.isShow])



  return (
    <Drawer
      title="Add Services"
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
            key={category.id}
          >
            <p>{category?.name}</p>
          </Button>
        ))}
      </Flex>

      <Flex className='flex-col cursor-pointer' gap={6} >
        {
          selectServices?.map(service => (
            <Flex
              key={service.id}
              className={`flex-1 border-l-8 border-l-sky-400 p-4 shadow-6 rounded-md justify-between ${service.is_selected ? 'bg-sky-400' : ''}`}
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

export default SelectServiceDrawer