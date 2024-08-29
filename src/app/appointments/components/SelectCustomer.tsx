import { PlusCircleFilled } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import React, { useState } from 'react'

type Props = {}

const SelectCustomer = (props: Props) => {

  return (
    <Flex gap="small" >
      <Button type="dashed" size={'large'} className='flex flex-1 shadow-2' icon={<PlusCircleFilled/>}>
        Add Customer
      </Button>
    </Flex>
  )
}

export default SelectCustomer