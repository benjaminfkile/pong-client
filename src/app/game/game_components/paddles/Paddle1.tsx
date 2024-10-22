import { FunctionComponent } from "react"
import "./Paddle.css"

interface Props {
    y: number
    width: number
    height: number
}

const Paddle1: FunctionComponent<Props> = (props) => {

    const { y, width, height } = props

    return (
        <div
            id="paddle-1"
            className="Paddle"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                top: `${y}px`
            }}
        >
            1
        </div>
    )
}

export default Paddle1