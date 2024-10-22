import { FunctionComponent, useEffect, useState } from "react"
import socketService from "./socket_io/SocketService"
import stateService from "../stateManagement/StateService"
import I_App from "../interfaces/I_App"
import OnlinePlayers from "./components/online_players/OnlinePlayers"
import MyChallenges from "./components/my_challenges/MyChallenges"
import ChallengeAnswer from "./components/challenge_answer/ChallengeAnswer"
import Game from "./game/Game"
import listenForGameStart from "./utils/listenForGameStart"


const App: FunctionComponent<{}> = () => {
  const { manageSubscriptionAndStateUpdate } = stateService
  const [state, setState] = useState<I_App>(stateService.state.appState)
  const { socketId, inGame } = state

  useEffect(() => {

    const initializeSocketConnection = async () => {
      try {
        await socketService.initiateWebSocketConnection(`${process.env.REACT_APP_API_URL}`)
        listenForGameStart()
      } catch (error) {
        console.error('Error connecting to socket:', error)
      }
    }

    const unsubscribe = manageSubscriptionAndStateUpdate(setState, "appState")

    initializeSocketConnection()

    return () => {
      unsubscribe()
      socketService.disconnect()
    }

  }, [manageSubscriptionAndStateUpdate])

  ////(state)

  return (
    <div 
    className="App"
    id="app"
    >
      {socketId &&
        <>
          {!inGame &&
            <>
              <OnlinePlayers />
              <MyChallenges />
              <ChallengeAnswer />
            </>
          }
          {inGame &&
            <>
              <Game />
            </>
          }
        </>
      }
    </div>
  )
}

export default App
