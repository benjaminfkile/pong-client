import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import socketIOMessage from '@/socket_io/SocketIOClient';

const App = () => {
  useEffect(() => {
    socketIOMessage.init();

    return () => {
      socketIOMessage.disconnect();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Pong Game</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: "#FFFFFF"
  },
});

export default App;
