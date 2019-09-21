import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Icon, HomeInfo } from '../components';
import { request } from '../api/Client';
import { Actions } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';

const { width } = Dimensions.get('window');

@inject('store')
@observer
export default class Home extends React.Component {
  state = {
    searchText: '',
    city: null,
    loading: false,
    errorText: null,
  };

  onChangeText = searchText => {
    const { loading } = this.state;

    this.setState(
      {
        searchText,
        loading: true,
      },
      () => {
        this.getRequest(searchText);
      }
    );
  };

  getRequest = searchText => {
    request('get', searchText)
      .then(city => {
        if (city === 'Wrong city or country') {
          this.setState({
            city: null,
            loading: false,
            errorText: city,
          });
          return;
        }

        this.setState({
          city,
          loading: false,
          errorText: null,
        });
      })
      .catch(() =>
        this.setState({
          city: null,
          loading: false,
          errorText: 'Something went wrong',
        })
      );
  };

  clearInput = () => {
    this.setState({
      searchText: '',
      city: null,
      loading: false,
      errorText: null,
    });
  };

  render() {
    const { searchText, city, loading, errorText } = this.state;
    const { colors } = this.props.store.app;
    const styles = this.styles();
    console.log(city);

    return (
      <View style={styles.container}>
        <StatusBar barStyle={colors.barStyle} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Weather</Text>
          <TouchableOpacity onPress={Actions.settings}>
            <Icon
              type="material"
              name="settings"
              size={30}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Ara"
              value={searchText}
              onChangeText={this.onChangeText}
              placeholderTextColor={colors.secondary}
              style={styles.textInput}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                style={styles.closeView}
                onPress={this.clearInput}>
                <Icon
                  type="material"
                  name="close"
                  size={25}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <HomeInfo errorText={errorText} city={city} colors={colors} />
        )}
      </View>
    );
  }

  styles = () => {
    const { colors } = this.props.store.app;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.primary,
      },
      header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingTop: 40,
      },
      headerText: {
        color: colors.secondary,
        fontSize: 18,
        fontWeight: 'bold',
      },
      search: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
      },
      textInput: {
        color: colors.secondary,
        height: 50,
        width: '92%',
      },
      closeView: {
        width: '8%',
        alignItems: 'center',
      },
      textInputView: {
        height: 50,
        width: width - 40,
        borderWidth: 0.5,
        borderColor: colors.secondary,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    });

    return styles;
  };
}
