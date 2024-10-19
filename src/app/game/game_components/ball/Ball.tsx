import { FunctionComponent } from "react";
import "./Ball.css"

interface Props {
    x: number
    y: number
    radius: number
}

const Ball: FunctionComponent<Props> = (props) => {

    const { x, y, radius } = props
    const size = radius * 2
    //(x,y)

    return (

        <div
            className="Ball"
            style={{
                left: `${x - radius}px`,
                top: `${y - radius}px`,
                width: `${size}px`,
                height: `${size}px`
            }}
        >

        </div>
    )
}

export default Ball