import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class SplashScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            isLoggedIn: false,
        };
    }

    componentDidMount() {
        this.retrieveItem();
    }

    static navigationOptions = {
        headerTransparent: true,
        title: '',
        header: null,
    }

    async retrieveItem() {
        try {
            const retrievedItem = await AsyncStorage.getItem('user');
            if (retrievedItem == null) {
                this.setState({ user: [] });
            } else {
                const item = JSON.parse(retrievedItem);
                this.setState({ user: item });
            }
        } catch (error) {
            console.log(error.message);
        }
        this.renderUserIsLogin()
    }

    renderUserIsLogin() {

        if (this.state.user.length == 0) {
            this.setState({ isLoggedIn: false })
        } else {
            const isLogin = JSON.stringify(this.state.user.isLogin);
            this.setState({ isLoggedIn: isLogin })
        }
        //Alert.alert(JSON.stringify(this.state.isLoggedIn))
    }

    _GoToHome() {
        setTimeout(() => {
            if (this.state.user.length == 0) {
                this.props.navigation.navigate('Signup')
            } else {
                if (this.state.user.isLogin == true) {
                    this.props.navigation.navigate('Home')
                }
                else {
                    this.props.navigation.navigate('Login')
                }
            }
        }, 1500);
    }

    render() {

        return (
            <View style={styles.container}>
                {
                    this._GoToHome()
                }
                <Text style={styles.textStyles}>
                    HealthApp
                </Text>
                <Text style={styles.txtCR}>Copyright © 2020</Text>
                <ActivityIndicator
                    size="large"
                    color='#333333'
                    style={{ marginTop: 10 }} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyles: {
        color: '#C13333',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
    },
    txtCR: {
        fontFamily: 'sans-serif-condensed',
        color: '#520202',
        fontSize: 12,
    }
})
