import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Shimmer from '../shimmer';
import PushNotification from "react-native-push-notification"
import OneSignal from 'react-native-onesignal';
import Carousel, { Pagination } from 'react-native-snap-carousel';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            isLoggedIn: true,
            visible: false,
            carouselItems: [
                {
                    title: "Item 1"
                },
                {
                    title: "Item 2"
                },
                {
                    title: "Item 3"
                },
                {
                    title: "Item 4"
                },
                {
                    title: "Item 5"
                }
            ]
        };

        OneSignal.setLogLevel(4, 0);

        OneSignal.inFocusDisplaying(2);

        // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
        OneSignal.init("4cdb23b8-97a7-478c-bca4-43f85558e0ee", { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });

        // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
        //OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened.bind(this));
        OneSignal.addEventListener('ids', this.onIds);

    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
        setTimeout(() => {
            this.props.navigation.navigate('Health')
        }, 1000);
    }

    onIds(device) {
        console.log(device.userId); // Get user id from one signal 
    }

    testLocalNofication = () => {
        PushNotification.localNotification({

            title: "My Notification Title", // (optional)
            message: "My Notification Message", // (required)
        });
    }

    testScheduleNotification = () => {
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: "My Schedule Notification Message", // (required)
            date: new Date(Date.now() + 10 * 1000), // in 60 secs
        });
    }

    componentDidMount() {
        this.retrieveItem();

        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                //   notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: Platform.OS === 'ios'
        });
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

    _renderItem({ item, index }) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
                <Text style={{ color: 'black' }} >{item.title}</Text>
            </View>
        )
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
                    <TouchableOpacity
                        onPress={this.testLocalNofication}
                        style={styles.menuItem}>
                        <Image source={require('../icon/medicine.png')} />
                        <Text style={{ fontSize: 15, color: '#740000' }}>Medicine</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.Food}
                        style={styles.menuItem}>
                        <Image source={require('../icon/food.png')} />
                        <Text style={{ fontSize: 15, color: '#740000' }}>Food</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.testScheduleNotification}
                        style={styles.menuItem}>
                        <Image source={require('../icon/sleep.png')} />
                        <Text style={{ fontSize: 15, color: '#740000' }}>Sleep</Text>
                    </TouchableOpacity>
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
                <Carousel
                    data={this.state.carouselItems}
                    sliderWidth={400}
                    itemWidth={350}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={3000}
                    renderItem={this._renderItem}
                />
            </View >
        );
    }
}

export default Home;


const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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