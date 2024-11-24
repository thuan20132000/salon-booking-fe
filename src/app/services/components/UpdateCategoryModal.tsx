import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, Spin } from 'antd';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { createSalonCategoryInputType, updateSalonCategoryInputType } from '@/apis/serviceAPI';
import useAuthenticationStore, { AuthenticationState } from '@/store/useAuthenticationStore';
import { NailServiceCategoryType } from '@/types/service';

type Props = {
  isShow: boolean;
  onClose: () => void;
  category?: NailServiceCategoryType
};

const UpdateCategoryModal: React.FC<Props> = (props) => {
  // const [isModalOpen, setIsModalOpen] = useState(props);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { updateSalonCategory } = useServiceStore((state: ServiceStore) => state);
  const { user } = useAuthenticationStore((state: AuthenticationState) => state);

  const handleFinish = async (values: any) => {

    try {
      setIsLoading(true);
      const inputData: updateSalonCategoryInputType = {
        name: values.name,
        description: values.description,
        salon_id: Number(user?.id),
        id: Number(props.category?.id)
      }

      if (updateSalonCategory) {
        await updateSalonCategory(inputData);
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


  useEffect(() => {
    if(props.category){
      form.setFieldsValue({
        name: props.category.name,
        description: props.category.description
      })
    }
  }, [props.category])

  return (
    <>
      <Modal
        title="Update category" open={props.isShow} onCancel={props.onClose}
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
                Update
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCategoryModal;