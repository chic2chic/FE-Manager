import { create } from "zustand";

export type Notification = {
  id: string;
  message: string;
  read: boolean;
};

type NotificationState = {
  notifications: Notification[];
  hasNewNotification: boolean;
  addNotification: (_noti: Notification) => void;
  markAsRead: (_id: string) => void;
  setNotifications: (_notis: Notification[]) => void;
  clearNewFlag: () => void;
};

export const useNotificationStore = create<NotificationState>(set => ({
  notifications: [],
  hasNewNotification: false,
  setNotifications: notis => set({ notifications: notis }),
  addNotification: noti =>
    set(state => ({
      notifications: [noti, ...state.notifications],
      hasNewNotification: true,
    })),
  markAsRead: id =>
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),
  clearNewFlag: () => set({ hasNewNotification: false }),
}));
