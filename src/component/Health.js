import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Picker, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

export default class Health extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: "",
            Tanggal: new Date(),
            Waktu: "",
            Gejala: "",
            Penanganan: "",
            Reaksi: "",
            user: [],
            dateVisible: false,


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

    datepicker = () => {
        this.setState({ dateVisible: true })
    }

    onChangeDate = selectedDate => {
        const currentDate = selectedDate || date;

        this.setState({
            Tanggal: new Date(currentDate.nativeEvent.timestamp),
            dateVisible: false,
        })
        console.log(this.state.Tanggal);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#D0454F' }}>
                <View style={{ height: 60, marginTop: 50, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6A0202', }}>Health Record</Text>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextInput
                            style={styles.txtInput}
                            underlineColorAndroid="transparent"
                            placeholder="Title"
                            placeholderTextColor="rgba(9,2,1,0.5)"
                            autoCapitalize="none"
                            onChangeText={(Title) => this.setState({ Title })}
                        />
                        <View>
                            <Button onPress={this.datepicker} title="Show time picker!" />
                        </View>
                        {this.state.dateVisible &&
                            <RNDateTimePicker locale="id-ID"
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                defaultDate={new Date()}
                                value={this.state.Tanggal}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={this.onChangeDate}
                            />
                        }

                        <TextInput
                            style={styles.txtInput}
                            underlineColorAndroid="transparent"
                            placeholder="Waktu"
                            placeholderTextColor="rgba(9,2,1,0.5)"
                            autoCapitalize="none"
                            onChangeText={(Waktu) => this.setState({ Waktu: Waktu })}
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style={styles.txtInputArea}
                            underlineColorAndroid="transparent"
                            placeholder="Gejala"
                            placeholderTextColor="rgba(9,2,1,0.5)"
                            autoCapitalize="none"
                            onChangeText={(Gejala) => this.setState({ Gejala: Gejala })}
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style={styles.txtInputArea}
                            underlineColorAndroid="transparent"
                            placeholder="Penanganan"
                            placeholderTextColor="rgba(9,2,1,0.5)"
                            autoCapitalize="none"
                            onChangeText={(Penanganan) => this.setState({ Penanganan })}
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style={styles.txtInputArea}
                            underlineColorAndroid="transparent"
                            placeholder="Reaksi"
                            placeholderTextColor="rgba(9,2,1,0.5)"
                            autoCapitalize="none"
                            onChangeText={(Reaksi) => this.setState({ Reaksi })}
                        />
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
        borderColor: '#6A0202',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        fontSize: 17,
        color: '#6A0202',
    },
    txtInputArea: {
        margin: 8,
        width: '80%',
        borderColor: '#6A0202',
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
