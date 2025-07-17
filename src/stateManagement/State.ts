// Imports states from different components to combine them into a single state object.
import appState from "../app/AppState"
import challengeAnswerState from "../app/components/challenge_answer/ChallengeAnswerState"
import myChallengesState from "../app/components/my_challenges/MyChallengesState"
import onlinePlayersState from "../app/components/online_players/OnlinePlayersState"
import gameState from "../app/game/GameState"

const state = {
    appState: appState,
    onlinePlayersState: onlinePlayersState,
    myChallengesState: myChallengesState,
    challengeAnswerState: challengeAnswerState,
    gameState: gameState
}

export default state