'use client';
import moment from 'moment'
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotMonth,
  DayPilotNavigator,
  CalendarProps,
  NavigatorProps,
  GlobalDate,
} from "@daypilot/daypilot-lite-react";
import { useEffect, useState } from 'react';
import { Button, Card, DatePicker, Flex, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import AddAppointment from '@/app/appointments/components/AddAppointment';
import useAppointmentStore, { AppointmentStore } from '@/store/useAppointmentStore';



const MyCalendar = (props: any) => {
  const { isShowAddAppointment, setShowAddAppointment, appointment } = useAppointmentStore((state: AppointmentStore) => state);
  const [view, setView] = useState("Day");
  const [startDate, setStartDate] = useState(DayPilot.Date.today());
  const [events, setEvents] = useState<any>([]);

  const [dayView, setDayView] = useState();
  const [weekView, setWeekView] = useState();
  const [monthView, setMonthView] = useState();

  const onTimeRangeSelected = async (args: any) => {
    // const dp = args.control;
    // const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
    // dp.clearSelection();
    // if (modal.canceled) {
    //   return;
    // }
    // const e = {
    //   start: args.start,
    //   end: args.end,
    //   text: modal.result,
    //   resource: args.resource,
    // };
    // setEvents([...events, e]);
    // console.log('selected time range:: ', args);

    setShowAddAppointment(true);

  };

  useEffect(() => {

    const data = [
      {
        id: 1,
        text: "Event 1",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(11),
        resource: "A",
      },
      {
        id: 2,
        text: "Event 2",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(12),
        backColor: "#93c47d",
        borderColor: "darker",
        resource: "B"
      },
      {
        id: 9,
        text: "Event 9",
        start: DayPilot.Date.today().addHours(13),
        end: DayPilot.Date.today().addHours(15),
        backColor: "#76a5af", // Teal background
        borderColor: "darker",
        resource: "B"
      },
      {
        id: 3,
        text: "Event 3",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(11),
        backColor: "#ffd966", // Yellow background
        borderColor: "darker",
        resource: "A",

      },
      {
        id: 4,
        text: "Event 4",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(11),
        backColor: "#f6b26b", // Orange background
        borderColor: "darker",
        resource: "A"
      },

      {
        id: 7,
        text: "Event 7",
        start: DayPilot.Date.today().addDays(1).addHours(14),
        end: DayPilot.Date.today().addDays(1).addHours(16),
        backColor: "#e691b8", // Pink background
        borderColor: "darker"
      },
      {
        id: 5,
        text: "Event 5",
        start: DayPilot.Date.today().addDays(4).addHours(9),
        end: DayPilot.Date.today().addDays(4).addHours(11),
        backColor: "#8e7cc3", // Purple background
        borderColor: "darker"
      },
      {
        id: 6,
        text: "Event 6",
        start: DayPilot.Date.today().addDays(4).addHours(13),
        end: DayPilot.Date.today().addDays(4).addHours(15),
        backColor: "#6fa8dc", // Light Blue background
        borderColor: "darker",
        resource: "C"
      },

      {
        id: 8,
        text: "Event 8",
        start: DayPilot.Date.today().addDays(5).addHours(13),
        end: DayPilot.Date.today().addDays(5).addHours(15),
        backColor: "#b6d7a8", // Light Green background
        borderColor: "darker",
        resource: "D"
      },

    ];

    setEvents(data);

  }, []);

  const renderColumns = () => {
    return [
      { name: "Room A", id: "A", image: "../helpers/img/pat-yellow.jpg" },
      { name: "Room B", id: "B", image: "../helpers/img/pat-blue.jpg" },
      { name: "Room C", id: "C", image: "../helpers/img/pat-orange.jpg" },
      { name: "Room D", id: "D", image: "../helpers/img/pat-red.jpg" },
      {
        name: "Room E",
        id: "E",
        image: "../helpers/img/pat-green.jpg",

      }
    ];
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    let newDate = DayPilot.Date.fromYearMonthDay(date.year(), date.month() + 1, date.date());
    setStartDate(newDate);
  };



  return (
    <div >
      <div className={"navigator"}>
        <Flex className='pb-4 bg-inherit'>

          <Flex className='mr-8'>
            <Button onClick={() => setStartDate(DayPilot.Date.today())}>Today</Button>
          </Flex>

          {/* previous date */}
          <Flex className='mr-0'>
            <Button onClick={() => setStartDate(startDate.addDays(-1))}>Previous</Button>
          </Flex>
          <Flex className='ml-2 mr-2'>
            <DatePicker
              onChange={onChange}
              value={dayjs(startDate.toString())}
            />
          </Flex>
          {/* next date */}
          <Flex className='mr-0'>
            <Button onClick={() => setStartDate(startDate.addDays(1))}>Next</Button>

          </Flex>

        </Flex>

      </div>
      <DayPilotCalendar
        viewType={"Resources"}
        startDate={startDate}
        events={events}
        visible={view === "Day"}
        durationBarVisible={false}
        onTimeRangeSelected={onTimeRangeSelected}

        // controlRef={setDayView}
        columns={renderColumns()}
        headerHeight={90}
        // onTimeRangeSelect={async (args) => {
        //   console.log('====================================');
        //   console.log('onTimeRangeSelect:: ', args);
        //   console.log('====================================');
        // }}
        onEventMoved={async (args) => {
          console.log('====================================');
          console.log('args:: ', args);
          console.log('====================================');

        }}
        onEventResized={async (args) => {
          console.log('====================================');
          console.log('resized:: ', args);
          console.log('====================================');
        }
        }
        onEventClick={async (args) => {
          console.log('====================================');
          console.log('args:: ', args);
          console.log('====================================');
        }
        }

      />
      <AddAppointment />
    </div>

  )

}


export default MyCalendar