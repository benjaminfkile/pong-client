import { FunctionComponent } from "react"
import I_ScorePayload from "../../../../interfaces/I_ScorePayload"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import socketService from "../../../socket_io/SocketService"
import stateService from "../../../../stateManagement/StateService"

interface Props {
    winner: boolean
    score: I_ScorePayload
}

const GameResult: FunctionComponent<Props> = (props) => {

    const { updateState } = stateService
    const { winner, score } = props


    return (
        <div className={`GameResult ${winner ? "GameResultWinner" : "GameResultLoser"}`}>
            <Dialog open>
                <DialogTitle>
                    {`You ${winner ? "won! :)" : "lost :("}`}
                </DialogTitle>
                {/* <DialogContent>

                </DialogContent> */}
                <DialogActions>
                    <Button
                        onClick={() => updateState("appState", [
                            { key: "inGame", value: false },
                        ])}
                        color="primary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default GameResult