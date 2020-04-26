import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Shimmer from '../shimmer';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            isLoggedIn: true,
            visible: false
        };

    }

    componentDidMount() {
        this.retrieveItem();
    }

    LogOut = () => {
        let user = {
            fullname: this.state.user.fullname,
            username: this.state.user.username,
            password: this.state.user.password,
            isLogin: false
        }
        AsyncStorage.setItem("user", JSON.stringify(user))
            .then(() => {
                console.log("It was successfully logout")
                this.props.navigation.navigate('Login')
            })
            .catch(() => {
                console.log("There was an error logout")
            })

    }

    async retrieveItem() {
        try {
            const retrievedItem = await AsyncStorage.getItem('user');
            const item = JSON.parse(retrievedItem);
            setTimeout(() => {
                this.setState({ user: item, visible: true });
            }, 2500);
        } catch (error) {
            console.log(error.message);
        }
        this.renderUserIsLogin()
    }

    renderUserIsLogin() {
        const isLogin = JSON.stringify(this.state.user.isLogin);
        this.setState({ isLoggedIn: isLogin })
    }

    Food = () => {
        this.props.navigation.navigate('Food')
    }

    Health = () => {
        this.props.navigation.navigate('Health')
    }

    Profile = () => {
        this.props.navigation.navigate('Profile')
    }

    render() {
        //Alert.alert(JSON.stringify(this.state.user.golDarah))
        let bmi = 0;
        let berat = this.state.user.berat;
        let tinggi = this.state.user.tinggi / 100;
        bmi = berat / (tinggi * tinggi);
        return (
            <View style={styles.content}>
                <View style={{ height: 235, width: '100%', backgroundColor: '#C7111D', opacity: 0.76 }}>
                    <View style={styles.headerView}>
                        <View style={{ height: 40, width: '82%' }}>
                            <View style={{ marginLeft: 17, }}>
                                <TouchableOpacity
                                    onPress={this.Profile}
                                >
                                    <Text numberOfLines={1} style={{ color: '#5C0108', fontWeight: 'bold', fontSize: 25 }}>{this.state.user.fullname}</Text>
                                </TouchableOpacity>
                                <Text style={{ color: '#5C0108', fontWeight: '900', fontSize: 20 }}>{this.state.user.umur}</Text>
                            </View>
                        </View>
                        <View style={{ height: 40, width: '18%', alignItems: 'flex-end', }}>
                            <View style={styles.btnAdd}>
                                <Text style={{ fontSize: 50, fontWeight: '100', color: '#C7111D' }}>+</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.panel}>
                    <View style={styles.panelInfo}>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../icon/weight.png')} style={{ height: 50, width: 50, }} />
                            <Text style={{ color: '#5C0108', marginTop: 10, }}>Weight</Text>
                        </View>
                        <View>
                            <Shimmer autoRun={true} visible={this.state.visible} style={{ width: 50 }}>
                                <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#9B0914' }}>{this.state.user.berat}</Text>
                            </Shimmer>
                        </View>
                    </View>
                    <View style={styles.panelInfo}>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../icon/height.png')} style={{ height: 50, width: 50, }} />
                            <Text style={{ color: '#5C0108', marginTop: 10, }}>Height</Text>
                        </View>
                        <View>
                            <Shimmer autoRun={true} visible={this.state.visible} style={{ width: 50 }}>
                                <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#9B0914' }}>{this.state.user.tinggi}</Text>
                            </Shimmer>
                        </View>
                    </View>
                    <View style={styles.panelInfo}>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../icon/blood.png')} style={{ height: 50, width: 50, }} />
                            <Text style={{ color: '#5C0108', marginTop: 10, }}>Blood</Text>
                        </View>
                        <View>
                            <Shimmer autoRun={true} visible={this.state.visible} style={{ width: 50 }}>
                                <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#9B0914' }}>{this.state.user.golDarah}</Text>
                            </Shimmer>
                        </View>
                    </View>
                    <View style={styles.panelInfo}>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../icon/bmi.png')} style={{ height: 50, width: 50, }} />
                            <Text style={{ color: '#5C0108', marginTop: 10, }}>BMI</Text>
                        </View>
                        <View>
                            <Shimmer autoRun={true} visible={this.state.visible} style={{ width: 50 }}>
                                <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#9B0914' }}>{bmi.toFixed(0)}</Text>
                            </Shimmer>
                        </View>
                    </View>
                </View>

                <View style={styles.menu}>
                    <TouchableOpacity
                        onPress={this.Health}
                        style={styles.menuItem}>
                        <Image source={require('../icon/health.png')} />
                        <Text style={{ fontSize: 15, color: '#740000' }}>Health</Text>
                    </TouchableOpacity>
                    <View style={styles.menuItem}>
                        <Image source={require('../icon/medicine.png')} />
                        <Text style={{ fontSize: 15, color: '#740000' }}>Medicine</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.Food}
                        style={styles.menuItem}>
                        <Image source={require('../icon/food.png')} />
                        <Text style={{ fontSize: 15, color: '#740000' }}>Food</Text>
                    </TouchableOpacity>
                    <View style={styles.menuItem}>
                        <Image source={require('../icon/sleep.png')} />
                        <Text style={{ fontSize: 15, color: '#740000' }}>Sleep</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Image source={require('../icon/exercise.png')} />
                        <Text style={{ fontSize: 15, color: '#740000' }}>Exercise</Text>
                    </View>
                    <View style={styles.menuItem}>
                        <Text style={{ fontSize: 15, color: '#740000' }}>Health</Text>
                    </View>
                </View>
                {/* <ScrollView style={styles.recordHistory}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 13 }}>
                        <Text style={{ fontSize: 20, color: '#520202', fontStyle: 'italic' }}> Record History </Text>
                        <Text style={{ fontSize: 20, color: '#520202', fontStyle: 'italic' }}> All > </Text>
                    </View>
                    <View style={{ marginHorizontal: 13 }}>
                        <FlatList
                            data={[
                                { key: 'Devin' },
                                { key: 'Dan' },
                                { key: 'Dominic' },
                                { key: 'Jackson' },
                                { key: 'James' },
                                { key: 'Joel' },
                                { key: 'John' },
                                { key: 'Jillian' },
                                { key: 'Jimmy' },
                                { key: 'Julie' },
                            ]}
                            renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                            style={{ borderBottomWidth: 1, borderBottomColor: 'gray', }}
                        />
                    </View>
                </ScrollView> */}
            </View >
        );
    }
}

export default Home;


const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    panel: {
        flexDirection: 'row',
        height: 165,
        width: 360,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        left: '6.7%',
        top: '15%',
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 7, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    panelInfo: {
        width: 85,
        height: 140,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    headerView: {
        flexDirection: 'row',
        marginTop: '10%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnAdd: {
        width: 51,
        height: 51,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 17
    },
    menu: {
        flexDirection: 'row',
        backgroundColor: '#F1F1F1',
        height: '40%',
        flexWrap: 'wrap',
        paddingTop: 70,
        justifyContent: 'space-evenly',
    },
    menuItem: {
        height: 99,
        width: 93,
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,

    },
    recordHistory: {
        height: '100%',
        width: '100%',
        backgroundColor: '#f1f1f1',
        marginBottom: 20,
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 18,
        marginTop: 5,
    },

});