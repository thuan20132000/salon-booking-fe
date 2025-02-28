import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { Employee } from '@/interfaces/salon';
import { SALON_EMPLOYEE_ROLE } from '@/constants/salon';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
interface UpdateEmployeeModalProps {
  open: boolean;
  onCancel: () => void;
  employee?: Employee | null;
}

const UpdateEmployeeModal: React.FC<UpdateEmployeeModalProps> = ({
  open,
  onCancel,
  employee,
}) => {
  const { updateSalonEmployee } = useSalonStore((state: SalonState) => state);
  const [form] = Form.useForm<Employee>();

  useEffect(() => {
    if (open && employee) {
      form.setFieldsValue({
        ...employee,
      });
    }
  }, [open, employee, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      form.resetFields();
      await updateSalonEmployee({ ...values, id: employee?.id });
      onCancel();
      message.success('Employee updated successfully');
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Failed to update employee');
    }
  };

  return (
    <Modal
      title="Update Employee"
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      destroyOnClose
      okType='default'
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={employee || undefined}
      >
        <Form.Item
          name="nick_name"
          label="Nick Name"
          rules={[{ required: true, message: 'Please enter employee nick name' }]}
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
          rules={[
            { required: false, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select>
            {Object.values(SALON_EMPLOYEE_ROLE).map(role => (
              <Select.Option key={role} value={role}>{role}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateEmployeeModal;
