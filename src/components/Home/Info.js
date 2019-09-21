import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default class Info extends Component {
  render() {
    const styles = this.styles();
    const { city, errorText } = this.props;

    return (
      <>
        {city && city.weather ? (
          <View>
            <View style={styles.infoView}>
              <Image
                resizeMode="cover"
                source={{ uri: city.weather.image_url }}
                style={styles.image}
              />
              <View style={styles.textInfoView}>
                <Text style={styles.infoText}>{city.city_name}</Text>
                <Text style={styles.infoText}>{city.app_temp} °C</Text>
                <Text style={styles.infoText}>
                  {city.weather.description}
                </Text>
              </View>
            </View>
            <View style={styles.lightInfoView}>
              <View style={styles.textInfoLightView}>
                <Text style={styles.lightInfoText}>
                  Latitude: {city.lat}
                </Text>
                <Text style={styles.lightInfoText}>
                  Longitude: {city.lon}
                </Text>
                <Text style={styles.lightInfoText}>
                  Longitude: {city.timezone}
                </Text>
              </View>
              <View style={styles.textInfoLightView}>
                <Text style={styles.lightInfoText}>
                  Sunrise: {city.sunrise}
                </Text>
                <Text style={styles.lightInfoText}>
                  Sunset: {city.sunset}
                </Text>
                <Text style={styles.lightInfoText}>
                  Wind speed: {city.wind_spd}
                </Text>
              </View>
            </View>
            <View style={styles.lightInfoView}>
              <View style={styles.textInfoLightView}>
                <Text style={styles.lightInfoText}>Snow: {city.snow}</Text>
                <Text style={styles.lightInfoText}>
                  Solar radiation: {city.solar_rad}
                </Text>
                <Text style={styles.lightInfoText}>
                  Date: {city.datetime}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.errorView}>
            <Text style={styles.lightInfoText}>{errorText}</Text>
          </View>
        )}
      </>
    );
  }

  styles = () => {
    const { colors } = this.props;
    const styles = StyleSheet.create({
      infoView: {
        paddingTop: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingBottom: 10,
      },
      infoText: {
        color: colors.secondary,
        fontWeight: 'bold',
        marginTop: 5,
      },
      textInfoView: {
        marginLeft: 10,
      },
      lightInfoView: {
        flexDirection: 'row',
        marginTop: 20,
      },
      lightInfoText: {
        fontSize: 15,
        color: colors.secondary,
        marginTop: 5,
      },
      textInfoLightView: {
        flex: 1,
        paddingLeft: 20,
      },
      image: {
        height: 100,
        width: 100,
        borderRadius: 50,
      },
      errorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return styles;
  };
}
