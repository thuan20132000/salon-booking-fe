import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Customer } from '@/interfaces/salon';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
import AddCustomerModal from '@/components/Modals/AddCustomerModal';

const TableSalonCustomer: React.FC = () => {
  const {
    salonCustomers,
    addSalonCustomer,
    getSalonCustomers,
  } = useSalonStore((state: SalonState) => state);

  // const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

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
          // const newCustomer = {
          //   ...values,
          //   id: Date.now().toString(),
          //   total_visits: 0,
          //   last_visit: new Date().toISOString().split('T')[0],
          // };
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

  useEffect(() => {
    getSalonCustomers();
    console.log('salonCustomers:: ', salonCustomers);
  }, []);

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

      <AddCustomerModal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleModalOk}
      />
    </div>
  );
};

export default TableSalonCustomer;
