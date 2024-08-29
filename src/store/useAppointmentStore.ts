import { appointmentAPI } from '@/apis/appointmentAPI';
import { AppointmentType } from '@/types/appointment';
import { create } from 'zustand';


export type AppointmentStore = {
  appointments: AppointmentType[];
  addAppointment: (appointment: AppointmentType) => void;
  removeAppointment: (id: number) => void;
  isShowAddAppointment: boolean;
  setShowAddAppointment: (isShowAddAppointment: boolean) => void;
  handleShowAddAppointment: (datetime: Date) => void;
  appointment?: AppointmentType | null;
  getAppointments: () => Promise<void>;
};

const useAppointmentStore = create<AppointmentStore>((set) => ({
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
    set((state) => ({ appointment: { id: 1, datetime: datetime }, isShowAddAppointment: true }));
  },
  getAppointments: async () => {
    const data = await appointmentAPI.getAppointments();
    set({ appointments: data });
  }

}));

export default useAppointmentStore;