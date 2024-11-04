'use client';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import useAppointmentStore, { AppointmentStore } from "@/store/useAppointmentStore";
import AddAppointment from '@/app/appointments/components/AddAppointment';
import { Flex, Space, Tag } from 'antd';
import useAppointmentServiceStore, { AppointmentServiceStore } from '@/store/useAppointmentServiceStore';
import { useEffect, useState } from 'react';
import { AppointmentServiceType } from '@/types/appointment';
import { EventContentArg, EventInput, EventSourceInput } from '@fullcalendar/core';
import dayjs from 'dayjs';

const Calendar = () => {
  const { isShowAddAppointment, setShowAddAppointment, handleShowAddAppointment } = useAppointmentStore((state: AppointmentStore) => state);
  const {
    appointmentServices,
    getAppointmentServices
  } = useAppointmentServiceStore((state: AppointmentServiceStore) => state);

  const [calendarEvents, setCalendarEvents] = useState<EventSourceInput>()

  const events: EventSourceInput = [
    {
      title: 'Meeting',
      start: new Date(),
      end: new Date(),

    },
    {
      title: 'Meeting 2',
      start: new Date(),
      end: new Date(),
    },
    {
      title: 'Meeting 3',
      start: new Date(),
      end: new Date(),
    },
    {
      title: 'Meeting 4',
      data: "safas",
      start: new Date(),
      end: new Date(),
    }
  ]

  function renderEventContent(event: EventContentArg) {
    let appointmentService: AppointmentServiceType = event.event.extendedProps as AppointmentServiceType;
    console.log('====================================');
    console.log('appointmentService:: ', event);
    console.log('====================================');

    return (
      <Flex className='flex-wrap'>
        <Tag>{appointmentService.service?.name}</Tag>
        <Tag>{appointmentService.appointment?.customer?.name}</Tag>
        <Tag>{appointmentService.employee?.username}</Tag>
      </Flex>
    )
  }

  const showAddAppointment = (date: any) => {
    setShowAddAppointment(true);
  }

  const showAppointmentServiceDetail = (appointmentService: AppointmentServiceType) => {
    console.log('====================================');
    console.log('appointmentService:: ', appointmentService);
    console.log('====================================');
  }

  useEffect(() => {
    getAppointmentServices()
  }, [])

  useEffect(() => {
    let calendarEvents: EventSourceInput = appointmentServices.map((appointmentService) => {
      return {
        start: appointmentService.start_at,
        end: dayjs(appointmentService.start_at).add(Number(appointmentService.duration), 'minutes').toDate(),
        id: appointmentService.id,
        title: appointmentService.service?.name,
        extendedProps: {
          ...appointmentService,
        }

      }
    })
    setCalendarEvents(calendarEvents)
  }, [appointmentServices])


  return (
    <div className="mx-auto max-w-7xl">
      <Space className='flex justify-end'  >
        <AddAppointment />
      </Space>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimelinePlugin]}
        // initialView='dayGridMonth'
        weekends={true}
        events={calendarEvents}
        eventContent={renderEventContent}
        eventClick={(info) => showAppointmentServiceDetail(info.event.extendedProps)}
        eventMinHeight={30}
        eventClassNames={''}
        // eventBackgroundColor='coral'
        // eventClick={(info) => alert('Event: ' + info.event.title)}
        // eventChange={(info) => alert('Event: ' + info.event.title)}
        editable={true}
        eventStartEditable={true}
        droppable={true}
        initialView="timeGridDay"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        // eventAdd={(info) => alert('Event: ' + info.event.title)}
        dateClick={(date) => handleShowAddAppointment(date.date)}

        // resourceAßreaWidth={'15%'}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        nowIndicator={true}
        timeZone='UTC'
        slotDuration='00:30:00'
      />

    </div>
  );
};

export default Calendar;
