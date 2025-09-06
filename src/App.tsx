import React, { FunctionComponent, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import socketService from "./services/socketService"

const App: FunctionComponent = () => {
  useEffect(() => {
    socketService.init()

    socketService.on("paddleMove", (data) => {
      console.log("Opponent moved:", data)
      // update state or UI here
    })

    // No cleanup since .off was removed
  }, [])

  const sendPaddleMove = () => {
    const payload = { y: Math.random() * 100 }
    socketService.emit("paddleMove", payload)
    console.log("👾 Sent paddleMove:", payload)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>hi</Text>
      <TouchableOpacity style={styles.button} onPress={sendPaddleMove}>
        <Text style={styles.buttonText}>Send paddleMove</Text>
      </TouchableOpacity>
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
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  }
})
