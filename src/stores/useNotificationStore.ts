import { create } from "zustand";

export type Notification = {
  notificationId: string;
  read: boolean;
  name: string;
  popularity: string;
  minStock: number;
  notifiedAt: string;
};

type NotificationState = {
  realtimeNotis: Notification[]; // 실시간 알림 (WebSocket)
  historicalNotis: Notification[]; // 기존 알림 (GET API)
  hasNewNotification: boolean; // 빨간 점 표시 여부
  addRealtimeNoti: (_noti: Notification) => void;
  setHistoricalNotis: (_notis: Notification[]) => void;
  clearNewFlag: () => void;
};

export const useNotificationStore = create<NotificationState>(set => ({
  realtimeNotis: [],
  historicalNotis: [],
  hasNewNotification: false,

  addRealtimeNoti: noti =>
    set(state => ({
      realtimeNotis: [noti, ...state.realtimeNotis],
      hasNewNotification: true,
    })),

  setHistoricalNotis: notis =>
    set(() => ({
      historicalNotis: notis,
    })),

  clearNewFlag: () => set({ hasNewNotification: false }),
}));
