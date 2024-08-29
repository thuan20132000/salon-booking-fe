import { Button, Divider, Flex } from 'antd'
import React, { useState } from 'react'
import SelectServiceItem from './SelectServiceItem'
import { PlusCircleFilled } from '@ant-design/icons'

type Props = {}

const SelectServices = (props: Props) => {

  return (
    <Flex gap={'small'} className='flex-col' >
      <Divider orientation='left'>Thursday, 29 Aug 2024</Divider>
      <Flex className='flex-col' gap={10}>
        <SelectServiceItem />
        <SelectServiceItem />
        <Button type='dashed' icon={<PlusCircleFilled/>}>Add More Service</Button>
      </Flex>

    </Flex>
  )
}

export default SelectServices