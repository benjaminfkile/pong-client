import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, StatusBar } from 'react-native';
import Game from '@/game/Game';
import store from '@/store';


const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Game />
    </View>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default App;
