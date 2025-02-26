import { DayPilot } from "daypilot-pro-react";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
import { useBookingServiceStore, BookingServiceStore } from '@/store/useBookingServiceStore';
import dayjs from "dayjs";
interface UseResourceCalendar {

  // state
  view: string;
  startDate: DayPilot.Date;
  calendarBookingEvents: DayPilot.EventData[];
  selectedEvent: DayPilot.CalendarTimeRangeSelectedArgs | null;
  isShowAddBookingEvent: boolean;
  isShowUpdateBookingEvent: boolean;
  setIsShowUpdateBookingEvent: (show: boolean) => void;
  selectedUpdateEvent: DayPilot.EventData | null;
  setSelectedUpdateEvent: (event: DayPilot.EventData | null) => void;


  // actions
  setIsShowAddBookingEvent: (show: boolean) => void;
  onTimeRangeSelected: (args: any) => void;
  handleDateChange: (date: any) => void;
  handleNextDay: () => void;
  handlePreviousDay: () => void;
  handleToday: () => void;
  handleEventMove: (args: any) => void;
  handleEventResize: (args: any) => void;
  handleEventClick: (args: any) => void;
  getTechnicianColumns: () => DayPilot.CalendarColumnData[];
  onCalendarEventClick: (args: DayPilot.CalendarEventClickArgs) => void;
  getTransformedCalendarBookingEvents: DayPilot.EventData[];
}

export const useResourceCalendar = (): UseResourceCalendar => {

  const {
    calendarBookingEvents,
    salonBookings,
    salonBookingServices,
  } = useBookingServiceStore((state: BookingServiceStore) => state);

  const { salonTechnicians, salonServices } = useSalonStore((state: SalonState) => state);

  const [view, setView] = useState("Day");
  const [startDate, setStartDate] = useState(DayPilot.Date.today());
  const [selectedEvent, setSelectedEvent] = useState<DayPilot.CalendarTimeRangeSelectedArgs | null>(null);
  const [isShowAddBookingEvent, setIsShowAddBookingEvent] = useState<boolean>(false);
  const [isShowUpdateBookingEvent, setIsShowUpdateBookingEvent] = useState<boolean>(false);
  const [selectedUpdateEvent, setSelectedUpdateEvent] = useState<DayPilot.EventData | null>(null);

  const onTimeRangeSelected = (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
    console.log('Time range selected:', args)
    setSelectedEvent(args);
    setIsShowAddBookingEvent(true);
  };

  const handleDateChange = (date: any) => {
    const newDate = DayPilot.Date.fromYearMonthDay(
      date.year(),
      date.month() + 1,
      date.date()
    );
    setStartDate(newDate);
  };

  const handleNextDay = () => setStartDate(startDate.addDays(1));
  const handlePreviousDay = () => setStartDate(startDate.addDays(-1));
  const handleToday = () => setStartDate(DayPilot.Date.today());

  const handleEventMove = (args: DayPilot.CalendarEventMoveArgs) => {
    console.log('Event moved:', args);
  };

  const handleEventResize = (args: any) => {
    console.log('Event resized:', args);
  };

  const handleEventClick = (args: DayPilot.CalendarEventClickArgs) => {
    console.log('Event clicked:', args);
  };

  const handleUpdateBookingEvent = (event: DayPilot.EventData) => {
    console.log('Update booking event:', event);
    setIsShowUpdateBookingEvent(true);
  };

  const handleDeleteBookingEvent = (event: DayPilot.EventData) => {
    console.log('Delete booking event:', event);
  };

  const handleAddBookingEvent = (event: DayPilot.EventData) => {
    console.log('Add booking event:', event);
  };

  const onCalendarEventClick = (args: DayPilot.CalendarEventClickArgs) => {
    console.log('Calendar event clicked:', args);
    console.log('Event data:', args.e.data);
    setSelectedUpdateEvent(args.e.data);
    setIsShowUpdateBookingEvent(true);

  };

  const getTransformedCalendarBookingEvents = useMemo(() => {

    let bookingEvent: DayPilot.EventData[] = []


    salonBookings.forEach((booking) => {
      booking.booking_services.forEach((bookingService) => {
        bookingEvent.push({
          id: bookingService.id,
          text: "",
          start: new DayPilot.Date(bookingService?.start_at || ''),
          end: new DayPilot.Date(bookingService?.end_at || ''),
          backColor: "#ffd966", // Yellow background
          borderColor: "darker",
          cssClass: "event-with-areas",
          resource: bookingService.technician?.id || '',
          metadata: {
            booking_service: bookingService,
            booking: booking
          },
          areas: [
            {
              left: 0,
              text: `${dayjs(bookingService.start_at).format('HH:mm')} ~ ${dayjs(bookingService.end_at).format('HH:mm')}`,
              padding: 2,
              height: 20,
            },
            {
              right: 0,
              image: bookingService.is_requested ? "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png" : "",
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
              html: `<div style='font-size: 12px;font-weight:bold;'>${booking?.customer?.name || ''}</div>`,
              padding: 2,
              height: 20,
            },
            {
              left: 0,
              bottom: 0,
              top: 40,
              text: `${bookingService.service?.name}`,
              padding: 2,
              height: 20,
            }
          ]
        })
      })
    })
    return bookingEvent;
  }, [salonBookings])




  // transform technician columns to DayPilot.CalendarColumnData
  const getTechnicianColumns = useCallback(() => {
    const transformedColumns: DayPilot.CalendarColumnData[] = salonTechnicians.map((technician) => ({
      name: technician.name,
      id: technician.id,
      image: technician.avatar,
      tooltip: technician.name,
      data: technician,
      expandable: true,
    }));

    return transformedColumns;
  }, [salonTechnicians, salonServices]);

  return {
    view,
    startDate,
    calendarBookingEvents,
    selectedEvent,
    isShowAddBookingEvent,
    setIsShowAddBookingEvent,
    onTimeRangeSelected,
    handleDateChange,
    handleNextDay,
    handlePreviousDay,
    handleToday,
    handleEventMove,
    handleEventResize,
    handleEventClick,
    getTechnicianColumns,
    isShowUpdateBookingEvent,
    setIsShowUpdateBookingEvent,
    selectedUpdateEvent,
    setSelectedUpdateEvent,
    onCalendarEventClick,
    getTransformedCalendarBookingEvents
  };
};    
