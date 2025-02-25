import React, { useState } from 'react';
import { Drawer, Radio, Input, Space, Button, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

const { Text } = Typography;

interface SelectServicePriceDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (price: number) => void;
}

const commonPrices = [
  { label: '$50', value: 50 },
  { label: '$100', value: 100 },
  { label: '$150', value: 150 },
  { label: '$200', value: 200 },
];

const SelectServicePriceDrawer: React.FC<SelectServicePriceDrawerProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [selectedPrice, setSelectedPrice] = useState<number | 'custom'>(commonPrices[0].value);
  const [customPrice, setCustomPrice] = useState<string>('');

  const handlePriceChange = (e: RadioChangeEvent) => {
    setSelectedPrice(e.target.value);
  };

  const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    setCustomPrice(value);
    setSelectedPrice('custom');
  };

  const handleSubmit = () => {
    const finalPrice = selectedPrice === 'custom' ? parseFloat(customPrice) : selectedPrice;
    if (!isNaN(finalPrice) && finalPrice > 0) {
      onSubmit(finalPrice);
      onClose();
    }
  };

  return (
    <Drawer
      title="Select Service Price"
      placement="right"
      onClose={onClose}
      open={open}
      width={320}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Radio.Group value={selectedPrice} onChange={handlePriceChange}>
          <Space direction="vertical">
            {commonPrices.map((price) => (
              <Radio key={price.value} value={price.value}>
                {price.label}
              </Radio>
            ))}
            <Radio value="custom">Custom Price</Radio>
          </Space>
        </Radio.Group>

        {selectedPrice === 'custom' && (
          <div>
            <Text>Enter custom price:</Text>
            <Input
              prefix="$"
              value={customPrice}
              onChange={handleCustomPriceChange}
              placeholder="Enter amount"
              style={{ marginTop: 8 }}
            />
          </div>
        )}
      </Space>

      <Space 
        direction="horizontal" 
        className='w-full mt-4'
      >
        <Button onClick={onClose} className='mr-2'>
          Cancel
        </Button>
          <Button
            type="default"
            onClick={handleSubmit}
            disabled={selectedPrice === 'custom' && (!customPrice || isNaN(parseFloat(customPrice)))}
          >
            Confirm
        </Button>
      </Space>
    </Drawer>
  );
};

export default SelectServicePriceDrawer;
