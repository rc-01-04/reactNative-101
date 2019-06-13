import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Constants} from 'expo';
import {ImageBackground} from 'react-native';

export default class WeatherDetailScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
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
        const {navigation} = this.props;
        const city = navigation.getParam('city', 'Unknown');
        // 각자의 링크
        //fetch(`http://localhost:8080/weather-crawler/current-weathers/by-city-name/${city}`)
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=621e61b1abbd67966347e3beb3f2e093`)
            .then(response => response.json())
            .then(info => {
                this.setState({
                    ...info,
                    isLoading: false,
                });
            });
    }

    render() {

        let backgrounName = "";
        let d = new Date();
        var hour = d.getHours();
        var imageNumber = 0;
        var backgroundImages = [
            require('./images/sunny.jpg'),
            require('./images/night.jpg'),
        ];

        if(hour > 6 && hour < 19){
            imageNumber = 0;
        }else{
            imageNumber = 1;
        }


        if (this.state.isLoading) {
            return (
                <ImageBackground source={backgroundImages[imageNumber]}
                                 style={styles.backgroundImage}>
                    <View style={styles.container}>
                        <Text style={styles.textWeather}>데이터를 불러오는 중입니다.</Text>
                    </View>
                </ImageBackground>
            )
        }



        let celsius = this.state.main.temp - 273.15;
        return (
            <ImageBackground source={backgroundImages[imageNumber]}
                             style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={styles.text}>{celsius.toFixed(1)} &deg;C</Text>
                    <Text style={styles.textWeather}>{new Date().toDateString()} </Text>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,

    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        color: "white",
        textAlign: 'center',
    },
    textWeather: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        textAlign: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        width: '100%',
        height: '100%'
    },
});
