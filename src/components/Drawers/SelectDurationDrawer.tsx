import { Drawer, Button, Input, Space, Typography } from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;

interface SelectDurationDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (duration: number) => void;
  initialDuration?: number;
}

// duration in steps of 30 minutes
const commonDurations = Array.from({ length: 6 }, (_, i) => (i + 1) * 30);

export function SelectDurationDrawer({
  open,
  onClose,
  onSelect,
  initialDuration,
}: SelectDurationDrawerProps) {
  const [customDuration, setCustomDuration] = useState<string>(
    initialDuration?.toString() || ''
  );

  const handleDurationSelect = (duration: number) => {
    onSelect(duration);
    onClose();
  };

  const handleCustomDurationSubmit = () => {
    const duration = parseInt(customDuration);
    if (duration > 0) {
      onSelect(duration);
      onClose();
    }
  };

  const formatDisplayDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  }

  return (
    <Drawer
      title="Select Duration"
      height={400}
      onClose={onClose}
      open={open}
    >
      <div className="flex flex-col gap-6">
        <div>
          <Title level={5}>Common Durations</Title>
          <Space wrap className="mt-2">
            {commonDurations.map((duration) => (
              <Button
                key={duration}
                onClick={() => handleDurationSelect(duration)}
                type="default"
              >
                {formatDisplayDuration(duration)}
              </Button>
            ))}
          </Space>
        </div>

        <div>
          <Title level={5}>Custom Duration</Title>
          <Space.Compact className="mt-2">
            <Input
              type="number"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              placeholder="Enter duration"
              min={1}
              style={{ width: '200px' }}
              addonAfter="minutes"
            />
            <Button type="default" onClick={handleCustomDurationSubmit}>
              Select
            </Button>
          </Space.Compact>
        </div>
      </div>
    </Drawer>
  );
}
