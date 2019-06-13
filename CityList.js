import React from 'react';
import {FlatList, TextInput, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Constants} from 'expo';

export default class CityList extends React.Component {
    static navigationOptions = {
        title: 'Cities',
    };

    constructor(props) {
        super(props);

        this.state = {
            cities: [],
            searchedCities : []
        };
    }

    componentDidMount() {
        fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
        // 각자의 링크
        //fetch('http://localhost:8100/weather-crawler/available-cities')
            .then(response => response.json())
            .then(cities => {
                console.log('cities =', cities.length);
                this.setState({
                    cities : cities,
                    searchedCities : cities
                });
            });
    }

    onPressCity(item) {
        this.props.navigation.navigate(
            'Detail',
            {
                city: item
            }
        );
    }

    filterList = (text)  => {
        var searchedList = this.state.cities;
        searchedList = searchedList.filter(function(item){
            return item.toLowerCase().search(
                text.toLowerCase()) !== -1;
        });
        this.setState({searchedCities: searchedList });
    }

    renderItem(city) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
                <Text styles={styles.text}>{city}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Type here to Search!"
                    onChangeText={ (cities) => this.filterList(cities)}
                />

                <FlatList style={styles.container}
                          data={this.state.searchedCities}
                          renderItem={({ item }) => this.renderItem(item)}
                          keyExtractor={item => item}
                />
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

    item: {
        flex: 1,
        height: 50,
        justifyContent: 'center',

        borderWidth: 1,
        borderColor: '#808080',
    },
    text: {
        fontSize: 20,
        textAlign: 'left',
    },
    image1:{
        width : "10%",
        height : "10%"
    },
    image2:{
        width : "10%",
        height : "10%"
    }
});
