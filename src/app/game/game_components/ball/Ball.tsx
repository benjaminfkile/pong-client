import { FunctionComponent } from "react";
import "./Ball.css"

interface Props {
    x: number
    y: number
    size: number
}

const Ball: FunctionComponent<Props> = (props) => {

    const { x, y, size } = props

    return (

        <div
            className="Ball"
            style={{
                left: `${x - size / 2}px`,
                top: `${y - size / 2}px`,
                width: `${size}px`,
                height: `${size}px`
            }}
        >

        </div>
    )
}

export default Ball