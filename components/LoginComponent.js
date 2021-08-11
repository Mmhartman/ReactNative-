import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login'
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
                        color='#5637DD'
                    />
                </View>
            </View>
        );
    }
}
// SET UP A STYLESHEET 
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default Login;
