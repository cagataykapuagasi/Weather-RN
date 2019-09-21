import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { Icon } from '../components';
import { Actions } from 'react-native-router-flux';

@inject('store')
@observer
export default class Settings extends Component {
  state = {};
  render() {
    const { colors, isDarkTheme } = this.props.store.app;
    const styles = this.styles();

    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <TouchableOpacity onPress={Actions.pop} style={styles.backIcon}>
            <Icon
              type="material"
              name="arrow-back"
              color={colors.secondary}
              size={25}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Settings</Text>
        </View>
        <StatusBar barStyle={colors.barStyle} />
        <View style={styles.switchView}>
          <Text style={styles.text}>Dark Mode</Text>
          <Switch
            value={isDarkTheme}
            onValueChange={this.props.store.app.onChangeTheme}
          />
        </View>
      </View>
    );
  }

  styles = () => {
    const { colors } = this.props.store.app;
    const styles = StyleSheet.create({
      main: {
        flex: 1,
        backgroundColor: colors.primary,
      },
      text: {
        fontSize: 15,
        color: colors.secondary,
        marginTop: 5,
      },
      header: {
        height: '10%',
        width: '100%',
        paddingTop: 30,
        alignItems: 'center',
      },
      headerText: {
        color: colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
      },
      switchView: {
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        marginHorizontal: 20,
        padding: 10,
        borderColor: colors.secondary,
        borderRadius: 5,
      },
      backIcon: {
        position: 'absolute',
        left: 15,
        top: 30,
      },
    });

    return styles;
  };
}
