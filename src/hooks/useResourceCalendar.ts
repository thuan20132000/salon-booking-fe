import { DayPilot } from "daypilot-pro-react";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSalonStore, SalonState } from '@/store/useSalonStore';
import { useBookingServiceStore, BookingServiceStore } from '@/store/useBookingServiceStore';
import { Day } from "react-big-calendar";
import { BookingService, Booking } from "@/interfaces/booking";
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
  handleCalendarEventMoved: (args: DayPilot.CalendarEventMovedArgs) => void;
  handleCalendarEventResize: (args: any) => void;
  handleCalendarEventClick: (args: DayPilot.CalendarEventClickArgs) => void;
  getTechnicianColumns: () => DayPilot.CalendarColumnData[];
  onCalendarEventClick: (args: DayPilot.CalendarEventClickArgs) => void;
  getTransformedCalendarBookingEvents: DayPilot.EventData[];
}

export const useResourceCalendar = (): UseResourceCalendar => {

  const {
    calendarBookingEvents,
    salonBookings,
    updateSelectedUpdateBooking,
    getCalendarBookings,
  } = useBookingServiceStore((state: BookingServiceStore) => state);

  const { salonEmployees, salonServices, selectedSalon } = useSalonStore((state: SalonState) => state);

  const [view, setView] = useState("Day");
  const [startDate, setStartDate] = useState(DayPilot.Date.today());
  const [selectedEvent, setSelectedEvent] = useState<DayPilot.CalendarTimeRangeSelectedArgs | null>(null);
  const [isShowAddBookingEvent, setIsShowAddBookingEvent] = useState<boolean>(false);
  const [isShowUpdateBookingEvent, setIsShowUpdateBookingEvent] = useState<boolean>(false);
  const [selectedUpdateEvent, setSelectedUpdateEvent] = useState<DayPilot.EventData | null>(null);

  const onTimeRangeSelected = (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
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

  const handleCalendarEventMoved = (args: DayPilot.CalendarEventMovedArgs) => {
    const { e, newStart, newEnd, newResource } = args;
    const booking: Booking = e.data.metadata?.booking;
    const bookingService: BookingService = e.data.metadata?.booking_service;

    const newTechnician = salonEmployees.find((employee) => employee.id === newResource);

    const newBookingService: BookingService = {
      ...bookingService,
      start_at: dayjs(newStart.toString()).format('YYYY-MM-DD HH:mm:ss'),
      end_at: dayjs(newEnd.toString()).format('YYYY-MM-DD HH:mm:ss'),
      employee: newTechnician || null,
    }

    const newBooking: Booking = {
      ...booking,
      booking_services: booking?.booking_services?.map((bs) => bs.id === bookingService.id ? newBookingService : bs),
    }

    updateSelectedUpdateBooking(newBooking);
  };

  const handleCalendarEventResize = (args: DayPilot.CalendarEventResizeArgs) => {
    console.log('Event resized:', args);
    const { e, newStart, newEnd } = args;
    const booking: Booking = e?.data?.metadata?.booking;
    const bookingService: BookingService = e?.data?.metadata?.booking_service;

    const newBookingService: BookingService = {
      ...bookingService,
      start_at: dayjs(newStart?.toString()).format('YYYY-MM-DD HH:mm:ss'),
      end_at: dayjs(newEnd?.toString()).format('YYYY-MM-DD HH:mm:ss'),
      duration: dayjs(newEnd?.toString()).diff(dayjs(newStart?.toString()), 'minutes'),
    }

    const newBooking: Booking = {
      ...booking,
      booking_services: booking?.booking_services?.map((bs) => bs.id === bookingService.id ? newBookingService : bs),
    }

    updateSelectedUpdateBooking(newBooking);


  };

  const handleCalendarEventClick = (args: DayPilot.CalendarEventClickArgs) => {
    setSelectedUpdateEvent(args.e.data);
    setIsShowUpdateBookingEvent(true);
  };


  const onCalendarEventClick = (args: DayPilot.CalendarEventClickArgs) => {
    setSelectedUpdateEvent(args.e.data);
    setIsShowUpdateBookingEvent(true);

  };

  const getTransformedCalendarBookingEvents = useMemo(() => {

    let bookingEvents: DayPilot.EventData[] = []


    salonBookings.forEach((booking) => {
      booking?.booking_services?.forEach((bookingService) => {
        // let start_at = dayjs(bookingService?.start_at || '').tz('UTC').format('YYYY-MM-DDTHH:mm:ss')
        // let end_at = dayjs(bookingService?.end_at || '').tz('UTC').format('YYYY-MM-DDTHH:mm:ss')

        let start_at = new DayPilot.Date(bookingService?.start_at || '')
        let end_at = new DayPilot.Date(bookingService?.end_at || '')


        bookingEvents.push({
          id: bookingService.id,
          text: "",
          start: start_at,
          end: end_at,
          backColor: "#ffd966", // Yellow background
          borderColor: "darker",
          resource: bookingService.employee?.id || '',
          metadata: {
            booking_service: bookingService,
            booking: booking
          },
          areas: [
            {
              left: 0,
              text: `${start_at.toString('HH:mm')} ~ ${end_at.toString('HH:mm')} #${booking.id}`,
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
              html: `<div style='font-size: 12px;font-weight:bold;'>${booking?.customer?.full_name || ''}</div>`,
              padding: 2,
              height: 20,
            },
            {
              left: 0,
              bottom: 0,
              top: 40,
              text: `${bookingService.service?.name}`,
              padding: 2,
            }
          ]
        })
      })
    })
    return bookingEvents;
  }, [salonBookings])




  // transform technician columns to DayPilot.CalendarColumnData
  const getTechnicianColumns = useCallback(() => {
    const transformedColumns: DayPilot.CalendarColumnData[] = salonEmployees.map((employee) => ({
      name: employee.nick_name || employee.name,
      id: employee.id,
      image: employee.avatar,
      tooltip: employee.nick_name || employee.name,
      data: employee,
      expandable: true,
    }));

    return transformedColumns;
  }, [salonEmployees, salonServices]);

  useEffect(() => {
    if (startDate) {
      const selectedDate = dayjs(startDate.toString()).format('YYYY-MM-DD');
      getCalendarBookings({
        salon_id: selectedSalon?.id,
        selected_date: selectedDate,
      });
    }
  }, [startDate]);

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
    handleCalendarEventMoved,
    handleCalendarEventResize,
    handleCalendarEventClick,
    getTechnicianColumns,
    isShowUpdateBookingEvent,
    setIsShowUpdateBookingEvent,
    selectedUpdateEvent,
    setSelectedUpdateEvent,
    onCalendarEventClick,
    getTransformedCalendarBookingEvents
  };
};    
