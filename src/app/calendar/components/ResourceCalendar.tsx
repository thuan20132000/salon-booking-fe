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
import AddBookingEventModal from '@/components/Modals/AddBookingEventModal';
import { BookingServiceStore, useBookingServiceStore } from '@/store/useBookingServiceStore';


const ResourceCalendar = (props: any) => {
  const {
    calendarBookingEvents,

  } = useBookingServiceStore((state: BookingServiceStore) => state);

  const [isShowAddBookingEvent, setIsShowAddBookingEvent] = useState<boolean>(false);
  const [view, setView] = useState("Day");
  const [startDate, setStartDate] = useState(DayPilot.Date.today());
  const [events, setEvents] = useState<DayPilot.EventData[]>([]);

  const [technicianColumns, setTechnicianColumns] = useState<DayPilot.CalendarColumnData[]>([]);
  // const [bookingEvents, setBookingEvents] = useState<DayPilot.EventData[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<DayPilot.EventData | null>(null);

  const onTimeRangeSelected = async (args: any) => {
    setSelectedEvent(args);
    setIsShowAddBookingEvent(true);
  };

  useEffect(() => {

    const data: DayPilot.EventData[] = [
      {
        id: 1,
        text: "",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(11),
        resource: "A",
        backColor: "#ffd966", // Yellow background
        borderColor: "darker",
        cssClass: "event-with-areas",
        areas: [
          {
            left: 0,
            text: "9:00 ~ 10:00",
            padding: 2,
            height: 20,
          },
          {
            right: 0,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png",
            width: 20,
            height: 20,
            symbol: "circle",
            padding: 2,
            onClick: () => {
              console.log('clicked heart request');
            }
          },
          {
            left: 0,
            top: 20,
            html: "<div style='font-size: 12px;font-weight:bold;'>Lori</div>",
            padding: 2,
            height: 20,
          },
          {
            left: 0,
            bottom: 0,
            top: 40,
            text: "Pedicure with shellac",
            padding: 2,
            height: 20,
          }
        ]

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

    ];

    // setBookingEvents(data);

    const initialTechnicianColumns: DayPilot.CalendarColumnData[] = [
      { name: "Ethan", id: "A" },
      { name: "Jonathan", id: "B" },
      { name: "John", id: "C" },
      { name: "Jake", id: "D" },

    ]

    setTechnicianColumns(initialTechnicianColumns);

  }, []);


  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    let newDate = DayPilot.Date.fromYearMonthDay(date.year(), date.month() + 1, date.date());
    setStartDate(newDate);
  };


  console.log('calendarBookingEvents:: ', calendarBookingEvents);

  return (
    <div >
      <div className={"navigator"}>
        <Flex className='pb-4 bg-inherit'>
          <Flex flex={1}>
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

          <Flex flex={1}>
            <AddAppointment />
          </Flex>
        </Flex>

      </div>
      <DayPilotCalendar
        viewType={"Resources"}
        startDate={startDate}
        events={calendarBookingEvents}
        visible={view === "Day"}
        durationBarVisible={false}
        onTimeRangeSelected={onTimeRangeSelected}
        
        // controlRef={setDayView}
        columns={technicianColumns}
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

        // cellHeight={15}
        businessBeginsHour={9}
        businessEndsHour={17}

        timeFormat='Clock12Hours'

      />
      <AddBookingEventModal
        open={isShowAddBookingEvent}
        onCancel={() => setIsShowAddBookingEvent(false)}
        onSubmit={() => { }}
        eventData={selectedEvent}

      />
    </div>

  )

}


export default ResourceCalendar