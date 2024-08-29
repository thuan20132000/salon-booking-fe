import React from 'react';
import SelectCustomer from './SelectCustomer';
import SelectServices from './SelectServices';
import { Flex } from 'antd';

// import { Container } from './styles';

const AddAppointmentDetailTab: React.FC = () => {
  return (
    <Flex flex={1} className='flex-col' gap={16}>
      <SelectCustomer />
      <SelectServices />
    </Flex>
  );
}

export default AddAppointmentDetailTab;