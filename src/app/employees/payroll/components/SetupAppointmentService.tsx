import { Button, Divider, Flex } from 'antd'
import React, { useState } from 'react'
import SelectServiceItem from './SelectServiceItem'
import { PlusCircleFilled } from '@ant-design/icons'
import SelectServiceDrawer from '@/components/Drawers/SelectServiceDrawer'
import useAppointmentStore, { AppointmentStore } from '@/store/useAppointmentStore'
import { NailServiceType } from '@/types/service'
import UpdateServiceDrawer from '@/components/Drawers/UpdateServiceDrawer'
import SelectEmployeeDrawer from '@/components/Drawers/SelectEmployeeDrawer'
import { CustomerType, EmployeeType } from '@/types/user'
import { AppointmentServiceType } from '@/types/appointment'
import SelectCustomerDrawer from '@/components/Drawers/SelectCustomerDrawer'
import dayjs from 'dayjs'

type Props = {}

const SetupAppointmentService = (props: Props) => {
  const [isShowSelectService, setIsShowSelectService] = useState<boolean>(false)
  const [isShowSelectEmployee, setIsShowSelectEmployee] = useState<boolean>(false)
  const [isShowSelectCustomer, setIsShowSelectCustomer] = useState<boolean>(false)

  const {
    appointmentServices,
    updateAppointmentServices,
    appointment,
    updateAppointment
  } = useAppointmentStore((state: AppointmentStore) => state)
  const [selectedService, setSelectedService] = useState<AppointmentServiceType | null>(null)

  const showSelectServiceDrawer = () => {
    setIsShowSelectService(true)
  }



  const onUpdateServicePress = (service: AppointmentServiceType | null) => {
    setSelectedService(service)
  }

  const onDeleteServicePress = (service: AppointmentServiceType | null) => {
    console.log('====================================');
    console.log('appointment_service:: ', service);
    console.log('====================================');
    let newServices = appointmentServices?.filter((s, i) => s.id !== service?.id)

    updateAppointmentServices(newServices)
    updateAppointment({
      ...appointment,
      services: newServices
    })
  }

  const onAddAppointmentServiceEmployee = (employee: EmployeeType) => {
    let newServices = appointmentServices?.map((s) => {
      if (s.id === selectedService?.id) {
        return { ...s, employee: employee }
      }
      return s
    })
    console.log('====================================');
    console.log('newServices:: ', newServices);
    console.log('====================================');
    if (newServices) {
      updateAppointmentServices(newServices)
      updateAppointment({
        ...appointment,
        services: newServices
      })
    }
  }

  const onUpdateAppointmentServiceTime = (
    date: dayjs.Dayjs,
    appointmentService: AppointmentServiceType
  ) => {
    console.log('====================================');
    console.log('date:: ', date.format('YYYY-MM-DD HH:mm:ss'));
    console.log('appointmentService:: ', appointmentService);
    console.log('====================================');

    let newServices = appointmentServices?.map((s) => {
      if (s.id === appointmentService?.id) {
        return { ...s, start_at: date.format('YYYY-MM-DD HH:mm:ss') }
      }
      return s
    })
    if (newServices) {
      updateAppointmentServices(newServices)
      updateAppointment({
        ...appointment,
        services: newServices
      })
    }
  }



  const onAddAppointmenrServiceCustomer = (customer: CustomerType) => {
    console.log('====================================');
    console.log('customer:: ', customer);
    console.log('================================');

    if (customer) {
      updateAppointment({
        ...appointment,
        customer: customer
      })
      updateAppointment({
        ...appointment,
        customer: customer
      })
    }

  }

  const onShowAppointmentEmployeePress = (service: AppointmentServiceType) => {
    setSelectedService(service)
    setIsShowSelectEmployee(true)
  }

  return (
    <Flex gap={'small'} className='flex-col' >
      <Button
        type="dashed"
        size={'large'}
        className='flex flex-1 shadow-2'
        icon={<PlusCircleFilled />}
        onClick={() => setIsShowSelectCustomer(true)}
      >
        {appointment?.customer?.name || 'Select Customer'}
      </Button>
      <Divider orientation='left'>Thursday, 29 Aug 2024</Divider>
      <Flex className='flex-col' gap={10}>
        {
          appointmentServices?.map((service, index) => (
            <SelectServiceItem
              key={service.id}
              appointmentService={service}
              onDeleteServicePress={() => onDeleteServicePress(service)}
              onSelectEmployeePress={() => onShowAppointmentEmployeePress(service)}
              onChangeServiceTime={(date, datetime) => onUpdateAppointmentServiceTime(date, service)}
            />
          ))
        }
        <Button type='dashed' onClick={showSelectServiceDrawer} icon={<PlusCircleFilled />}>Add More Service</Button>
      </Flex>
      <SelectServiceDrawer
        isShow={isShowSelectService}
        onClose={() => setIsShowSelectService(false)}
      />
      <SelectEmployeeDrawer
        isShow={isShowSelectEmployee}
        onClose={() => setIsShowSelectEmployee(false)}
        onAddEmployee={onAddAppointmentServiceEmployee}
      />
      <SelectCustomerDrawer
        isShow={isShowSelectCustomer}
        onClose={() => setIsShowSelectCustomer(false)}
        onAddCustomer={onAddAppointmenrServiceCustomer}
      />
    </Flex>
  )
}

export default SetupAppointmentService