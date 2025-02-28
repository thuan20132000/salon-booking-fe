import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Select } from 'antd';
import { Employee } from '@/interfaces/salon';
import { SalonState, useSalonStore } from '@/store/useSalonStore';
import { SALON_EMPLOYEE_ROLE } from '@/constants/salon';

interface AddEmployeeModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isVisible,
  onClose,
}) => {

  const { addSalonEmployee } = useSalonStore((state: SalonState) => state);
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const employee = await addSalonEmployee(values);
      form.resetFields();
      onClose();
      message.success('Employee added successfully');
    } catch (error) {
      message.error('Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Employee"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="default"
          loading={loading}
          onClick={handleSubmit}
        >
          Add Employee
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="addEmployeeForm"
      >
       
        <Form.Item
          name="nick_name"
          label="Nick Name"
          rules={[{ required: true, message: 'Please enter nick name' }]}
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
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select role' }]}
        >
          <Select options={Object.values(SALON_EMPLOYEE_ROLE).map(role => ({ label: role, value: role }))} />
        </Form.Item>  
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: false, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
