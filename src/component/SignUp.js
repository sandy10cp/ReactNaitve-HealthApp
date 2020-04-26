import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Picker, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FullName: "",
            Username: "",
            Password: "",
            Umur: "",
            Tinggi: "",
            Berat: "",
            G: "",
            user: [],

        };
    }

    componentDidMount() {
        this.retrieveItem();
    }

    SignUp = () => {
        let user = {
            fullname: this.state.FullName,
            username: this.state.Username,
            password: this.state.Password,
            umur: this.state.Umur,
            tinggi: this.state.Tinggi,
            berat: this.state.Berat,
            golDarah: this.state.GolDarah,
            isLogin: true
        }
        AsyncStorage.setItem("user", JSON.stringify(user))
            .then(() => {
                console.log("successfully sign up")
                this.retrieveItem();
                this.props.navigation.navigate('Home')
            })
            .catch(() => {
                console.log("There was an error saving the product")
            })
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

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#D0454F' }}>
                <View style={{ height: 60, marginTop: 50, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6A0202', }}>Register Your Personal Data</Text>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextInput
                            style={styles.txtInput}
                            underlineColorAndroid="transparent"
                            placeholder="Full Name"
                            placeholderTextColor="rgba(9,2,1,0.5)"
                            autoCapitalize="none"
                            onChangeText={(FullName) => this.setState({ FullName })}
                        />
                        <TextInput
                            style={styles.txtInput}
                            underlineColorAndroid="transparent"
                            placeholder="Umur"
                            placeholderTextColor="rgba(9,2,1,0.5)"
                            autoCapitalize="none"
                            onChangeText={(Umur) => this.setState({ Umur })}
                        />
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
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '80%', }}>
                            <TextInput
                                style={styles.txtInputRow}
                                underlineColorAndroid="transparent"
                                placeholder="Tinggi"
                                placeholderTextColor="rgba(9,2,1,0.5)"
                                autoCapitalize="none"
                                onChangeText={(Tinggi) => this.setState({ Tinggi })}
                            />
                            <TextInput
                                style={styles.txtInputRow}
                                underlineColorAndroid="transparent"
                                placeholder="Berat"
                                placeholderTextColor="rgba(9,2,1,0.5)"
                                autoCapitalize="none"
                                onChangeText={(Berat) => this.setState({ Berat })}
                            />
                        </View>
                        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Picker
                                selectedValue={this.state.GolDarah}
                                style={{ height: 50, width: 100, }}
                                itemStyle={{ fontSize: 18, color: '#d00' }}
                                itemTextStyle={{ fontSize: 18, color: '#d00', }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ GolDarah: itemValue, })
                                }>
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="AB" value="AB" />
                            </Picker>
                        </View>
                        <TouchableOpacity
                            onPress={this.SignUp}
                            style={styles.btnSignUp}>
                            <Text style={{ fontSize: 30, color: 'white' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        backgroundColor: 'white',
        fontSize: 17,
        color: '#6A0202',
    },
    txtInputRow: {
        margin: 8,
        height: 50,
        borderColor: '#000',
        width: '40%',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        fontSize: 17,
        color: '#6A0202',
    },
    btnSignUp: {
        height: 50,
        width: '80%',
        backgroundColor: '#6A0202',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
