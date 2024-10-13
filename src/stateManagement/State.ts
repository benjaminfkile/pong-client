// Imports states from different components to combine them into a single state object.
import appState from "../app/AppState"
import onlinePlayersState from "../app/components/online_players/OnlinePlayersState"

const state = {
    appState: appState,
    onlinePlayersState: onlinePlayersState
}

export default state