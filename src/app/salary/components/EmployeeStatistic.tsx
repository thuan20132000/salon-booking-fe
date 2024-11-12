import { EmployeePayrollStatisticsRequest } from '@/apis/payrollTurnAPI';
import { PayrollStore, usePayrollStore } from '@/store/usePayrollStore';
import { EmployeePayrollStatisticsResponse } from '@/types/payroll';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, DatePicker, Flex, Statistic } from 'antd';
import { Dayjs } from 'dayjs';
import * as React from 'react';

const { RangePicker } = DatePicker;

export interface IAppProps {
  monthlyTotal?: number;
  yearTotal?: number;
  selectedDate?: Dayjs;
  employeeId: string | null;
}

export default function EmployeeStatistic(props: IAppProps) {
  const { getEmployeePayrollStatistics } = usePayrollStore((state: PayrollStore) => state);
  const [payrollStatistic, setPayrollStatistic] = React.useState<EmployeePayrollStatisticsResponse>();

  const getStatisticDateLabel = () => {
    if (props.selectedDate) {
      return props.selectedDate.format('MMMM YYYY');
    }
    return 'Current Month';
  }

  const getPayrollStatistic = async (startDate: Dayjs, endDate: Dayjs) => {
    try {
      let params: EmployeePayrollStatisticsRequest = {
        employee: Number(props.employeeId),
        date_range_after: startDate.format('YYYY-MM-DD'),
        date_range_before: endDate.format('YYYY-MM-DD')
      }
      let data = await getEmployeePayrollStatistics(params);
      setPayrollStatistic(data);
    } catch (error) {
      throw error;
    }
  }

  const resetPayrollStatistic = () => {
    setPayrollStatistic(undefined);
  }

  const onChangeDateRange = (dates: any, dateString: any) => {
    try {
      let startDate = dates[0];
      let endDate = dates[1];

      getPayrollStatistic(startDate, endDate);

    } catch (error) {
      resetPayrollStatistic();
    }
  }

  return (
    <div className='mb-2'>
      <Flex>
        <Card className='flex-1'>
          <Statistic
            title={getStatisticDateLabel()}
            value={props.monthlyTotal}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            // prefix={<ArrowUpOutlined />}
            suffix="$"
          />
        </Card>
        <Card className='flex-1'>
          <RangePicker
            onChange={onChangeDateRange}
            style={{
              color: 'grey',
              marginBottom: 12
            }}
          />
          <Statistic
            // title="Total"
            value={payrollStatistic?.total_price}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            // prefix={<ArrowUpOutlined />}
            suffix="$"
          />

        </Card>
      </Flex>
    </div>
  );
}
