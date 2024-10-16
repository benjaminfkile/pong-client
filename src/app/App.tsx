import { FunctionComponent, useEffect, useState } from "react"
import socketService from "./socket_io/SocketService"
import stateService from "../stateManagement/StateService"
import I_App from "../interfaces/I_App"
import OnlinePlayers from "./components/online_players/OnlinePlayers"


const App: FunctionComponent<{}> = () => {
  const { manageSubscriptionAndStateUpdate } = stateService
  const [state, setState] = useState<I_App>(stateService.state.appState)
  const { socketId } = state

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL || 'http://localhost:8000'

    const initializeSocketConnection = async () => {
      try {
        await socketService.initiateWebSocketConnection(url)
      } catch (error) {
        console.error('Error connecting to socket:', error)
      }
    }

    const unsubscribe = manageSubscriptionAndStateUpdate(setState, "appState")

    initializeSocketConnection()

    socketService.on('receive_private_message', (data) => {
      console.log('Private message received:', data.message);
    });

    return () => {
      unsubscribe()
      socketService.disconnect()
    }

  }, [manageSubscriptionAndStateUpdate])

  console.log(state)

  return (
    <div className="App">
      {socketId &&
        <>
          <OnlinePlayers />
        </>
      }
    </div>
  )
}

export default App
