import io from "socket.io-client"
import stateService from "../../stateManagement/StateService"
import getDeviceId from "../utils/getDeviceId"

const { updateState } = stateService

const socketService = {
  socket: null as any,

  async initiateWebSocketConnection(url: string): Promise<void> {
    if (!this.socket) {
      this.socket = io(url)

      return new Promise((resolve, reject) => {
        this.socket.on("connect", () => {
          console.log("Connected to server via socket:", this.socket.id)
          const deviceId = getDeviceId()
          const username = null//!!!!!!
          this.socket.emit("join_online", { deviceId: deviceId, username: username })
          this.startHeartbeat()
          updateState("appState", [
            { key: "socketId", value: this.socket.id },
            { key: "deviceId", value: deviceId }
          ])
          resolve()
        })

        this.socket.on("connect_error", (err: Error) => {
          console.error("Connection error:", err)
          reject(err)
        })
      })
    } else {
      return Promise.resolve()
    }
  },

  emit(event: string, data?: any): void {
    if (this.socket) {
      this.socket.emit(event, data)
    } else {
      console.error("Socket not initialized. Call 'initiateWebSocketConnection()' first.")
    }
  },

  on(event: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback)
    } else {
      console.error("Socket not initialized. Call 'initiateWebSocketConnection()' first.")
    }
  },

  startHeartbeat: () => {
    setInterval(() => {
      socketService.emit("heartbeat", { deviceId: getDeviceId() })
    }, process.env.REACT_APP_HEARTBEAT_INTERVAL ? parseInt(process.env.REACT_APP_HEARTBEAT_INTERVAL) : 15000)
  },

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      console.log("Disconnected from socket")
      this.socket = null
    } else {
      console.error("Socket not initialized. Cannot disconnect.")
    }
  }
}

export default socketService
