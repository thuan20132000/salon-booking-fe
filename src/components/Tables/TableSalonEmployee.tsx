import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Input, Modal, Form, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Customer, Employee } from '@/interfaces/salon';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
import AddEmployeeModal from '@/components/Modals/AddEmployeeModal';
import UpdateEmployeeModal from '@/components/Modals/UpdateEmployeeModal';

const TableSalonEmployee: React.FC = () => {

  const {
    salonEmployees,
    getSalonEmployees,
    deleteSalonEmployee,
  } = useSalonStore((state: SalonState) => state);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    getSalonEmployees();
    console.log(salonEmployees);
  }, []);


  const handleAdd = () => {
    setEditingEmployee(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Employee) => {
    setSelectedEmployee(record);
    setIsUpdateModalVisible(true);
  };

  const handleDelete = (employee: Employee) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this employee?',
      content: `This will permanently delete ${employee.nick_name}'s record.`,
      onOk: () => {
        deleteSalonEmployee(employee);
        message.success('Employee deleted successfully');
      },
      okType: 'danger',
    });
  };




  const columns: ColumnsType<Employee> = [
    {
      title: 'Nickname',
      dataIndex: 'nick_name',
      key: 'nick_name',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => avatar ? <img src={avatar} alt="avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} /> : null,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="default"
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

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="default" onClick={handleAdd}>
          Add Employee
        </Button>
        {/* <Input
          placeholder="Search employees..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
        /> */}
      </Space>

      <Table
        columns={columns}
        dataSource={salonEmployees}
        loading={loading}
        rowKey="id"
      />

      <AddEmployeeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      <UpdateEmployeeModal
        open={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default TableSalonEmployee;
