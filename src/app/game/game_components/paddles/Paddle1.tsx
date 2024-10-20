import { FunctionComponent } from "react"
import "./Paddle.css"

interface Props {
    y: number
}

const Paddle1: FunctionComponent<Props> = (props) => {

    const { y } = props

    return (
        <div
            id="paddle-1"
            className="Paddle"
            style={{
                top: `${y}px`
            }}
        >
            1
        </div>
    )
}

export default Paddle1