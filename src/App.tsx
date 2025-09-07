import React, { FunctionComponent, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import socketService from "./socketIO/services/socketService"
import healthService from "./socketIO/services/healthService"

const App: FunctionComponent = () => {
  useEffect(() => {
    socketService.init()
    healthService.init()

    return () => {
      healthService.destroy()
      socketService.disconnect()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>hi</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111"
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20
  }
})
