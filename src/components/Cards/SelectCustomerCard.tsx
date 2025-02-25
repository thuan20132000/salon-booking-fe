import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Card } from 'antd';

interface SelectCustomerCardProps {
  onClick?: () => void;
}

export function SelectCustomerCard({ onClick }: SelectCustomerCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:bg-gray-50"
      bodyStyle={{ padding: '16px' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserOutlined className="text-lg text-gray-500" />
          <span className="text-gray-900 font-medium">Select customer</span>
        </div>
        <PlusOutlined className="text-lg text-gray-500" />
      </div>
    </Card>
  );
}
