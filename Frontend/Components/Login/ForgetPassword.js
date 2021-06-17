/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAwareScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Constants from 'expo-constants';
import axios from 'axios';
//import * as Expo from 'expo';
import firebase from '../firebase';
//import { Card } from 'react-native-elements';
//import axios from 'axios';
//import { Appbar } from 'react-native-paper';
//import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../stylesheet/ForgetPasswordStyles';
import { getAllRegisteredUsers, getPatient, getPhone } from '../../config';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      phoneNumber: '',
      code: '',
      users: [],
      verificationId: null,
      buttonDisable: true,
      userPhone: '',
      username: '',
      usernameError: '',
      phoneError: '',
    };
    this.recaptchaVerifier = React.createRef();
  }
  componentDidMount() {
    axios
      .get(`${getAllRegisteredUsers}`, { timeout: 20 })
      .then((response) => {
        // handle success
        this.handleAllUsers(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
      });
  }
  handleAllUsers = (data) => {
    this.setState({ users: data });
  };
  setButtonDisable = (value) => {
    this.setState({ buttonDisable: value });
  };
  /*global sendVerification,confirmCode,alert,setButtonDisable,handleConfirmCode,handleUsername,
handleAllUsers,handlePhoneNumber,getPatientContact*/
  handleUsername = (text) => {
    console.log(this.state.users.length);
    this.setState({ username: text });
    let isUserFound = false;
    for (let index = 0; index < this.state.users.length; index++) {
      if (text === this.state.users[index]) {
        isUserFound = true;
        break;
      }
    }
    if (!isUserFound) {
      this.setState({ usernameError: '*User not found' });
    } else {
      this.setState({ usernameError: '' });
    }
  };
  sendVerification = () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(
          this.state.phoneNumber,
          this.recaptchaVerifier.current
        )
        .then((text) => {
          this.setState({ verificationId: text });
          console.log('success');
          if (this.state.usernameError === '' && this.state.phoneError === '') {
            this.setButtonDisable(false);
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  confirmCode = () => {
    const pno = this.state.phoneNumber;
    const username = this.state.username;
    const credential = firebase.auth.PhoneAuthProvider.credential(
      this.state.verificationId,
      this.state.code
    );
    try {
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          this.props.navigation.navigate('changePassword', {
            number: pno,
            username,
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert(error);
    }
  };
  handleConfirmCode = (text) => {
    if (this.state.phoneNumber === '') {
      this.setState({ buttonDisable: true });
    } else {
      this.setState({ code: text });
    }
  };
  getPatientContact = () => {
    const username = this.state.username;
    axios
      .get(`${getPhone}${username}`, { timeout: 20 })
      .then((response) => {
        // handle success
        this.setState({ userPhone: response.data });
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
      });
    return this.state.userPhone;
  };
  handlePhoneNumber = (text) => {
    if (text === '') {
      this.setState({ phoneError: '*Enter phone' });
    } else {
      this.setState({ phoneError: '' });
      const phone = this.getPatientContact();
      if (text.length >= 13) {
        const slicedPhone = text.slice(3, 13);
        if (String(phone) === String(slicedPhone)) {
          this.setState({ phoneError: '' });
        } else {
          this.setState({ phoneError: '*Incorrect Phone Number' });
        }
      } else if (text.length === 12) {
        if (String(phone) === String(text.slice(2, 12))) {
          this.setState({ phoneError: '' });
        } else {
          this.setState({ phoneError: '*Incorrect Phone Number' });
        }
      }
    }
    this.setState({ phoneNumber: text });
  };
  render() {
    return (
      <View>
        <View>
          <FirebaseRecaptchaVerifierModal
            ref={this.recaptchaVerifier}
            firebaseConfig={Constants.manifest.extra.firebase}
          />
          <TextInput
            placeholder="Username"
            onChangeText={this.handleUsername}
            style={styles.textInput}
          />
          <Text style={styles.errormessage}>{this.state.usernameError}</Text>
          <TextInput
            placeholder="Phone Number"
            onChangeText={this.handlePhoneNumber}
            keyboardType="phone-pad"
            autoCompleteType="tel"
            style={styles.textInput}
          />
          <Text style={styles.errormessage}>{this.state.phoneError}</Text>
          <TouchableOpacity
            style={styles.sendVerification}
            onPress={this.sendVerification}
          >
            <Text style={styles.buttonText}>Send Verification</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Confirmation Code"
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={this.handleConfirmCode}
          />
          <TouchableOpacity
            disabled={this.state.buttonDisable}
            style={
              this.state.buttonDisable
                ? styles.sendCodeDisabled
                : styles.sendCode
            }
            onPress={this.confirmCode}
          >
            <Text style={styles.buttonText}>Check Verification</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
