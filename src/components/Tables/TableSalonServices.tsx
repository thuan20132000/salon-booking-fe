import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
import { Service } from '@/interfaces/salon';
import AddServiceModal from '@/components/Modals/AddServiceModal';
import UpdateServiceModal from '@/components/Modals/UpdateServiceModal';

const TableSalonServices: React.FC = () => {
  const {
    salonServices,
    getSalonServices,
    deleteSalonService,
  } = useSalonStore((state: SalonState) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  // Fetch services data
  useEffect(() => {
    getSalonServices();
  }, []);

  const columns: ColumnsType<Service> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Duration (min)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {

    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsUpdateModalVisible(true);
  };

  const handleDelete = async (service: Service) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this service?',
      content: `This will permanently delete ${service.name}'s record.`,
      onOk: () => {
        deleteSalonService(service);
        message.success('Service deleted successfully');
      },
      okType: 'danger',
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
        Add Service
      </Button>

      <Table
        columns={columns}
        dataSource={salonServices}
        rowKey="id"
      />

      <AddServiceModal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <UpdateServiceModal
        isOpen={isUpdateModalVisible}
        onClose={() => {
          setIsUpdateModalVisible(false)
          setSelectedService(null)
        }}
        service={selectedService}
      />
    </div>
  );
};

export default TableSalonServices;
