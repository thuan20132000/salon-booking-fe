import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, Flex, Statistic } from 'antd';
import * as React from 'react';

export interface IAppProps {
  monthlyTotal?: number;
  yearTotal?: number;
}

export default function EmployeeStatistic(props: IAppProps) {
  return (
    <div className='mb-2'>
      <Flex>
        {/* <Card className='flex-1'>
          <Statistic
            title="Total"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card> */}
        <Card className='flex-1'>
          <Statistic
            title="Month"
            value={props.monthlyTotal}
            // precision={2}
            valueStyle={{ color: '#3f8600' }}
            // prefix={<ArrowUpOutlined />}
            suffix="$"
          />
        </Card>
      </Flex>
    </div>
  );
}
