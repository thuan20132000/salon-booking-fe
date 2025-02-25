import { create } from 'zustand';
import { DayPilot } from '@daypilot/daypilot-lite-react';


interface CalendarStore {
  // State
  bookingEvents: DayPilot.EventData[];
  
  // Actions
  
}

const useCalendarStore = create<CalendarStore>((set, get) => ({
  selectedDate: new Date(),
  events: [],
  bookingEvents: [],
  viewMode: 'month',

}));

export default useCalendarStore;
