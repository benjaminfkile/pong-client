import { FunctionComponent, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Button } from 'react-native'
import { ReduxState } from "@/store/reducers/combinedReducers"
import { setInGame } from "@/store/actions/appAction"
import Game from "./game/Game"

const App: FunctionComponent<{}> = () => {

    const dispatch = useDispatch();
    const inGame = useSelector((state: ReduxState) => state.appReducer.inGame);

    useEffect(() => {
        // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button
                    onPress={() => dispatch(setInGame(true))}
                    title="Start Game">
                </Button>
            </View>
            {inGame && <Game/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    button: {
        position: "absolute",
        width: "100%",
        top: "50%"
    }
})

export default App