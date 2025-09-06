import io from "socket.io-client"
import type SocketIOClient from "socket.io-client"

const SERVER_URL = "http://192.168.50.199:8000"

let socket: SocketIOClient.Socket | null = null

const socketService = {
  init: () => {
    if (socket) return

    socket = io(SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    })

    socket.on("connect", () => {
      console.log("🔌 Connected to server:", socket?.id)
    })

    socket.on("disconnect", (reason: string) => {
      console.log("❌ Disconnected:", reason)
    })

    socket.on("connect_error", (err: any) => {
      console.warn("⚠️ Connection error:", err.message || err)
    })
  },

  emit: (event: string, data?: any) => {
    if (!socket || !socket.connected) {
      console.warn("emit failed, socket not connected")
      return
    }
    socket.emit(event, data)
  },

  on: (event: string, handler: (...args: any[]) => void) => {
    if (!socket) {
      console.warn("on failed, socket not initialized")
      return
    }
    socket.on(event, handler)
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect()
      socket = null
    }
  },

  isConnected: () => !!socket?.connected,
}

export default socketService
