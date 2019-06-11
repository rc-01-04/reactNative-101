import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', 'Unknown');
    // 각자의 링크
    //fetch(`http://localhost:8080/weather-crawler/current-weathers/by-city-name/${city}`)
      fetch(`localhost:8080/weather-crawler/current-weathers/by-city-name/${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    return (
      <View style={styles.container}>
          <Text style={styles.Time}>시간 : {new Date().toDateString()} </Text>
          <Text style={styles.temp}>온도: {celsius.toFixed(1)}</Text>
          <Text style={styles.humidity}>습도 : {this.state.main.humidity}</Text>
          <Text style={styles.min}>최저온도 : {this.state.main.temp_min}</Text>
          <Text style={styles.max}>최고온도 : {this.state.main.temp_min}</Text>
          <Text style={styles.wind}>바람세기 : {this.state.wind.speed}</Text>
          <Text style={styles.clouds}>구름 양 : {this.state.clouds.all}</Text>
          <Text style={styles.sunrise}>일출 시간 : {this.state.sys.sunrise}</Text>
          <Text style={styles.sunset}>일몰 시간 : {this.state.sys.sunset}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  Time:{
  },
  temp:{
  },
  humidity:{
  },
  min{
  },
  max{
  },
  wind{
  },
  clouds{
  },
  sunrise{
  },
  sunset{
  }
});
