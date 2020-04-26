import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView, ImageBackground, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NeomorphBox } from 'react-native-neomorph-shadows';
import Loader from './Loader';
import Shimmer from '../shimmer';


const screenWidth = Math.round(Dimensions.get('window').width);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const HEADER_MIN_HEIGHT = 60;
const HEADER_MAX_HEIGHT = 235;

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodMenu: [],
            recipeMenu: [],
            Keyword: '',
            isRender: true,
            loading: false,
        };
        this._animatedValue = new Animated.Value(0);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: '',
            headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
            headerLeft: () =>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => navigation.navigate('Home')}>
                    <Image
                        style={{ width: 15, height: 15 }}
                        source={require('../icon/back.png')}
                    />
                </TouchableOpacity>
            ,
        };
    };


    btnSearch = () => {
        if (this.state.Keyword != '') {
            this.setState({ loading: false, isRender: false });
            const keyword = this.state.Keyword
            const Url = 'https://api.edamam.com/api/food-database/parser?app_id=ca747d07&app_key=722fabaee32b8118f7b1cb2e32b137cf&ingr=' + this.state.Keyword
            fetch(Url)
                .then((response) => response.json())
                .then((responseJson) => {
                    //Alert.alert(JSON.stringify(responseJson.hints))
                    this.setState({
                        foodMenu: responseJson.hints,
                        loading: false
                    });

                    setTimeout(() => {
                        this.setState({ isRender: true })
                    }, 2000);

                })
                .catch((error) => {
                    console.error(error);
                    this.setState({ loading: false })
                })

            const UrlRecipe = 'https://api.edamam.com/search?app_id=a455e1f6&app_key=323258acbf94e36e1da2c655b8a6018b&q=' + this.state.Keyword
            fetch(UrlRecipe)
                .then((response) => response.json())
                .then((responseJson) => {
                    //Alert.alert(JSON.stringify(responseJson.hints))
                    this.setState({
                        recipeMenu: responseJson.hits,
                    });

                })
                .catch((error) => {
                    console.error(error);
                    this.setState({ loading: false })
                })
        } else {
            this.setState({ foodMenu: [], recipeMenu: [] })
        }
    }

    renderFood = () => {
        return this.state.foodMenu.map((item, index) => {
            return (
                <View key={index} style={{ alignItems: 'center', marginVertical: 10, marginHorizontal: 10, }}>
                    <View style={styles.foodMenu}>
                        <Shimmer autoRun={true} visible={this.state.isRender}>
                            <Text numberOfLines={1} style={styles.txtTitle}>{item.food.label}</Text>
                            <Text style={styles.txtTipe}>{item.food.category}</Text>
                        </Shimmer>
                    </View>
                    <View style={styles.foodContent}>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                item.food.nutrients.ENERC_KCAL ?
                                    <>
                                        <Text style={styles.txtLabelContent}>Energy : </Text><Text style={styles.txtContent}>{item.food.nutrients.ENERC_KCAL.toFixed(1)} kcl</Text>
                                    </>
                                    : null
                            }
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                item.food.nutrients.CHOCDF ?
                                    <>
                                        <Text style={styles.txtLabelContent}>Carbs : </Text><Text style={styles.txtContent}>{item.food.nutrients.CHOCDF.toFixed(1)} g</Text>
                                    </> : null
                            }
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                item.food.nutrients.PROCNT ?
                                    <>
                                        <Text style={styles.txtLabelContent}>Protein : </Text><Text style={styles.txtContent}>{item.food.nutrients.PROCNT.toFixed(1)} g</Text>
                                    </> : null
                            }
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                item.food.nutrients.FAT ?
                                    <>
                                        <Text style={styles.txtLabelContent}>Fat : </Text><Text style={styles.txtContent}>{item.food.nutrients.FAT.toFixed(1)} g</Text>
                                    </> : null
                            }
                        </View>
                    </View>
                    <View style={styles.foodFooter}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text numberOfLines={1} style={styles.txtFooter}>Barand by  {item.food.brand || 'None'}</Text>
                        </View>
                    </View>
                </View>
            );
        });
    }



    renderRecipe() {
        if (this.state.recipeMenu.length != 0) {
            return this.state.recipeMenu.map((item, index) => {
                return (

                    <View key={index}
                        style={{ alignItems: 'center', marginVertical: 10, marginHorizontal: 10, borderTopLeftRadius: 5 }}>
                        <View style={styles.foodMenu}>
                            <Text numberOfLines={1} style={styles.txtTitle}>{item.recipe.label}</Text>
                            <Text style={[styles.txtTipe, { fontSize: 18 }]}>Calories : {item.recipe.calories.toFixed(1)}</Text>
                        </View>
                        <ScrollView
                            style={[styles.foodContent, { height: 250, }]}>
                            {
                                item.recipe.ingredients ?
                                    item.recipe.ingredients.map(function (name, index1) {
                                        return (
                                            <View style={{ flexDirection: 'column' }} key={index1}>
                                                <Text style={styles.txtLabelContent}>{name.text}</Text>
                                            </View>
                                        )
                                    })

                                    : null
                            }

                        </ScrollView>
                        <View style={styles.foodFooter}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text numberOfLines={1} style={styles.txtFooter}>Barand by  {item.recipe.source || 'None'}</Text>
                            </View>
                        </View>
                    </View>
                );
            });
        }
    }

    render() {
        const header = this._animatedValue.interpolate({
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });
        const imgBack = this._animatedValue.interpolate({
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });
        const imageTranslate = this._animatedValue.interpolate({
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });
        const imgOpacity = this._animatedValue.interpolate({
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        const btnOpacity = this._animatedValue.interpolate({
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        const background = this._animatedValue.interpolate({
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: ["rgba(255,255,255, 0)", "rgba(106, 2, 2, 1)"],
            extrapolate: 'clamp'
        });

        const event = Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        y: this._animatedValue
                    }
                }
            }
        ])

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.header, { height: header, backgroundColor: background }]}>
                    <AnimatedImageBackground
                        source={require('../icon/healthy-food-png-10.png')}
                        style={[styles.imgBackground, { opacity: imgOpacity, transform: [{ translateY: imageTranslate }] }]}>
                        <AnimatedLinearGradient
                            locations={[0, 1.0]}
                            colors={["rgba(255,255,255, 0)", "rgba(106, 2, 2, 0.75)"]}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: header
                            }}
                        />
                    </AnimatedImageBackground>

                    <TextInput
                        style={styles.txtInput}
                        underlineColorAndroid="transparent"
                        placeholder="Keyword Food"
                        placeholderTextColor="rgba(9,2,1,0.5)"
                        autoCapitalize="none"
                        onChangeText={(Keyword) => this.setState({ Keyword })}
                    />
                    <AnimatedTouchable
                        onPress={this.btnSearch}
                        style={[styles.btnSearch, { opacity: btnOpacity }]}>
                        <Text style={{ fontSize: 20, color: 'white', marginLeft: 10, marginRight: 10, }}>Search</Text>
                    </AnimatedTouchable>
                </Animated.View>
                <ScrollView
                    onScroll={event} scrollEventThrottle={16}
                >
                    <Shimmer autoRun={true} visible={this.state.isRender} style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, fontSize: 20, }}>Foods</Text>
                    </Shimmer>
                    {
                        this.renderFood()
                    }

                    {
                        this.state.isRender ?
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, fontSize: 20, }}>Recipes</Text>
                            : null
                    }
                    {
                        this.state.isRender ?
                            this.renderRecipe()
                            : null
                    }
                </ScrollView>
                <Loader
                    loading={this.state.loading} />

            </View>
        );
    }
}

export default Food;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
    },
    header: {
        height: 235,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBackground: {
        height: 235,
        width: '100%',
        position: 'absolute',
        top: 0
    },
    btnBack: {
        backgroundColor: 'white',
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 8,
        top: 0,
    },
    txtInput: {
        margin: 8,
        height: 50,
        width: '80%',
        borderColor: '#000',
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: 'white',
        opacity: 0.80,
        marginTop: 50,
        color: '#6A0202',
        fontSize: 20,
    },
    txtTitle: {
        marginLeft: 20,
        marginRight: 15,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    txtTipe: {
        marginLeft: 20,
        marginTop: 1,
        marginBottom: 5,
        color: 'white',
        fontSize: 15,
    },
    foodMenu: {
        height: 70,
        width: '100%',
        backgroundColor: '#C7111D',
        opacity: 0.76,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
    },
    foodContent: {
        height: 125,
        width: '100%',
        backgroundColor: '#C7111D',
        opacity: 0.76,
    },
    txtLabelContent: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 15,
        marginTop: 3,
    },
    txtContent: {
        fontSize: 20,
        fontWeight: '900',
        color: 'black',
        marginLeft: 15,
        marginTop: 3,
    },
    foodFooter: {
        height: 40,
        width: '100%',
        backgroundColor: '#C7111D',
        opacity: 0.76,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopColor: 'white',
        borderTopWidth: 0.5,

    },
    txtFooter: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 5,
        marginLeft: 15,
        color: 'white'
    },
    btnSearch: {
        height: 40,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A0202',
        borderRadius: 5,
    }
})
