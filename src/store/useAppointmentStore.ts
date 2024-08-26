import { AppointmentType } from '@/types/appointment';
import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';


export type AppointmentStoreType = {
  appointments: AppointmentType[];
  addAppointment: (appointment: AppointmentType) => void;
  removeAppointment: (id: number) => void;
  isShowAddAppointment: boolean;
  setShowAddAppointment: (isShowAddAppointment: boolean) => void;
  handleShowAddAppointment: (datetime: Date) => void;
  appointment?: AppointmentType | null;
};

const useAppointmentStore = create<AppointmentStoreType>((set) => ({
  appointments: [],
  appointment: null,
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  removeAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((appointment) => appointment.id !== id),
    })),
  isShowAddAppointment: false,
  setShowAddAppointment: (isShowAddAppointment) =>
    set((state) => ({ isShowAddAppointment })),
  handleShowAddAppointment: (datetime: Date) => {
    // set((state) => ({ isShowAddAppointment: true }));
    console.log('====================================');
    console.log('handleShowAddAppointment:: ', datetime);
    console.log('====================================');
    set((state) => ({ appointment: { id: 1, datetime: datetime } , isShowAddAppointment: true }));
  }

}));

export default useAppointmentStore;