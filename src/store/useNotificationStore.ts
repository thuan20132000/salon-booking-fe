import { create } from 'zustand';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationStore {
  notify: (type: NotificationType, message: string, description?: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notify: (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  },
}));