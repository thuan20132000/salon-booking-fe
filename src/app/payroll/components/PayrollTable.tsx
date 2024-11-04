'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputNumberProps, InputRef, StatisticProps, TableProps } from 'antd';
import { Button, Col, DatePicker, Flex, Form, Input, InputNumber, Popconfirm, Row, Space, Statistic, Table, Typography } from 'antd';
import dayjs from 'dayjs';
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  turn: number;
  service: string;
  price: number;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  turn?: number;
  service: string;
  price: number;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const generateData = (): DataType[] => {
  const services = [''];

  return Array.from({ length: 20 }, (_, index) => ({
    key: index, // You can use a unique key generator as per your requirement
    turn: index + 1,
    service: services[index % services.length], // Cycling through services
    price: 0 // Random price between 10 and 109
  }));
};
const DEFAULT_TURN: DataType[] = generateData()

const PayrollTable: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [total, setTotal] = useState(0);
  const dateFormat = 'YYYY/MM/DD';


  const [dataSource, setDataSource] = useState<DataType[]>(DEFAULT_TURN);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'turn',
      dataIndex: 'turn',
      width: '30%',
      render: (_, record) => <a href="">{Number(record.key) + 1}</a>
    },
    {
      title: 'service',
      dataIndex: 'service',
      editable: true
    },
    {
      title: 'price',
      dataIndex: 'price',
      editable: true,
      width: '30%'
    },
    // {
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   render: (_, record) =>
    //     dataSource.length >= 1 ? (
    //       <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //         <a>Delete</a>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      service: '32',
      price: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    console.log('====================================');
    console.log('newdata: ', newData);
    console.log('====================================');
    let total = 0
    total = newData?.map((e) => Number(e.price)).reduce((prev, cur) => Number(prev) + Number(cur), 0)
    setTotal(total)
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });


  return (
    <Form form={form} component={false}>
      <Flex className='mb-2'>
        <Flex>
          <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} />
          <Statistic
            value={total}
            title='Total: '
            style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 20 }}
            valueStyle={{ paddingLeft: 10 }}
          />
        </Flex>
        <Flex>
          <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a row
          </Button>
        </Flex>
      </Flex>
      <Table<DataType>
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
    </Form>
  );
};

export default PayrollTable;