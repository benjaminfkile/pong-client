import { FunctionComponent } from "react"
import "./Paddle.css"

interface Props {
    y: number
    gameWidth: number
}

const Paddle2: FunctionComponent<Props> = (props) => {

    const { y, gameWidth } = props

    return (
        <div
            id="paddle-2"
            className="Paddle"
            style={{
                left: `${gameWidth - 25}px`,
                top: `${y}px`
            }}
        >
            2
        </div>
    )
}

export default Paddle2