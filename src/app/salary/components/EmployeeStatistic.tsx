import { EmployeePayrollStatisticsRequest } from '@/apis/payrollTurnAPI';
import { PayrollStore, usePayrollStore } from '@/store/usePayrollStore';
import { EmployeePayrollStatisticsResponse } from '@/types/payroll';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Flex, Statistic } from 'antd';
import { Dayjs } from 'dayjs';
import * as React from 'react';
import CreatPayslipsDrawer from './CreatPayslipsDrawer';
import { salaryAPI } from '@/apis/salaryAPI';
import { NotificationStore, useNotificationStore } from '@/store/useNotificationStore';

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
  const { notify } = useNotificationStore((state: NotificationStore) => state)

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

  const createPayslip = async () => {
    try {
      console.log('create payslip');
      const res = await salaryAPI.createPayslips({
        employee: Number(props.employeeId),
        pay_period_start: payrollStatistic?.date_range_after,
        pay_period_end: payrollStatistic?.date_range_before,
      });
      notify('success', 'Payslip created successfully');
      console.log('payslip created:: ', res);


    } catch (error) {
      console.error('Error creating payslip:', error);
      notify('error', 'Error creating payslip');
    }
  }

  return (
    <div className='mb-2'>
      <Flex>
        <Card className='flex-2'>
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
          <Flex flex={1} justify='space-between'>
            <RangePicker
              onChange={onChangeDateRange}
              style={{
                color: 'grey',
                marginBottom: 12
              }}
            />
            {/* <Button onClick={createPayslip}>Create Payslip</Button> */}
            {/* <CreatPayslipsDrawer
              payrollStatistics={payrollStatistic}
            /> */}
          </Flex>
          <Statistic
            // title="Total"
            value={payrollStatistic?.total_price}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            // prefix={<ArrowUpOutlined />}
            suffix="$"
          />

        </Card>
        {/* <Card>
        </Card> */}
      </Flex>
    </div>
  );
}
