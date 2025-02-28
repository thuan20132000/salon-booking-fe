import { Modal, Form, Input, InputNumber, message } from 'antd';
import { Service } from '@/interfaces/salon';
import { useState, useEffect } from 'react';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
interface UpdateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const UpdateServiceModal = ({
  isOpen,
  onClose,
  service,
}: UpdateServiceModalProps) => {
  const {
    updateSalonService,
  } = useSalonStore((state: SalonState) => state);

  const [form] = Form.useForm<Service>();
    
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      form.resetFields();
      const updatedService: Service = {
        ...service,
        ...values,
      };

      await updateSalonService(updatedService);
      message.success('Service updated successfully');
      onClose();
    } catch (error) {
      message.error('Failed to update service');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (isOpen && service) {
      form.setFieldsValue(service);
    }
  }, [isOpen, service, form]);

  return (
    <Modal
      title="Update Service"
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okType='default'
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={service || {}}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Service Name"
          name="name"
          rules={[{ required: true, message: 'Please enter service name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter service description' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Duration (minutes)"
          name="duration"
          rules={[{ required: true, message: 'Please enter service duration' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter service price' }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            prefix="$"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateServiceModal;
