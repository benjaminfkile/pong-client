import sendHeartbeat from "../handlers/emiters/sendHeartbeat"

const healthService = {
    
  interval: null as number | null,

  init: () => {
    if (healthService.interval) return
    healthService.interval = setInterval(() => {
      healthService.pulse()
    }, 1000) as unknown as number 
  },

  destroy: () => {
    if (healthService.interval !== null) {
      clearInterval(healthService.interval)
      healthService.interval = null
    }
  },

  pulse: () => {
    sendHeartbeat()
  },
}

export default healthService
