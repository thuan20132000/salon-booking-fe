import { appointmentServiceAPI } from '@/apis/appointmentServiceAPI';
import { AppointmentServiceType, AppointmentType } from '@/types/appointment';
import { NailServiceType } from '@/types/service';
import { create } from 'zustand';


export type AppointmentServiceStore = {
  appointmentServices: AppointmentServiceType[];
  getAppointmentServices: () => Promise<void>;
};

const useAppointmentServiceStore = create<AppointmentServiceStore>((set, get) => ({
  appointmentServices: [],
  updateAppointmentServices: (services: AppointmentServiceType[]) => {
    set({
      appointmentServices: services,
    })
  },
  getAppointmentServices: async () => {
    const data = await appointmentServiceAPI.getAppointmentServices();
    console.log('====================================');
    console.log('data:: ', data);
    console.log('====================================');
    set({ appointmentServices: data });
  }
}));

export default useAppointmentServiceStore;