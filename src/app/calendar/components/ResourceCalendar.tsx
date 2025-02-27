'use client';
import {
  DayPilot,
  DayPilotCalendar,
} from "daypilot-pro-react";
import CreateBookingEventModal from '@/components/Modals/CreateBookingEventModal';
import CalendarControlBar from '@/components/Sidebar/CalendarControlBar';
import { useResourceCalendar } from "@/hooks/useResourceCalendar";
import UpdateBookingEventModal from '@/components/Modals/UpdateBookingEventModal';


const ResourceCalendar = (props: any) => {

  const {
    view,
    startDate,
    selectedEvent,
    isShowAddBookingEvent,
    setIsShowAddBookingEvent,
    handleDateChange,
    handleNextDay,
    handlePreviousDay,
    handleToday,
    getTechnicianColumns,
    onTimeRangeSelected,
    isShowUpdateBookingEvent,
    setIsShowUpdateBookingEvent,
    selectedUpdateEvent,
    getTransformedCalendarBookingEvents,
    handleCalendarEventMoved,
    handleCalendarEventResize,
    handleCalendarEventClick,

  } = useResourceCalendar();



  return (
    <div >
      <CalendarControlBar
        startDate={startDate}
        onDateChange={handleDateChange}
        onToday={handleToday}
        onPrevious={handlePreviousDay}
        onNext={handleNextDay}
      />
      <DayPilotCalendar
        viewType={"Resources"}
        startDate={startDate}
        events={getTransformedCalendarBookingEvents}
        visible={view === "Day"}
        // durationBarVisible={true}
        cellDuration={15}
        
        onTimeRangeSelected={onTimeRangeSelected}

        columns={getTechnicianColumns()}

        onEventMoved={async (args) => {
          handleCalendarEventMoved(args);
        }}
        
        onEventResized={async (args) => {
          handleCalendarEventResize(args);
        }}
        onEventClick={async (args) => {
          handleCalendarEventClick(args);
        }}

        businessBeginsHour={9}
        businessEndsHour={17}

        timeFormat='Clock12Hours'

      />
      <CreateBookingEventModal
        open={isShowAddBookingEvent}
        onCancel={() => setIsShowAddBookingEvent(false)}
        eventData={selectedEvent}

      />
      <UpdateBookingEventModal
        open={isShowUpdateBookingEvent}
        onCancel={() => setIsShowUpdateBookingEvent(false)}
        eventData={selectedUpdateEvent}
      />
    </div>

  )

}


export default ResourceCalendar