import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Customer } from '@/interfaces/salon';
import { customerAPI } from '@/apis/customerAPI';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
const TableSalonCustomer: React.FC = () => {
  const {
    salonCustomers
  } = useSalonStore((state: SalonState) => state);

  // const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulated data fetch
      const mockData: Customer[] = [
      {
        id: '1',
        full_name: 'John Doe',
        phone_number: '123-456-7890',
        email: 'john@example.com',
        last_visit: '2024-03-15',
        total_visits: 5,
      },
      // Add more mock data as needed
    ];
    // setCustomers(mockData);
  }, []);

  const columns: ColumnsType<Customer> = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingCustomer(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setIsModalVisible(true);
  };

    const handleDelete = (customer: Customer) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this customer?',
      content: `This will permanently delete ${customer.full_name}'s record.`,
      onOk: () => {
        // setCustomers(customers.filter(c => c.id !== customer.id));
        message.success('Customer deleted successfully');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields()
      .then(values => {
        if (editingCustomer) {
          // Update existing customer
          // setCustomers(customers.map(c =>
          //   c.id === editingCustomer.id ? { ...c, ...values } : c
          // ));
          message.success('Customer updated successfully');
        } else {
          // Add new customer
          const newCustomer = {
            ...values,
            id: Date.now().toString(),
            total_visits: 0,
            last_visit: new Date().toISOString().split('T')[0],
          };
          // setCustomers([...customers, newCustomer]);
          message.success('Customer added successfully');
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <div>
      <Button
        type="default"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add Customer
      </Button>


      <Table
        columns={columns}
        dataSource={salonCustomers}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="full_name"
            label="Name"
            rules={[{ required: true, message: 'Please input customer name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone"
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableSalonCustomer;
