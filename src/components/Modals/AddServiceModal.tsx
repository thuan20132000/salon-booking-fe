import { Modal, Form, Input, InputNumber, message } from 'antd';
import { Service } from '@/interfaces/salon';
import { useState } from 'react';
import { generateTimestampNumber } from '@/utils/helpers';
import { useSalonStore, SalonState } from '@/store/useSalonStore';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    addSalonService,
  } = useSalonStore((state: SalonState) => state);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const newService: Service = {
        id: generateTimestampNumber(),
        name: values.name,
        description: values.description,
        duration: values.duration,
        price: values.price,
      };

      await addSalonService(newService);

      form.resetFields();
      onClose();
      message.success('Service added successfully');
    } catch (error) {
      message.error('Failed to add service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Service"
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okType='default'
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        name="addServiceForm"
      >
        <Form.Item
          name="name"
          label="Service Name"
          rules={[{ required: true, message: 'Please enter service name' }]}
        >
          <Input placeholder="Enter service name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: false, message: 'Please enter service description' }]}
        >
          <Input.TextArea placeholder="Enter service description" />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration (minutes)"
          rules={[{ required: true, message: 'Please enter service duration' }]}
        >
          <InputNumber
            min={1}
            placeholder="Enter duration in minutes"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter service price' }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            precision={2}
            prefix="$"
            placeholder="Enter service price"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddServiceModal;
