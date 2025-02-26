'use client';
import {
  DayPilot,
  DayPilotCalendar,
} from "daypilot-pro-react";
import AddBookingEventModal from '@/components/Modals/AddBookingEventModal';
import CalendarControlBar from '@/components/Sidebar/CalendarControlBar';
import { useResourceCalendar } from "@/hooks/useResourceCalendar";
import UpdateBookingEventModal from '@/components/Modals/UpdateBookingEventModal';


const ResourceCalendar = (props: any) => {

  const {
    view,
    startDate,
    calendarBookingEvents,
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
    setSelectedUpdateEvent,
    onCalendarEventClick,
    getTransformedCalendarBookingEvents,
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
          onCalendarEventClick(args);
        }}

        businessBeginsHour={9}
        businessEndsHour={17}

        timeFormat='Clock12Hours'

      />
      <AddBookingEventModal
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