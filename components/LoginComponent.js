import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator'; // TASK 1 

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { baseUrl } from '../shared/baseUrl';



// SET I.P TABBED NAVIGATION 
class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }


    handleLogin() {
        console.log(JSON.stringify(this.state)); // EVENT HANDLER//
        if (this.state.remember) {

            // IMPLEMENT SECURE STORE //
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ // WE'LL USE JSON STRINGIFY METHOD W/ USER & PSWRD TAKEN FROM THE COMPONENT STATE. REMEMBER: ALL SEC METHOD RETURN A PROMISE THAT WILL REJECT IF THERES AN ERROR//
                    
                    username: this.state.username,
                    password: this.state.password
                })
                ).catch(error => console.log('Could not save user info', error)); // CHECK REJECTED PROMISE USING CATCH BLOCK. ANY ERROR MESSAGE WILL BE AUTOMATICALLY PASSED IN AS AN ARGUMENT. LOG ERROR TO THE CONSOLE //

            } else { // IF CHECKBOX IS NOT CHECKED, DELETE ANY USER INFO IN THE SECURE STORE BY ADDING ELSE BLOCK // 
                SecureStore.deleteItemAsync('userinfo').catch(
                    error => console.log('Could not delete user info', error)
                    );
                }
            }
    // ENSURE THAT THE USER INFO IS RETRIEVED FROM THE SECURE STORE BY USING COMPONENT DID MOUNT LIFE CYCLE METHOD //
    componentDidMount() {
        SecureStore.getItemAsync('userinfo') // GET ITEM ASYNC METHOD // 
            .then(userdata => {
                const userinfo = JSON.parse(userdata); // JSON PARSE METHOD & STORING JS OBJCT INSIDE USERINFO VARIABLE 
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true}) // CHECKBOX WAS CHECKED 
                }
            });
    }

    // SET UP LOG IN FORM //
    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})} // USING SET STATE //
                    value={this.state.username} // ALWAYS REFLECTS THE STATE WHICH MAKES IT A CONTROLLED COMPONENT //
                    containerStyle={styles.formInput} // CONTAINER STYLE PROPS //
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember} // CONTROLLED BY LOGIN COMPONENTS STATE PROPERTY OF REMEMBER
                    onPress={() => this.setState({remember: !this.state.remember})} // TO CHANGE THE STATE TO THE OPPOSITE //
                    containerStyle={styles.formCheckbox}
                />
                 <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleLogin()}
                            title='Login'
                            icon={
                                <Icon
                                    name='sign-in'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                />
                            }
                            buttonStyle={{backgroundColor: '#5637DD'}}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
                        type='clear'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='blue'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        titleStyle={{color: 'blue'}}
                    />
                </View>
            </View>
        );
    }
}


// REGISTER TAB COMPONENT 
class RegisterTab extends Component {
    // ADD REGISTRATION FORM 
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        };
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }

    // IMG PICKER API //
    getImageFromCamera = async () => {
        // 2 SETS OF PERMISSIONS BEC. SOME CASES YOU NEED TO ACCESS THE CAMERA BUT NOT THE CAMERA ROLL //
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);


        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({ // HOLD THE LOCAL URI THE FILE PATH OF THE CAPTURED IMG //
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) { // IF NOT CAPTURED IMG CXLD //
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }
    //Task 1

        processImage = async ( imgUri ) => {
          const processedImage = await ImageManipulator.manipulateAsync(imgUri,
            [{ resize: { width: 400 } } ],
            [{ format: ImageManipulator.SaveFormat.PNG }]
            );

            console.log(processedImage);
            this.setState({ imageUrl: processedImage.uri });
            
        }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                {username: this.state.username, password: this.state.password}))
                .catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch(
                error => console.log('Could not delete user info', error)
            );
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>

                        <Image
                            source={{uri: this.state.imageUrl}} // INITIALIZED TO RETRIEVE THE LOGO IMAGE SERVED FROM JSON SERVER AS IT SOURCE
                            loadingIndicatorSource={require('./images/logo.png')} // LOADING INDICATOR SOURCE PROP, LOCAL IMAGE FILE PATH, NOT SERVER BUT LOCALLY
                            style={styles.image} // ALSO ADD TO STYLESHEET
                        />


                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                    </View>

                    <Input
                        placeholder='Username'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={username => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={{type: 'font-awesome', name: 'key'}}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='First Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={firstname => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={lastname => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                />
                            }
                            buttonStyle={{backgroundColor: '#5637DD'}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator(
    {
        Login: LoginTab,
        Register: RegisterTab
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#5637DD',
            inactiveBackgroundColor: '#CEC8FF',
            activeTintColor: '#fff',
            inactiveTintColor: '#808080', // GREY 
            labelStyle: {fontSize: 16}
        }
    }
);






// SET UP A STYLESHEET 
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default Login;