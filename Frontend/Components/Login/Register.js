/***********
 *Description- This class contains two child props namely RegisterPatient and Register Physician
But the username ,password is same for both user.The functionality covered here is to register the 
username which is unique and call respective form for patient or physician. There is one backend 
call  to check the username already exist or not in componentDidMount.This class navigates to 
RegisterPatient or Register physician class with different props.Also contains form validation
like password and confirm password must be equal etc.
************/
import axios from 'axios';
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderBackButton } from '@react-navigation/stack';
import RegisterPatient from './RegisterPatient';
import styles from '../../stylesheet/Register';
import { getAllRegisteredUsers } from '../../config';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.clearUsername = this.clearUsername.bind(this); //Username variable handler
    //Intialising
    this.state = {
      name: '',
      username: '',
      password: '',
      confirm: '',
      userNameError: '',
      passwordError: '',
      confirmPasswordError: '',
      userList: [],
      buttonDisable: true,
      isClearButtonDisabled: true,
      footerError: '',
    };
    this.child = React.createRef();
  }
  /*global clearUsername,handleName,showUserNameError,handleUserName,showPasswordError
  ,handlePassword
  showConfirmPasswordError,handleConfirmPassword, handleAllUsers,showNameError,showFinalError
  isButtonDisable,setIsClearButtonDisabled*/
  //OnLoading Retrieving the user details From Database.
  componentDidMount() {
    if (!this.state.isModified) {
      this.props.navigation.setOptions({
        headerLeft: (props) => (
          <HeaderBackButton
            {...props}
            onPress={() => 
              Alert.alert(
              'Alert',
              'Do you wish to Discard the changes?',
              [
                {
                  text: 'OK',
                  onPress: () =>
                   this.props.navigation.goBack(),
                },
                {
                  text: 'cancel',
                },
              ]
            )
            }
          />)
        });
      }
    const setDict = this.handleAllUsers;
    axios
      .get(`${getAllRegisteredUsers}`, { timeout: 20 })
      .then((response) => {
        // handle success
        setDict(response.data);
      })
      .catch(() => {
        // handle error
      });
  }
  //clearing the fields
  clearUsername = () => {
    this.setState({
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      userNameError: '',
      passwordError: '',
      confirmPasswordError: '',
      buttonDisable: true,
      passwordErrorFlag: false,
    });
    this.child.current.clearForm();
  };
  isButtonDisable = (value) => {
    this.setState({ buttonDisable: value });
  };
  setIsClearButtonDisabled = (value) => {
    this.setState({ isClearButtonDisabled: value });
  }
  showNameError = (text) => {
    this.setState({ nameError: text });
  };
  //Username Input  Handler.
  handleName = (text) => {
    if (this.child.current.checkRequiredInput()) {
      this.isButtonDisable(false);
    }
    this.setState({ isClearButtonDisabled: false });
    if (text === '') this.showNameError('*Enter Name');
    else {
      this.showNameError('');
    }
    this.setState({ name: text });
  };
  //Storing the Database data into the list
  handleAllUsers = (data) => {
    this.setState({ userList: data });
  };
  //Show UserName Error Function.
  showUserNameError = (text) => {
    this.setState({ userNameError: text });
  };
  //Username handler
  handleUserName = (text) => {
    if (this.child.current.checkRequiredInput()) {
      this.state.isButtonDisable(false);
    }
    this.setState({ isClearButtonDisabled: false });
    const dictionary = this.state.userList;
    if (text === '') {
      this.showUserNameError('*Enter Username');
    } else {
      let validUser = false;
      for (let index = 0; index < dictionary.length; index++) {
        if (dictionary[index] === text) {
          validUser = true;
        }
      }
      if (validUser === false) {
        this.showUserNameError('');
      } else {
        this.showUserNameError('*UserExists.Please Select Another');
      }
    }
    this.setState({ username: text });
  };
  //Show Password Error Function.
  showPasswordError = (text) => {
    this.setState({ passwordError: text });
  };
  //Password handler
  handlePassword = (text) => {
    if (this.child.current.checkRequiredInput()) {
      this.state.isButtonDisable(false);
    }
    this.setState({ isClearButtonDisabled: false });
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
    if (this.state.username === '') {
      this.showUserNameError('*Enter name');
    } else {
      this.showUserNameError('');
    }
  };
  //Show Password Error Function.
  showConfirmPasswordError = (password) => {
    this.setState({ confirmPasswordError: password });
  };
  //Confirm Password field handler
  handleConfirmPassword = (password) => {
    if (this.child.current.checkRequiredInput()) {
      this.state.isButtonDisable(false);
    }
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
  //Show Final Error
  showFinalError = (text) => {
    this.setState({ footerError: text });
  };
  //Rendering the Register page
  render() {
    //Function to invoke the child components with the parameters
    const renderSelectedScreen = () => {
      //Rendering child components with props.
      const { username, password, confirmPassword } = this.state;
      return (
        <RegisterPatient
          name={this.state.name}
          showNameError={this.showNameError}
          passwordErrorFlag={this.state.passwordErrorFlag}
          showFinalError={this.showFinalError}
          username={username}
          password={password}
          confirmPassword={confirmPassword}
          clearUsername={this.clearUsername}
          navigation={this.props.navigation}
          showUserNameError={this.showUserNameError}
          showPasswordError={this.showPasswordError}
          showConfirmPasswordError={this.showConfirmPasswordError}
          isButtonDisable={this.isButtonDisable}
          isClearButtonDisabled={this.setIsClearButtonDisabled}
          ref={this.child}
        />
      );
    };
    //Parent UI
    return (
      <View style={styles.mainView}>
        <KeyboardAvoidingView style={styles.mainView} behavior="height">
          <View style={styles.container}>
            <ScrollView>
              <View>
                <TextInput
                  value={this.state.name}
                  onChangeText={this.handleName}
                  placeholder={'Name*'}
                  placeholderTextColor="#2f2f2f"
                  style={styles.input}
                />
              </View>
              <Text style={styles.errormessage}>{this.state.nameError}</Text>
              <View>
                <TextInput
                  style={styles.input}
                  value={this.state.username}
                  underlineColorAndroid="transparent"
                  placeholder="Username*"
                  placeholderTextColor="#2f2f2f"
                  autoCapitalize="none"
                  onChangeText={this.handleUserName}
                />
              </View>
              <Text style={styles.errormessage}>
                {this.state.userNameError}
              </Text>
              <View>
                <TextInput
                  style={styles.input}
                  value={this.state.password}
                  underlineColorAndroid="transparent"
                  placeholder="Password*"
                  placeholderTextColor="#2f2f2f"
                  autoCapitalize="none"
                  onChangeText={this.handlePassword}
                />
              </View>
              <Text style={styles.errormessage}>
                {this.state.passwordError}
              </Text>
              <View>
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
              {renderSelectedScreen()}
            </ScrollView>
          </View>
          <View style={styles.footer}>
            <View style={styles.btn}>
              <Button
                disabled={this.state.buttonDisable}
                title={'Register'}
                onPress={() => this.child.current.onRegister()}
              />
              <View style={styles.space} />
              <Button
                disabled={this.state.isClearButtonDisabled}
                title={'Clear'}
                onPress={this.clearUsername}
              />
            </View>
            <Text style={styles.errormessage}>{this.state.footerError}</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
