import React from 'react';
import { Card } from 'antd';
import { ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';

interface SalonServiceProps {
    serviceName: string;
    duration: number; // duration in minutes
    price: number;
    isSelected?: boolean;
    onSelect?: () => void;
}

const SalonServiceCard: React.FC<SalonServiceProps> = ({
    serviceName,
    duration,
    price,
    isSelected = false,
    onSelect,
}) => {
    return (
        <Card
            hoverable
            onClick={onSelect}
            style={{
                width: '100%',
                marginBottom: 16,
                borderColor: isSelected ? '#1890ff' : undefined,
                backgroundColor: isSelected ? '#e6f7ff' : undefined,
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: 0 }}>{serviceName}</h3>
                    <div style={{ color: '#666', marginTop: 8 }}>
                        <ClockCircleOutlined /> {duration} mins
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#1890ff' }}>
                        <DollarOutlined /> {price}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SalonServiceCard;
