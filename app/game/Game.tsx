import React, { FunctionComponent, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import PlayerPaddle from './game_components/PlayerPaddle';
import * as ScreenOrientation from 'expo-screen-orientation';
import socketIOClient from '@/socket_io/SocketIOClient';

const Game: FunctionComponent = () => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    socketIOClient.init()

    return () => {
      // Unlock the screen orientation when the component unmounts
      socketIOClient.disconnect()
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.game}>
      <StatusBar hidden={true} />
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
