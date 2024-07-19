import { FunctionComponent, useEffect } from "react"
import { Provider } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import store from '@/store/store'
import * as ScreenOrientation from 'expo-screen-orientation'
import App from "./App"

const Index: FunctionComponent<{}> = () => {

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }, [])

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <App />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})

export default Index