import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PlayerPaddle: FunctionComponent = () => {
  const position = useSelector((state: RootState) => state.paddle.position);

  return (
    <View style={[styles.paddle, { top: position }]} />
  );
}

const styles = StyleSheet.create({
  paddle: {
    width: 20,
    height: 100,
    backgroundColor: 'blue',
    position: 'absolute',
    left: 0, // Position the paddle on the left side of the screen
  }
});

export default PlayerPaddle;
