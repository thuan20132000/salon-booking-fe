import React, { useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, Spin } from 'antd';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { createSalonCategoryInputType } from '@/apis/serviceAPI';
import useAuthenticationStore, { AuthenticationState } from '@/store/useAuthenticationStore';

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddCategoryModal: React.FC<Props> = (props) => {
  // const [isModalOpen, setIsModalOpen] = useState(props);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { createSalonCategory } = useServiceStore((state: ServiceStore) => state);
  const { user } = useAuthenticationStore((state: AuthenticationState) => state);

  const handleFinish = async (values: any) => {

    try {
      setIsLoading(true);
      const inputData: createSalonCategoryInputType = {
        name: values.name,
        description: values.description,
        salon_id: Number(user?.id)
      }

      if (createSalonCategory) {
        await createSalonCategory(inputData);
      }
      
      form.resetFields();

    } catch (error) {
      console.log('====================================');
      console.log('error:: ', error);
      console.log('====================================');
    } finally {
      setIsLoading(false);
      props.onClose();
    }
  };
 

  return (
    <>
      <Modal
        title="Add category" open={props.isShow} onCancel={props.onClose}
        footer={null}
      >

        <Form form={form} onFinish={handleFinish} layout='vertical'
          className='pt-6'
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <Input />
          </Form.Item>
          <Form.Item className='pt-6'>
            <Flex justify='space-around'>
              <Button onClick={props.onClose} className='w-40 bg-blue-400 text-white'>
                Cancel
              </Button>
              <Button htmlType="submit" className='w-40 bg-blue-400 text-white'
                loading={isLoading}
              >
                Add
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;