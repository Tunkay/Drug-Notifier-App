/* Description-This is the first screen of the app.From this page ,user can navigate to
 respective dashboard page . It contains two backend calls one:
 1.checkPatient() for checking if user is patient or physician
 2.login() for navigating the user to thier respective screen
 It also covers form validation functions and textInput Handler and unregistered user can
 signup click which navigates to Register screen. */
import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../../stylesheet/LoginScreenStyle.js';
import { checkPatient, loginPage } from '../../config.js';

export default class LoginScreen extends Component {
  //Intializing the parameters
  state = {
    username: '',
    password: '',
    footerError: '',
    nameError: '',
    passwordError: '',
    checkUser: '',
    submitDisabled: true,
  };
  /* global state,checkPatient,setVariable,showFooterError,showNameError,handleName
  ,showPasswordError
  handlePassword,login */
  //Existence of patient
  checkPatient(username) {
    axios
      .post(`${checkPatient}${username}`, {
        timeout: 20,
      })
      .then((response) => {
        // handle success
        //setting if the user is patient or not
        this.setState({ checkUser: response.data });
      })
      .catch((error) => {
        console.log(error.message);
        // handle error
      });
  }
  setVariable(data) {
    //checkuser variable is boolean flag to identify patient or physician.
    this.setState({ checkUser: data });
    return;
  }
  showFooterError = (text) => {
    this.setState({ footerError: text });
  };
  //Show username error.
  showNameError = (text) => {
    this.setState({ nameError: text });
  };
  //Username input Handler
  handleName = (text) => {
    if (text === '') {
      this.showNameError('*Enter Username');
    } else {
      this.showNameError('');
    }
    this.setState({ username: text });
  };
  //Show Password error.
  showPasswordError = (text) => {
    this.setState({ passwordError: text });
  };
  //Password Handler.
  handlePassword = (text) => {
    if (text === '') {
      this.showPasswordError('*Enter Password');
    } else {
      this.showPasswordError('');
    }
    if (this.state.username === '') {
      this.setState({ submitDisabled: true });
      this.showNameError('*Enter Username');
    } else {
      this.setState({ submitDisabled: false });
      this.showNameError('');
    }
    this.setState({ password: text });
  };
  //Invoked on Login button event
  login(username, password) {
    //Checking which actor wants to login.
    this.checkPatient(username);
    if (username === '') {
      this.showNameError('*Enter Username');
    }
    if (password === '') {
      this.showPasswordError('*Enter Password');
    }
    if (username === '' && password === '') {
      this.showFooterError('');
    } else {
      //axios call for the fetching and validating user by REST API.
      axios
        .get(`${loginPage}${username}/${password}`, {
          timeout: 20,
        })
        .then((response) => {
          if (response.status === 200) {
            this.showFooterError('');
            if (this.state.checkUser === 'patient') {
              this.props.navigation.navigate('drawerNavigation', {
                username,
                actor: 'patient',
              });
            } else if (this.state.checkUser === 'physician') {
              this.props.navigation.navigate('drawerNavigation', {
                username,
                actor: 'physician',
              });
            } else {
              this.props.navigation.navigate('drawerNavigation', {
                username,
                actor: 'admin',
              });
            }
          }
        })
        .catch((error) => {
          // handle error
          console.log(error.message);
          if (error.message === 'Request failed with status code 500') {
            this.showFooterError('*Username or Password is incorrect');
          }
          if (error.message === 'Request failed with status code 400') {
          this.showFooterError('*Username or Password is incorrect');
         } else {
            this.showFooterError('*Link Down.Try After some Time');
          }
        });
    }
  }
  //Login UI rendered here
  //onpress attribute of Login Button invoke the navigation to registration screen.
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Username*"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleName}
        />
        <View>
          <Text style={styles.message}>{this.state.nameError}</Text>
        </View>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password*"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />
        <View>
          <Text style={styles.message}>{this.state.passwordError}</Text>
        </View>
        <TouchableOpacity
          disabled={this.state.submitDisabled}
          style={
            this.state.submitDisabled
              ? styles.submitButtonDisabled
              : styles.submitButton
          }
          onPress={() => {
            this.checkPatient(this.state.username);
            this.login(this.state.username, this.state.password);
          }}
        >
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <View style={styles.bodyAlignment}>
            <Text style={styles.footer}>Not a registered user?</Text>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => this.props.navigation.navigate('register')}
            >
              <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
              style={styles.forgetPasswordText}
              onPress={() => this.props.navigation.navigate('forgetPassword')}
        >
              <Text style={styles.forgetPasswordText}>Forget Password?</Text>
            </TouchableOpacity>
        <View>
          <Text style={styles.message}> {this.state.footerError}</Text>
        </View>
      </View>
    );
  }
}
