import { Button, Card, Flex, Input, Row, TimePicker } from 'antd'
import React from 'react'

type Props = {}

const SelectServiceItem = (props: Props) => {
  return (
    <Card className='border-l-8 shadow-3'>
      <Flex className='flex-col' gap={10}>
        <Flex gap={4}>
          <Button className='flex-1'>Select Service</Button>
          <Button className='flex-1'>Select Staff</Button>
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
          />
          <Button className='flex-1'>Select Duration</Button>
          <Input className='flex-1' placeholder="Price" />
        </Flex>
      </Flex>
    </Card>
  )
}

export default SelectServiceItem