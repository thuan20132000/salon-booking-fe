import { FC } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import { Customer } from '@/interfaces/salon';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCustomerModal: FC<AddCustomerModalProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const {
    addSalonCustomer,
  } = useSalonStore((state: SalonState) => state);
  const handleSubmit = async () => {

    try {
      const values = await form.validateFields();
      const customer: Customer = {
        ...values,
        id: Date.now().toString(),
        total_visits: 0,
        last_visit: new Date().toISOString().split('T')[0],
      };

      const newCustomer = await addSalonCustomer(customer);
      form.resetFields();
      message.success('Customer added successfully');
      onClose();
    } catch (error) {
      message.error('Validation failed');
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Add New Customer"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="default" onClick={handleSubmit}>
          Add Customer
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="full_name"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter full name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="birth_date"
          label="Birth Date"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;
