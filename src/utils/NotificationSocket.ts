import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useNotificationStore } from "@/stores/useNotificationStore";

let client: Client;

export const connectNotificationSocket = () => {
  if (client?.connected) return;

  const baseURL = import.meta.env.VITE_API_URL;

  client = new Client({
    webSocketFactory: () => new SockJS(`${baseURL}/ws`),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("✅ WebSocket 연결 성공");
      client.subscribe("/topic/notifications", message => {
        const body = JSON.parse(message.body);
        useNotificationStore.getState().addNotification({
          id: body.id,
          message: body.message,
          read: false,
        });
      });
    },
    onStompError: error => {
      console.error("❌ STOMP 에러", error);
    },
  });

  client.activate();
};
