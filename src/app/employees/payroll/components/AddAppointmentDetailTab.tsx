import React from 'react';
import SetupAppointmentService from './SetupAppointmentService';
import { Flex } from 'antd';

// import { Container } from './styles';

const AddAppointmentDetailTab: React.FC = () => {
  return (
    <Flex flex={1} className='flex-col' gap={16}>
      <SetupAppointmentService />
    </Flex>
  );
}

export default AddAppointmentDetailTab;