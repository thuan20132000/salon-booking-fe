import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { Customer } from '@/interfaces/salon';
import { useSalonStore, SalonState } from '@/store/useSalonStore';

interface UpdateCustomerModalProps {
  isVisible: boolean;
  onClose: () => void;
  customer: Customer | null;
}

const UpdateCustomerModal: React.FC<UpdateCustomerModalProps> = ({
  isVisible,
  onClose,
  customer,
}) => {
  const [form] = Form.useForm();
  const {
    updateSalonCustomer,
  } = useSalonStore((state: SalonState) => state);

  useEffect(() => {
    if (isVisible && customer) {
      form.setFieldsValue(customer);
    }
  }, [isVisible, customer, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedCustomer = await updateSalonCustomer({ ...customer, ...values });
      form.resetFields();
      message.success('Customer updated successfully');

      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Validation failed');
    }
  };

  return (
    <Modal
      title="Update Customer"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="default" onClick={handleSubmit}>
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={customer || undefined}
      >
        <Form.Item
          name="full_name"
          label="Name"
          rules={[{ required: true, message: 'Please input customer name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: false, message: 'Please input customer email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone"
          rules={[{ required: false, message: 'Please input customer phone!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: false, message: 'Please input customer address!' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCustomerModal;
