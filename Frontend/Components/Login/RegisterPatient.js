/***************
 * Description:-
 * This screen rendered if the user identifier is patient.It contains various textIput Fields
 * which thier respective handler and validations .The main functionality to add patient
 * to the database using onlogin() function which contains backend call to save all
 * data provided in the field.After the registration user would be navigated to the loginScreen
 *****************/
import React, { Component } from 'react';
import { Alert, TextInput, View, Text } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import styles from '../../stylesheet/RegisterPatient.js';
import { registerPatient, registerUser } from '../../config.js';

export default class RegisterPatient extends Component {
  //Constructor of the class fetching the Parent props and intialising the parameters
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      name: '',
      gender: '',
      age: '',
      phone: '',
      address: '',
      disease: '',
      ageError: '',
      nameError: '',
      phoneError: '',
      addressError: '',
      diseaseError: '',
      selectedValue: '',
      genderError: '',
      birthDate: '',
      buttonDisable: this.props.buttonDisable,
      isClearButtonDisabled: this.props.isClearButtonDisabled,
      defaultValue: 0,
    };
  }
  clearForm = () => {
    this.setState({
      selectedValue: '',
      birthDate: '',
      name: '',
      gender: '',
      age: '',
      phone: '',
      address: '',
      disease: '',
      defaultValue: 0,
    });
  };
  /*global showNameError,handleName,showGenderError,handleGender
   showAgeError,handleAge,showPhoneError,handlePhone,
   showAddressError,checkRequiredInput,handleAddress
   showDiseaseError,handleDisease,showFinalError,showSpecializationError
   showQualificationError,handleQualification,handleSpecialization,alert
   clearForm*/
  //Show Name Error.

  //Show Gender Error Function.
  showGenderError = (text) => {
    if (this.checkRequiredInput()) {
      this.setState({ buttonDisable: false });
    }
    this.setState({ genderError: text });
  };
  //Gender Input  Handler.
  handleGender = (text) => {
    if (this.checkRequiredInput()) {
      this.props.isButtonDisable(false);
    }
    if (text === '') this.showGenderError('*Select gender');
    else {
      this.showGenderError('');
    }
    if (this.props.name === '') {
      this.props.showNameError('*Enter Name');
    } else {
      this.props.showNameError('');
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
      this.props.isButtonDisable(false);
    }
    this.state.isClearButtonDisabled(false);
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
  };
  //Show Phone Error Function.
  showPhoneError = (text) => {
    this.setState({ phoneError: text });
  };
  //Phone Input Handler.
  handlePhone = (phone) => {
    if (this.checkRequiredInput()) {
      this.props.isButtonDisable(false);
    }
    this.state.isClearButtonDisabled(false);
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
  //Show Address Error Function.
  showAddressError = (text) => {
    this.setState({ addressError: text });
  };
  //Address Input  Handler.
  /**
   *
   * @param {*} text
   */
  handleAddress = (text) => {
    if (this.checkRequiredInput()) {
      this.props.isButtonDisable(false);
    }
    this.state.isClearButtonDisabled(false);
    if (text === '') this.showAddressError('*Enter Address');
    else {
      this.showAddressError('');
    }
    if (this.state.phone === '') {
      this.showPhoneError('*Enter Phone');
    }
    this.setState({ address: text });
  };
  //Show Disease Error Function.
  showDiseaseError = (text) => {
    this.setState({ ailment: text });
  };
  //Disease Input Handler.
  handleDisease = (text) => {
    if (this.checkRequiredInput()) {
      this.props.isButtonDisable(false);
    }
    this.state.isClearButtonDisabled(false);
    if (text === '') this.showDiseaseError('*Enter Disease');
    else {
      this.showDiseaseError('');
    }
    if (this.state.address === '') {
      this.showAddressError('*Enter Address');
    } else {
      this.showAddressError('');
    }
    this.setState({ disease: text });
  };
  //Checking function if the details are empty
  checkRequiredInput = () => {
    if (
      this.props.name === '' ||
      this.state.selectedValue === '' ||
      this.state.age === '' ||
      this.state.phone === '' ||
      this.state.address === '' ||
      this.state.disease === '' ||
      this.props.username === '' ||
      this.props.password === ''
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
    const { selectedValue, age, phone, address, disease } = this.state;
    const name = this.props.name;
    const username = this.props.username;
    const password = this.props.password;
    const confirmPassword = this.props.confirmPassword;
    const phoneLength = this.state.phone.length;
    const navigation = this.props.navigation;
    //Checking the Requirements before pushing or getting from database
    if (this.checkRequiredInput()) {
      if (!isNaN(age)) {
        if (phoneLength === 10) {
          if (password === confirmPassword && this.props.passwordErrorFlag) {
            //Creating physician Json object for pushing in the Patient Table
            const params = JSON.stringify({
              userName: this.props.username,
              name,
              gender: selectedValue,
              age,
              phone,
              address,
              disease,
            });

            //Connection with Backend using axios.
            //Registering the filled details of patient in the Table.
            axios
              .post(`${registerPatient}`, params, {
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
                alert(error.message);
              }); //end
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
                Alert.alert(
                  'Alert',
                  'You are Successfully Registered.Please Login',
                  [
                    {
                      text: 'OK',
                      onPress: () =>
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'loginScreen' }],
                        }),
                    },
                  ]
                );
              })
              .catch((error) => {
                // handle error
                if (error.message === 'timeout of 40ms exceeded') {
                  this.props.showFinalError(
                    '*Internal Server Error.Try After some Time'
                  );
                }
              });
          } else {
            this.props.showFinalError('*Please Fill all the details correctly');
          } //Inner if end
        }
      } //outer if end
    } else {
      this.props.showFinalError('*Please Fill all the details');
    }
  } //onRegister end
  //Rendering the FrontEnd
  render() {
    return (
      <View>
        <View style={styles.dropDownView}>
          <DropDownPicker
            items={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            defaultIndex={this.state.defaultValue}
            placeholder="Select Gender"
            containerStyle={{ height: 40, width: 220 }}
            onChangeItem={(item) => this.handleGender(item.value)}
          />
        </View>
        <Text style={styles.errormessage}>{this.state.genderError}</Text>
        <View style={styles.container}>
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
        <View style={styles.container}>
          <TextInput
            value={this.state.phone}
            onChangeText={this.handlePhone}
            placeholder={'Patient Phone*'}
            placeholderTextColor="#2f2f2f"
            keyboardType={'numeric'}
            style={styles.input}
          />
        </View>
        <Text style={styles.errormessage}>{this.state.phoneError}</Text>
        <View style={styles.container}>
          <TextInput
            value={this.state.address}
            onChangeText={this.handleAddress}
            placeholder={'Patient Address*'}
            placeholderTextColor="#2f2f2f"
            style={styles.input}
          />
        </View>
        <Text style={styles.errormessage}>{this.state.addressError}</Text>
        <View style={styles.container}>
          <TextInput
            value={this.state.disease}
            onChangeText={this.handleDisease}
            placeholder={'Patient Disease*'}
            placeholderTextColor="#2f2f2f"
            style={styles.input}
          />
        </View>
        <Text style={styles.errormessage}>{this.state.ailment}</Text>
      </View>
    );
  }
}
