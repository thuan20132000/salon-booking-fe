import { appointmentAPI } from '@/apis/appointmentAPI';
import { AppointmentServiceType, AppointmentType } from '@/types/appointment';
import { NailServiceType } from '@/types/service';
import { create } from 'zustand';


export type AppointmentStore = {
  appointments: AppointmentType[];
  addAppointment: (appointment: AppointmentType) => void;
  removeAppointment: (id: number) => void;
  isShowAddAppointment: boolean;
  setShowAddAppointment: (isShowAddAppointment: boolean) => void;
  handleShowAddAppointment: (datetime: Date) => void;
  appointment?: AppointmentType | null;
  updateAppointment: (appointment: AppointmentType) => void;
  getAppointments: () => Promise<void>;
  appointmentServices: AppointmentServiceType[];
  updateAppointmentServices: (services: AppointmentServiceType[]) => void;
};

const useAppointmentStore = create<AppointmentStore>((set, get) => ({
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
  },
  appointmentCreate: null,
  appointmentServices: [],
  updateAppointmentServices: (services: AppointmentServiceType[]) => {
    set({
      appointmentServices: services,
    })
  },
  updateAppointment: (appointment:AppointmentType) => {
    set({
      appointment: appointment,
    })
  }
    

}));

export default useAppointmentStore;