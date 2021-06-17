/***************
 * Description:-
 * This screen rendered if the user identifier is patient.It contains various textIput Fields
 * which thier respective handler and validations .The main functionality to add patient
 * to the database using onlogin() function which contains backend call to save all
 * data provided in the field.After the registration user would be navigated to the loginScreen
 *****************/
import React, { Component } from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import { HeaderBackButton } from '@react-navigation/stack';
import styles from '../../stylesheet/RegisterPhysicianStyle';
import { getAllRegisteredUsers, registerPhysician, registerUser } from '../../config';

export default class RegisterPhysician extends Component {
  //Constructor of the class fetching the Parent props and intialising the parameters
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      adminId: props.route.params.id,
      usrname: this.props.username,
      updateState: props.route.params.refreshPhysicianList,
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
      gender: '',
      age: '',
      phone: '',
      physicianSpecilization: '',
      physicianQualifiacation: '',
      qualificationError: '',
      specializationError: '',
      ageError: '',
      nameError: '',
      phoneError: '',
      addressError: '',
      diseaseError: '',
      selectedValue: '',
      genderError: '',
      birthDate: '',
      buttonDisable: true,
      isClearButtonDisabled: true,
    };
  }
  /*global showNameError,handleName,showGenderError,handleGender
    showAgeError,handleAge,showPhoneError,handlePhone,
    showAddressError,checkRequiredInput,handleAddress
    showDiseaseError,handleDisease,showFinalError,showSpecializationError
    showQualificationError,handleQualification,handleSpecialization,alert
    handleAllUsers,showUserNameError,handleUserName,showPasswordError,
    handlePassword,showConfirmPasswordError,handleConfirmPassword,isButtonDisable
    componentWillUnmount,clearUsername,setIsClearButtonDisabled*/
  //Show Name Error.
  componentDidMount() {
    if (!this.state.isModified) {
      this.state.navigation.setOptions({
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
  componentWillUnmount() {
    this.state.updateState();
  }
  clearUsername = () => {
    this.setState({
      username: '',
      password: '',
      confirmPassword: '',
      userNameError: '',
      passwordError: '',
      confirmPasswordError: '',
      buttonDisable: true,
      passwordErrorFlag: false,
      name: '',
      gender: '',
      age: '',
      phone: '',
      physicianSpecilization: '',
      physicianQualifiacation: '',
      qualificationError: '',
      specializationError: '',
      ageError: '',
      nameError: '',
      phoneError: '',
      addressError: '',
      diseaseError: '',
      selectedValue: '',
      genderError: '',
      birthDate: '',
      isClearButtonDisabled: true,
    });
  };
  //Show Gender Error Function.
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
    if (this.checkRequiredInput()) {
      this.setState({ buttonDisable: false });
    }
    this.setIsClearButtonDisabled(false);
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
    if (this.checkRequiredInput()) {
      this.setState({ buttonDisable: false });
    }
    this.setIsClearButtonDisabled(false);
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
    if (this.checkRequiredInput()) {
      this.setState({ buttonDisable: false });
    }
    this.setIsClearButtonDisabled(false);
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
        } else {
          this.showPasswordError('*Password should be greater than 6');
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
    if (this.checkRequiredInput()) {
      this.setState({ buttonDisable: false });
    }
    this.setIsClearButtonDisabled(false);
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
  showGenderError = (text) => {
    this.setState({ genderError: text });
  };
  //Gender Input  Handler.
  handleGender = (text) => {
    if (this.checkRequiredInput()) {
      this.setState({ buttonDisable: false });
    }
    if (text === '') this.showGenderError('*Select gender');
    else {
      this.showGenderError('');
    }
    if (this.state.name === '') {
      this.showNameError('*Enter Name');
    } else {
      this.showNameError('');
    }
    this.setState({ selectedValue: text });
  };
  //Show Age Error.
  showAgeError = (text) => {
    this.setState({ ageError: text });
  };
  //Age Input  Handler.
  handleAge = (dateString) => {
    if (this.checkRequiredInput()) {
      this.setState({ buttonDisable: false });
    }
    this.setIsClearButtonDisabled(false);
    console.log(this.props.isClearButtonDisabled);
    this.setState({ birthDate: dateString });
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    this.setState({ age });
    console.log(age);
    /*if (age === '') this.showAgeError('*Enter Age');
    else {
      let characters = 0;
      let validAge = true;
      for (characters = 0; characters < age.length; characters++) {
        if (age[characters] >= '0' && age[characters] <= '9');
        else {
          validAge = false;
          break;
        }
      }
      if (validAge) {
        this.showAgeError('');
      } else {
        this.showAgeError('Age must contains number only');
      }
      if (this.state.selectedValue === '') {
        this.showGenderError('*Select Gender');
      } else {
        this.showGenderError('');
      }
      if (this.state.name === '') {
        this.showNameError('*Enter Name');
      } else {
        this.showNameError('');
      }
    }
    this.setState({ age });*/
  };
  //Show Phone Error Function.
  showPhoneError = (text) => {
    this.setState({ phoneError: text });
  };
  //Phone Input Handler.
  handlePhone = (phone) => {
    if (this.checkRequiredInput()) {
      this.setState({ buttonDisable: false });
    }
    this.setIsClearButtonDisabled(false);
    let characters = 0;
    let validPhone = true;
    for (characters = 0; characters < phone.length; characters++) {
      if (phone[characters] >= '0' && phone[characters] <= '9');
      else {
        validPhone = false;
        break;
      }
    }
    if (validPhone) {
      if (phone.length === 10) {
        this.showPhoneError('');
      } else {
        this.showPhoneError('Phone must be 10 digit number');
      }
    } else {
      this.showPhoneError('phone must contains number only');
    }
    if (this.state.age === '') {
      this.showAgeError('*Enter Age');
    }
    this.setState({ phone });
  };
  //Qualification error.
  showQualificationError = (text) => {
    this.setState({ qualificationError: text });
  };
  //Qualification input handler.
  handleQualification = (text) => {
    if (this.checkRequiredInput()) {
      this.setState({ buttonDisable: false });
    }
    this.setIsClearButtonDisabled(false);
    if (text === '') this.showQualificationError('*Enter Qualification');
    else {
      this.showQualificationError('');
    }
    if (this.state.phone === '') {
      this.showPhoneError('*Enter phone');
    }
    this.setState({ physicianQualifiacation: text });
  };
  showSpecializationError = (text) => {
    this.setState({ specializationError: text });
  };
  //Specification input handler.
  handleSpecialization = (text) => {
    if (this.checkRequiredInput()) {
      this.isButtonDisable(false);
    }
    this.setIsClearButtonDisabled(false);
    if (text === '') this.showSpecializationError('*Enter Specification');
    else {
      this.showSpecializationError('');
    }
    if (this.state.physicianQualifiacation === '') {
      this.showQualificationError('*Enter Qualification');
    } else {
      this.showQualificationError('');
    }
    this.setState({ physicianSpecilization: text });
  };
  //Checking function if the details are empty
  checkRequiredInput = () => {
    if (
      this.state.name === '' ||
      this.state.selectedValue === '' ||
      this.state.age === '' ||
      this.state.phone === '' ||
      this.state.username === '' ||
      this.state.password === '' ||
      this.state.physicianQualifiacation === '' ||
      this.state.physicianSpecilization === ''
    ) {
      //Onclick Form Validation.
      return false;
    }
    return true;
  };
  /**
   *
   *
   *
   */
  onRegister() {
    //Intializing the parameters
    const { selectedValue, age, phone } = this.state;
    const name = this.state.name;
    const username = this.state.username;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const phoneLength = this.state.phone.length;
    //Checking the Requirements before pushing or getting from database
    if (this.checkRequiredInput()) {
      if (!isNaN(age)) {
        if (phoneLength === 10) {
          if (password === confirmPassword && this.state.passwordErrorFlag) {
            //Creating physician Json object for pushing in the Physician Table
            const params = JSON.stringify({
              name,
              gender: selectedValue,
              physician_Age: age,
              physician_Phone: phone,
              physician_Qualifiacation: this.state.physicianQualifiacation,
              physician_Specilization: this.state.physicianSpecilization,
              userName: this.state.username,
            });

            //Connection with Backend using axios.
            //Registering the filled details of patient in the Table.
            axios
              .post(
                `${registerPhysician}${this.state.adminId}`,
                params,
                {
                  headers: {
                    'content-type': 'application/json',
                  },
                  timeout: 40,
                }
              )
              .then(() => {
                // handle success
                alert('Registered');
                this.props.navigation.goBack();
              })
              .catch((error) => {
                // handle error
                alert('Error Occured');
                this.showFinalError(error.message);
              });
            //Json object for the Login Table
            const param = JSON.stringify({
              username,
              password,
            });
            axios
              .post(`${registerUser}`, param, {
                headers: {
                  'content-type': 'application/json',
                },
                timeout: 40,
              })
              .then(() => {
                // handle success
              })
              .catch((error) => {
                // handle error
                if (error.message === 'timeout of 40ms exceeded') {
                  this.showFinalError(
                    '*Internal Server Error.Try After some Time'
                  );
                }
              });
          } else {
            this.showFinalError('*Please Fill all the details correctly');
          } //Inner if end
        }
      } //outer if end
    } else {
      this.showFinalError('*Please Fill all the details');
    }
  } //onRegister end
  //Rendering the FrontEnd
  render() {
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
              <DropDownPicker
                items={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                ]}
                defaultIndex={0}
                placeholder="Select Gender"
                containerStyle={styles.datePickerStyles}
                onChangeItem={(item) => this.handleGender(item.value)}
              />
              <Text style={styles.errormessage}>{this.state.genderError}</Text>
              <View>
              <DatePicker
                    style={styles.datePicker}
                    date={this.state.birthDate} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Select Birth date"
                    format="YYYY-MM-DD"
                    //setting minimum date as YYYY-MM-DD format.
                    minDate="1970-01-01"
                    maxDate="2030-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={styles.dateIcon}
                    onDateChange={this.handleAge}
              />
              </View>
              <Text style={styles.errormessage}>{this.state.ageError}</Text>
              <View>
                <TextInput
                  value={this.state.phone}
                  onChangeText={this.handlePhone}
                  placeholder={'Physician Phone*'}
                  placeholderTextColor="#2f2f2f"
                  keyboardType={'numeric'}
                  style={styles.input}
                />
              </View>
              <Text style={styles.errormessage}>{this.state.phoneError}</Text>
              <View>
                <TextInput
                  value={this.state.physicianQualifiacation}
                  onChangeText={this.handleQualification}
                  placeholder={'Physician Qualifiacation*'}
                  placeholderTextColor="#2f2f2f"
                  style={styles.input}
                />
              </View>
              <Text style={styles.errormessage}>
                {this.state.qualificationError}
              </Text>
              <View>
                <TextInput
                  value={this.state.physicianSpecilization}
                  onChangeText={this.handleSpecialization}
                  placeholder={'Physician Specilization*'}
                  placeholderTextColor="#2f2f2f"
                  style={styles.input}
                />
              </View>
              <Text style={styles.errormessage}>
                {this.state.specializationError}
              </Text>
              <View style={styles.space} />
            </ScrollView>
          </View>

          <View style={styles.footer}>
            <View style={styles.btn}>
              <Button
                disabled={this.state.buttonDisable}
                title={'Register'}
                onPress={() => {
                  this.onRegister();
                }}
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
