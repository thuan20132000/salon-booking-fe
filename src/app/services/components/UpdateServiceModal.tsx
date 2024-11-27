import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Form, Input, Modal, Select, SelectProps, TimePicker } from 'antd';
import { ServiceStore, useServiceStore } from '@/store/useServiceStore';
import { addSalonServiceInputType, createSalonCategoryInputType, updateSalonCategoryInputType, updateSalonServiceInputType } from '@/apis/serviceAPI';
import useAuthenticationStore, { AuthenticationState } from '@/store/useAuthenticationStore';
import { NailServiceCategoryType, NailServiceType } from '@/types/service';

type Props = {
  isShow: boolean;
  onClose: () => void;
  category?: NailServiceCategoryType;
  service?: NailServiceType
};

const UpdateServiceModal: React.FC<Props> = (props) => {
  // const [isModalOpen, setIsModalOpen] = useState(props);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { updateSalonService } = useServiceStore((state: ServiceStore) => state);
  const { user } = useAuthenticationStore((state: AuthenticationState) => state);

  const handleFinish = async (values: any) => {
    console.log('values:: ', values);
    console.log('props.category:: ', props.category);

    try {
      setIsLoading(true);
      const inputData: updateSalonServiceInputType = {
        name: values.name,
        price: values.price,
        duration: values.duration,
        description: values.description,
        salon_id: Number(user?.id),
        service_id: Number(props.service?.id)
      }
      console.log('inputData:: ', inputData);

      if (updateSalonService) {
        await updateSalonService(inputData);
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

  const getDurationOptions = () => {
    // const options = [];
    const options: SelectProps['options'] = [];
    // generate value from 5 mins to 5 hours
    for (let i = 5; i <= 300; i += 5) {
      // format duration in hours if it is more than 60 minutes
      const hours = Math.floor(i / 60);
      const mins = i % 60;

      const hour_string = hours > 0 ? `${hours}` : '0';
      const min_string = mins > 0 ? `${mins}` : '00';

      const duration_formatted = `${hour_string}:${min_string}`;

      options.push({ value: i, label: duration_formatted });
    }

    return options;
  }

  const onAddService = () => {
    // handleVisibleCategory(0);
  }

  useEffect(() => {
    if (props.service) {
      form.setFieldsValue({
        name: props.service.name,
        price: props.service.price,
        duration: props.service.duration,
        description: props.service.description
      })
    }
  }, [props.service, form])

  return (
    <>
      <Modal
        title="Update Service" open={props.isShow} onCancel={props.onClose}
        footer={null}
      >

        <Form form={form} onFinish={handleFinish} layout='vertical'
        // className='pt-6'
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the service name!' }]}
          >
            <Input />
          </Form.Item>
          <Flex flex={1} justify='space-between'>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input the service price!' }]}
              // style={{ display: 'inline-block', width: 'calc(45% - 8px)' }}
              className='flex-1'
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: 'Please input the service duration!' }]}
              className='flex-1 ml-2'
            >
              <Select
                options={getDurationOptions()}
              />
            </Form.Item>
          </Flex>

          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please input the service category!' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item >
            <Button htmlType="submit" loading={isLoading} >
              Update Service
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateServiceModal;