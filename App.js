import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { Provider } from 'mobx-react';
import { Home, Settings } from './src/screens';
import { store } from '~/stores';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.main}>
          <StatusBar barStyle="light-content" />
          <Router
          //sceneStyle={styles.scene}
          //titleStyle={styles.title}
          //tintColor={colors.headerTint}
          //headerTintColor={colors.headerTint}
          >
            <Scene navTransparent>
              <Scene hideNavBar component={Home} initial key="home" />
              <Scene hideNavBar component={Settings} key="settings" />
            </Scene>
          </Router>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
