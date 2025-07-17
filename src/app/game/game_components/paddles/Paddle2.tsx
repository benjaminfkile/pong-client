import { FunctionComponent } from "react"
import "./Paddle.css"

interface Props {
    y: number
    width: number
    height: number
    gameWidth: number
}

const Paddle2: FunctionComponent<Props> = (props) => {

    const { y, width, height, gameWidth } = props

    return (
        <div
            id="paddle-2"
            className="Paddle"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${gameWidth - width}px`,
                top: `${y}px`
            }}
        >
            2
        </div>
    )
}

export default Paddle2