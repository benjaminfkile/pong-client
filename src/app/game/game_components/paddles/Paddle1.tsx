import { FunctionComponent } from "react"
import "./Paddle.css"

interface Props {
    y: number
}

const Paddle1: FunctionComponent<Props> = (props) => {

    const { y } = props

    console.log("Paddle1 y", y)

    return (
        <div
            id="paddle-1"
            className="Paddle"
            style={{
                top: `${y}px`
            }}
        >

        </div>
    )
}

export default Paddle1