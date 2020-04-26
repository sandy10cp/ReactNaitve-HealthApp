import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import Home from './src/component/Home';
import SplashScreen from './src/component/SplashScreen';
import SignUp from './src/component/SignUp';
import Login from './src/component/Login';
import Food from './src/component/Food';
import Profile from './src/component/Profile';
import Health from './src/component/Health';

const Stack = createStackNavigator()

const MyTransition = {
	gestureDirection: 'horizontal',
	transitionSpec: {
		open: TransitionSpecs.TransitionIOSSpec,
		close: TransitionSpecs.TransitionIOSSpec,
	},
	headerStyleInterpolator: HeaderStyleInterpolators.forFade,
}
// function AppRender() {
// 	const isLoggedIn = true;
// 	return (

// 	)
// }

class App extends Component {
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

	renderUserIsLogin = () => {

		if (this.state.user.length == 0) {
			this.setState({ isLoggedIn: false })
		} else {
			const isLogin = JSON.stringify(this.state.user.isLogin);
			this.setState({ isLoggedIn: isLogin })
		}
		//Alert.alert(JSON.stringify(this.state.isLoggedIn))
	}



	render() {
		//Alert.alert(JSON.stringify(this.state.isLoggedIn))
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="SplashScreen">
					<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: '', headerShown: false }} />
					<Stack.Screen name="Home" component={Home} options={{ title: '', headerShown: false }} />
					<Stack.Screen name="Login" component={Login} options={{ title: '', headerShown: false }} />
					<Stack.Screen name="SignUp" component={SignUp} options={{ title: '', headerShown: false }} />
					<Stack.Screen name="Food" component={Food} options={{ title: '', headerShown: true, headerTransparent: true, MyTransition}} />
					<Stack.Screen name="Profile" component={Profile} options={{ title: '', headerShown: true, headerTransparent: true, MyTransition }} />
					<Stack.Screen name="Health" component={Health} options={{ title: '', headerShown: true, headerTransparent: true, MyTransition }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export default App;

