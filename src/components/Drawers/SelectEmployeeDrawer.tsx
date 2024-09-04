import { Button, Card, Drawer, Flex, Input, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
const { Search } = Input;

import type { GetProps } from 'antd';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import { AppointmentServiceType } from '@/types/appointment';
import useAppointmentStore, { AppointmentStore } from '@/store/useAppointmentStore';
import { EmployeeStore, useEmployeeStore } from '@/store/useEmployeeStore';
import { EmployeeType } from '@/types/user';

type SearchProps = GetProps<typeof Input.Search>;


type Props = {
  isShow: boolean;
  onClose: () => void;
  // onSelectService: (service: NailServiceType | null) => void;
  multiple_services?: boolean;
  selectedService?: NailServiceType | null;
  onAddEmployee: (employee: EmployeeType) => void;
}

type SelectServiceType = {
  is_selected?: boolean;
} & NailServiceType;

type SelectServiceCategoryType = {
  is_selected?: boolean;
} & NailServiceCategoryType;

const SelectEmployeeDrawer = (props: Props) => {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const {
    employees,
    getEmployees
  } = useEmployeeStore((state: EmployeeStore) => state)

  // const [selectedService, setSelectedService] = useState<NailServiceType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NailServiceCategoryType | null>(null);
  const [selectServices, setSelectServices] = useState<NailServiceType[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>()

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
    if(selectedEmployee){
      props.onAddEmployee(selectedEmployee)
    }
    props.onClose();

  }

  const isSelectdEmployee = (employee: EmployeeType) => {
    return selectedEmployee?.id === employee.id
  }

  const onSelectEmployee = (employee: EmployeeType) => {
    setSelectedEmployee(employee)
  }

  useEffect(() => {
    getEmployees()
    setSelectedEmployee(null)

  }, [props.isShow])



  return (
    <Drawer
      title="Add Employee"
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
      <Flex className='flex-col cursor-pointer mt-6' gap={6} >
        {
          employees?.map(employee => (
            <Flex
              key={employee.id}
              className={`flex-1 border-l-8 border-l-sky-400 p-4 shadow-6 rounded-md justify-between ${isSelectdEmployee(employee) ? 'bg-sky-400' : ''}`}
              onClick={() => onSelectEmployee(employee)}

            >
              <Flex className='flex-col'>
                <p className='font-bold'>{employee.username}</p>
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

export default SelectEmployeeDrawer