import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: "",
            user: [],

        };
    }

    componentDidMount() {
        this.retrieveItem();
    }

    Login = () => {
        const user = {
            fullname: this.state.user.fullname,
            username: this.state.user.username,
            password: this.state.user.password,
            isLogin: true
        }
        const usr = this.state.user.username;
        const pas = this.state.user.password;
        if (this.state.Username == usr && this.state.Password == pas) {
            this.props.navigation.navigate('Home')
            AsyncStorage.setItem("user", JSON.stringify(user))
                .then(() => {
                    console.log("successfully login")
                    this.props.navigation.navigate('Home')
                })
                .catch(() => {
                    console.log("There was an error saving the product")
                })
        } else {
            Alert.alert('Username & Password not match !')
        }
    }

    async retrieveItem() {
        try {
            const retrievedItem = await AsyncStorage.getItem('user');
            const item = JSON.parse(retrievedItem);
            this.setState({ user: item });
        } catch (error) {
            console.log(error.message);
        }
    }

    signUp = () => {
        this.props.navigation.navigate('SignUp')
    }

    render() {
        //Alert.alert(JSON.stringify(this.state.Username))
        return (
            <View style={{ flex: 1, backgroundColor: '#D0454F' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={styles.txtInput}
                        underlineColorAndroid="transparent"
                        placeholder="Username"
                        placeholderTextColor="rgba(9,2,1,0.5)"
                        autoCapitalize="none"
                        onChangeText={(Username) => this.setState({ Username: Username })}
                    />
                    <TextInput
                        style={styles.txtInput}
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="rgba(9,2,1,0.5)"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={(Password) => this.setState({ Password: Password })}
                    />
                    <TouchableOpacity
                        onPress={this.Login}
                        style={styles.btnSignUp}>
                        <Text style={{ fontSize: 30, color: 'white' }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 5 }}
                        onPress={this.signUp}
                    >
                        <Text style={styles.txtSignUp}>Sign Up ?</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    txtInput: {
        margin: 8,
        height: 50,
        width: '80%',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    btnSignUp: {
        height: 50,
        width: '80%',
        backgroundColor: '#6A0202',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtSignUp: {
        color: '#6A0000',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 17,
    }
})
