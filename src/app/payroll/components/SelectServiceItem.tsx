import SelectServiceDrawer from '@/components/Drawers/SelectServiceDrawer';
import { AppointmentServiceType } from '@/types/appointment';
import { NailServiceType } from '@/types/service';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Input, Row, TimePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs';
import React from 'react'

type Props = {
  onSelectServicePress?: () => void;
  onSelectEmployeePress?: () => void;
  appointmentService?: AppointmentServiceType;
  onDeleteServicePress: () => void;
  onChangeServiceTime: (date: dayjs.Dayjs, dateString: string | string[]) => void;
}

const SelectServiceItem = (props: Props) => {



  return (
    <Card className='border-l-8 shadow-3'>
      <Flex className='flex-col' gap={10}>
        <Flex gap={4}>
          <Button
            className='flex-1'
          >
            {props.appointmentService?.service?.name}
          </Button>
          <Button className='flex-1' onClick={props.onSelectEmployeePress}> {props.appointmentService?.employee?.username} Select Employee</Button>
        </Flex>
        <Flex gap={4}>
          <TimePicker
            format='h:mm a'
            placeholder='Start Time'
            minuteStep={10}
            mode='time'
            needConfirm={false}
            use12Hours={true}
            title='Start Time'
            className='flex-1'
            onChange={props.onChangeServiceTime}
          />
          <Button className='flex-1'>{props.appointmentService?.duration || props.appointmentService?.service?.duration}</Button>
          <Input className='flex-1' placeholder="Price" value={props.appointmentService?.service?.price} />
        </Flex>
      </Flex>
      <Flex className='justify-end p-2'>
        <Button icon={<DeleteOutlined color='red' />} onClick={props.onDeleteServicePress} />
      </Flex>
    </Card>
  )
}

export default SelectServiceItem