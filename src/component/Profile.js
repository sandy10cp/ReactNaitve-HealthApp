import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Picker, Dimensions, ScrollView, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Loader from './Loader';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FullName: "",
            Username: "",
            Password: "",
            Tinggi: "",
            Berat: "",
            GolDarah: "",
            Umur: "",
            user: [],
            loading: false,

        };
    }

    componentDidMount() {
        this.retrieveItem();
    }

    async retrieveItem() {
        try {
            const retrievedItem = await AsyncStorage.getItem('user');
            const item = JSON.parse(retrievedItem);
            this.setState({ user: item, GolDarah: item.golDarah, FullName: item.fullname, Umur: item.umur, Tinggi: item.tinggi, Berat: item.berat, Username: item.username, Password: item.password });
        } catch (error) {
            console.log(error.message);
        }
    }

    Edit = () => {
        this.setState({ loading: true });
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
        if (user.fullname == '' || user.username == '' || user.password == '' || user.umur == '' || user.tinggi == '' || user.berat == '') {
            Alert.alert('Input all field !');
            this.setState({ loading: false });
        } else {
            AsyncStorage.setItem("user", JSON.stringify(user))
                .then(() => {
                    console.log("successfully edit profile")
                    this.retrieveItem();
                    this.setState({ loading: false });
                    ToastAndroid.showWithGravityAndOffset(
                        'Edit Successfuly !',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                        25,
                        50,
                    );
                })
                .catch(() => {
                    console.log("There was an error saving the product")
                    this.setState({ loading: false });
                })
        }
    }



    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#D0454F', }}>
                    <ScrollView>
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 60, }}>
                            <TextInput
                                style={styles.txtInput}
                                underlineColorAndroid="transparent"
                                placeholder="Full Name"
                                placeholderTextColor="rgba(9,2,1,0.5)"
                                autoCapitalize="none"
                                onChangeText={(FullName) => this.setState({ FullName })}
                                value={this.state.FullName}
                            />
                            <TextInput
                                style={styles.txtInput}
                                underlineColorAndroid="transparent"
                                placeholder="Umur"
                                placeholderTextColor="rgba(9,2,1,0.5)"
                                autoCapitalize="none"
                                onChangeText={(Umur) => this.setState({ Umur })}
                                value={this.state.Umur}
                            />
                            <TextInput
                                style={styles.txtInput}
                                underlineColorAndroid="transparent"
                                placeholder="Username"
                                placeholderTextColor="rgba(9,2,1,0.5)"
                                autoCapitalize="none"
                                onChangeText={(Username) => this.setState({ Username: Username })}
                                value={this.state.Username}
                            />
                            <TextInput
                                style={styles.txtInput}
                                underlineColorAndroid="transparent"
                                placeholder="Password"
                                placeholderTextColor="rgba(9,2,1,0.5)"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={(Password) => this.setState({ Password: Password })}
                                value={this.state.Password}
                            />
                            <TextInput
                                style={styles.txtInput}
                                underlineColorAndroid="transparent"
                                placeholder="Tinggi"
                                placeholderTextColor="rgba(9,2,1,0.5)"
                                autoCapitalize="none"
                                onChangeText={(Tinggi) => this.setState({ Tinggi })}
                                value={this.state.Tinggi}
                            />
                            <TextInput
                                style={styles.txtInput}
                                underlineColorAndroid="transparent"
                                placeholder="Berat"
                                placeholderTextColor="rgba(9,2,1,0.5)"
                                autoCapitalize="none"
                                onChangeText={(Berat) => this.setState({ Berat })}
                                value={this.state.Berat}
                            />
                            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Picker
                                    selectedValue={this.state.GolDarah}
                                    style={{ height: 50, width: screenWidth - 80, }}
                                    activeItemTextStyle={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}
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
                                onPress={this.Edit}
                                style={styles.btnSignUp}>
                                <Text style={{ fontSize: 30, color: 'white' }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <Loader
                    loading={this.state.loading} />
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
        borderBottomWidth: 1,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
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
