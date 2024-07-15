import React, { FunctionComponent, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PlayerPaddle from './game_components/PlayerPaddle';
import * as ScreenOrientation from 'expo-screen-orientation';
import socketIOMessage from '@/socket_io/SocketIOClient';

const Game: FunctionComponent = () => {
  useEffect(() => {
    // Lock the screen orientation to landscape
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    socketIOMessage.init()

    return () => {
      // Unlock the screen orientation when the component unmounts
      socketIOMessage.disconnect()
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.game}>
      <PlayerPaddle />
    </View>
  );
}

const styles = StyleSheet.create({
  game: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'green',
  }
});

export default Game;
