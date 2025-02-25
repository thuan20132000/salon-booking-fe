import React from 'react';
import { Card, Avatar, Typography, Button } from 'antd';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface CustomerCardProps {
  name: string;
  phoneNumber: string;
  avatarUrl?: string;
  onClose?: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({
  name,
  phoneNumber,
  avatarUrl,
  onClose,
}) => {
  return (
    <Card 
      bodyStyle={{ padding: 16 }}
      style={{ width: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Avatar
            size={48}
            src={avatarUrl}
            icon={!avatarUrl && <UserOutlined />}
          />
          <div>
            <Title level={5} style={{ margin: 0 }}>{name}</Title>
            <Text type="secondary">{phoneNumber}</Text>
          </div>
        </div>
        
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={onClose}
          aria-label="Close"
        />
      </div>
    </Card>
  );
};

export default CustomerCard;
