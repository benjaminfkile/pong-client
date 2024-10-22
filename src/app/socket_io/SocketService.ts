import io from "socket.io-client";
import stateService from "../../stateManagement/StateService";
import getLocalUserId from "../utils/getLocalUserId";

const { updateState } = stateService

const socketService = {
  socket: null as any,
  heartbeatInterval: null as any,  // Store the interval ID

  async initiateWebSocketConnection(url: string): Promise<void> {
    if (!this.socket) {
      this.socket = io(url);

      return new Promise((resolve, reject) => {
        this.socket.on("connect", () => {
          const userId = getLocalUserId();
          const username = null; // Replace with actual username if needed
          this.socket.emit("join_online", { userId: userId, username: username });
          this.startHeartbeat();
          updateState("appState", [
            { key: "socketId", value: this.socket.id },
            { key: "userId", value: userId }
          ]);
          resolve();
        });

        this.socket.on("connect_error", (err: Error) => {
          console.error("Connection error:", err);
          reject(err);
        });
      });
    } else {
      return Promise.resolve();
    }
  },

  emit(event: string, data?: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.error("Socket not initialized. Call 'initiateWebSocketConnection()' first.");
    }
  },

  on(event: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.error("Socket not initialized. Call 'initiateWebSocketConnection()' first.");
    }
  },

  startHeartbeat: () => {
    // Clear previous interval if exists
    if (socketService.heartbeatInterval) {
      clearInterval(socketService.heartbeatInterval);
    }

    // Set a new interval for sending heartbeats
    socketService.heartbeatInterval = setInterval(() => {
      socketService.emit("heartbeat", { userId: getLocalUserId() });
    }, process.env.REACT_APP_HEARTBEAT_INTERVAL ? parseInt(process.env.REACT_APP_HEARTBEAT_INTERVAL) : 15000);
  },

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;

      // Clear the heartbeat interval when socket disconnects
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
    } else {
      console.error("Socket not initialized. Cannot disconnect.");
    }
  }
};

export default socketService;
