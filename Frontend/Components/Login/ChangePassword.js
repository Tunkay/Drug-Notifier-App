import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../stylesheet/changePasswordStyle.js';
import { passwordChange } from '../../config';

export default class changePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
          navigation: this.props.navigation,
          phoneNumber: props.route.params.number,
          username: props.route.params.username,
          password: '',
          confirmPassword: '',
          passwordError: '',
          confirmPasswordError: '',
        };
    }

    showPasswordError = (text) => {
      this.setState({ passwordError: text });
    };
    //Password handler
    handlePassword = (text) => {
      if (text === '') {
        this.showPasswordError('*Enter Password');
      } else {
        /*Checking if password is strong or not by checking 3 checks i.e
        1.Password should contain numbers.
        2.Password must contain a special character.
        3.Password must have a capital Letter.
        */
        const string = this.state.password;
        let characters = 0;
        let validPassword = true;
        const passwordChecks = new Array(3).fill(false);
        for (characters = 0; characters < string.length; characters++) {
          if (string[characters] >= '0' && string[characters] <= '9') {
            passwordChecks[0] = true;
          }
          if (
            (string[characters] >= '!' && string[characters] <= '/') ||
            (string[characters] >= ':' && string[characters] <= '@')
          ) {
            passwordChecks[1] = true;
          }
          if (string[characters] >= 'A' && string[characters] <= 'Z') {
            passwordChecks[2] = true;
          }
        }
        for (let index = 0; index < 3; index++) {
          if (passwordChecks[index] === false) {
            validPassword = false;
            break;
          } else {
            validPassword = true;
          }
        }
        if (validPassword) {
          if (string.length >= 6) {
            this.showPasswordError('');
            this.setState({ passwordErrorFlag: true });
          }
        } else {
          this.showPasswordError(
            '*Must be 6 character long and must contain atleast a number,a special' +
              ' character,a capital letter'
          );
        }
      }
      this.setState({ password: text });
      this.setState({ confirmPassword: '' });
    };
    /*global showConfirmPasswordError ,handleConfirmPassword,handlePassword,showPasswordError
    ,alert*/
    //Show Password Error Function.
    showConfirmPasswordError = (password) => {
      this.setState({ confirmPasswordError: password });
    };
    //Confirm Password field handler
    handleConfirmPassword = (password) => {
      if (password === '') {
        this.showConfirmPasswordError('*Enter Password');
      } else if (password !== this.state.password) {
        this.showConfirmPasswordError('*Password Not Equal');
      } else {
        this.showConfirmPasswordError('');
      }
      this.setState({ confirmPassword: password });
      if (this.state.password === '') {
        this.showPasswordError('*Enter Password');
      }
    };
    onChangePassword(password, confirmPassword) {
      //Checking which actor wants to login.
      let phoneNumber = '';
      if (this.state.phoneNumber.length === 13) {
        phoneNumber = this.state.phoneNumber.slice(3, 13);
      } else {
        phoneNumber = this.state.phoneNumber.slice(2, 12);
      }
      console.log(phoneNumber);
      const username = this.state.username;
      if (password === '') {
        this.showPasswordError('*Enter Username');
      }
      if (confirmPassword === '') {
        this.showConfirmPasswordError('*Enter Password');
      }
      if (password === '' || confirmPassword === '' || password !== confirmPassword) {
       alert('Password fields must be equal ');
      }
      if (this.state.passwordError !== '') {
        alert(this.state.passwordError);
      } else {
        //axios call for the fetching and validating user by REST API.
        axios
          .get(`${passwordChange}/${username}/${password}/${confirmPassword}`, {
            timeout: 20,
          })
          .then((response) => {
            if (response.status === 200) {
              //this.showFooterError('');
              Alert.alert(
              'Alert',
              'Password changed Successfully.Please Login',
              [
                {
                  text: 'OK',
                  onPress: () =>
                    this.state.navigation.reset({
                      index: 0,
                      routes: [{ name: 'loginScreen' }],
                    }),
                },
              ]
            );
            }
          })
          .catch((error) => {
            // handle error
            console.log(error.message);
            if (error.message === 'Request failed with status code 500') {
              alert('*Username or Password is incorrect');
            }
            if (error.message === 'Request failed with status code 400') {
            alert('*Username or Password is incorrect');
           } else {
              alert('*Link Down.Try After some Time');
            }
          });
      }
    }    
render() {
    return (
<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '50%' }}>
<View>
<TextInput
  style={styles.input}
  value={this.state.password}
  underlineColorAndroid="transparent"
  placeholder="New Password*"
  placeholderTextColor="#2f2f2f"
  autoCapitalize="none"
  onChangeText={this.handlePassword}
/>
</View>
<Text style={styles.errormessage}>
{this.state.passwordError}
</Text>
<View >
<TextInput
  style={styles.input}
  value={this.state.confirmPassword}
  underlineColorAndroid="transparent"
  placeholder="Confirm Password*"
  placeholderTextColor="#2f2f2f"
  autoCapitalize="none"
  onChangeText={this.handleConfirmPassword}
/>
</View>
<Text style={styles.errormessage}>
{this.state.confirmPasswordError}
</Text>
<Button
title={'Change Password'}
onPress={() => {
this.onChangePassword(this.state.password, this.state.confirmPassword);
}}
/>
</View>);
}
}
