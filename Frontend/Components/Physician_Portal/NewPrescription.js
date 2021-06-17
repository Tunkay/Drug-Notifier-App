/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/***************
 * Description:-
 * This screen rendered if the user wants to add a new prescription.A prescription can have
 * a list of drugs/medication.This screen provides user to input drug details and when submit
 * this class save the details into patient and database and schedule a push notification
 *  by function.schedulePushNotification()-here the start date is converted into milliseconds
 * and added to current date time iterating till endDate of drug.It contains all input
 * form validations and their respective handler to set the variable or invoke error message.
 * Upon successful submission it goes back to Prescription Detail.
 *****************/
import axios from 'axios';
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
//import { Header } from 'react-navigation-stack';
import * as Notifications from 'expo-notifications';
import CounterInput from 'react-native-counter-input';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import { HeaderBackButton } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../stylesheet/NewPrescriptionStyles';
import { addPrescription } from '../../config';

export default class NewPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      updateState: props.route.params.updatePrescriptionList,
      mrnNumber: props.route.params.patientId,
      drugName: '',
      drugDosage: 0,
      drugStartDate: new Date(),
      drugEndDate: new Date(),
      drugFrequency: 0,
      drugTimings: '',
      drugDescription: '',
      nameError: '',
      frequencyPlaceholderText: 'Select Frequency*',
      drugNameError: '',
      startDateError: '',
      endDateError: '',
      drugTimeError: '',
      drugFrequencyError: '',
      drugDescriptionError: '',
      doseError: '',
      startDate: '',
      endDate: '',
      validDose: true,
      error: true,
      footer: '',
      time: '',
      isModified: false,
    };
    //Creating reference function for the listener.
    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();
  }
  //Global Function Declaration
  /*global    showDateError: writable,handleStartDate,showEndDateError,handleEndate,showMrnError,
  showTimeError,handleDrugTime,showDescriptionError,handleDescription,alert,showNameError,handleName
  showDosageError,handleDose,addPrescription,handledate,ShowmrnError,handleMrn,checkRequiredInput
  ,handleMrn,showFrequencyError*/
  async componentDidMount() {
    this.state.navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => 
            Alert.alert(
            'Alert',
            'Changes are unsaved.Do you wish to Discard the changes?',
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
    //Asking permissions for the push notification and setting device token value.
    this.registerForPushNotificationsAsync().then((token) =>
      this.setState({ expoPushToken: token })
    );
    //Notification recieving Listener is set .
    this.notificationListener.current = Notifications.addNotificationReceivedListener(
      (notify) => {
        this.setState({ notification: notify });
      }
    );
    //Notification response recieving listener.
    this.responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );
  }
  async componentWillUnmount() {
    //Removing listener on unmounting.
    Notifications.removeNotificationSubscription(this.notificationListener);
    Notifications.removeNotificationSubscription(this.responseListener);
    //Updating the State by fetching the modified data from Database.
    this.state.updateState();
  }
  //Schedule Push Notification function.
  schedulePushNotification() {
    //current Date
    const today = new Date();
    //storing the difference between the current and start medication date.
    const dateDifference = this.state.drugStartDate.getDate() - today.getDate();
    //Getting the drug timing.
    const timemodified = this.state.time;
    //Setting the repeatition days between start and end days
    // converting the time from millisecond to days by dividing time by (1000 * 60 * 60 * 24).
    const repeat =
      (this.state.drugEndDate - this.state.drugStartDate) /
      (1000 * 60 * 60 * 24);
    today.setSeconds(0);
    //Adding the scheduled time to the current date and time.
    for (let iterator = 0; iterator <= repeat; iterator++) {
      //Converting all the time into millisecond unit.
      for (let frequent = 0; frequent < (24 / this.state.drugFrequency); frequent++) {
      const trigger =
        today.getTime() +
        (dateDifference * 60 * 60 * 24000) +
        /*adding no. of hours and minutes for setting correct hours to start drug date in 
        milliseconds by multiplying (60*60*1000) to hours and 60*1000 into minutes.*/
        Number((timemodified.getHours() - today.getHours()) * 60 * 60 * 1000) +
        Number((timemodified.getMinutes() - today.getMinutes()) * 1000 * 60) +
        //iterating for every 24 hours till end date.
        //frequency of drug.
        (frequent * this.state.drugFrequency * 60 * 60 * 1000) +
        (iterator * 24 * 60 * 60 * 1000);
      //System call to schedule the notification and the triggering time.
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body:
            `Drug Name :${this.state.drugName}\n ` +
            `Drug  Dosage${this.state.drugDosage.toString()}`,
          data: { data: 'goes here' },
        },
        trigger,
      });
    }
    }
  }
  //Getting permission for push notification.
  async registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }
  //Form Validation Functions.
  //Drug Name Handler
  showMrnError = (text) => {
    this.setState({ nameError: text });
  };
  handleMrn = (text) => {
    if (text === '') this.showMrnError('*Enter Mrn');
    else {
      this.showMrnError('');
    }
    this.setState({ mrnNumber: text });
  };
  //DrugName Handler.
  showNameError = (text) => {
    this.setState({ drugNameError: text });
  };
  handleName = (text) => {
    if (this.checkRequiredInput()) {
      this.setState({ isModified: true });
    }

    if (text === '') {
      this.setState({ error: true });
      this.showNameError('*Enter Name');
    } else {
      this.setState({ error: false });
      this.showNameError('');
    }
    if (this.state.mrnNumber === '') {
      this.showMrnError('*Enter Mrn');
    } else {
      this.showMrnError('');
    }
    this.setState({ drugName: text });
  };
  //Drug Start Handler and Show Error Function.
  showDateError = (text) => {
    this.setState({ startDateError: text });
  };
  handleStartDate = (dates) => {
    if (this.checkRequiredInput()) {
      this.setState({ isModified: true });
    }
    if (dates === '') {
      this.setState({ error: true });
      this.showDateError('*Enter Date');
    } else {
      this.setState({ error: false });
      this.showDateError('');
    }
    if (this.state.drugDosage === 0) this.showDosageError('*Enter dosage');
    else this.showDosageError('');
    const offsetDate = new Date(
      new Date(dates).getTime() + (new Date(dates).getTimezoneOffset() * 60000)
    );
    if (
      new Date(dates).getTime() <= this.state.drugEndDate.getTime() ||
      this.state.endDate === ''
    ) {
      this.setState({ drugStartDate: offsetDate });
      this.setState({
        startDate: `${offsetDate.getFullYear()}-${
          +offsetDate.getMonth() + 1
        }-${offsetDate.getDate()}`,
      });
    } else {
      this.showDateError('*Start date must be less than the end date ');
    }
  };
  //Drug End Date Handler and Show Error Function.
  showEndDateError = (text) => {
    this.setState({ endDateError: text });
  };
  handleEndate = (date) => {
    if (this.checkRequiredInput()) {
      this.setState({ isModified: true });
    }
    if (date === '') {
      this.setState({ error: true });
      this.showEndDateError('*Enter end Date');
    } else {
      this.setState({ error: false });
      this.showEndDateError('');
    }
    if (this.state.startDate === '') {
      this.showDateError('*Enter Start Date First');
    } else this.showDateError('');
    const offsetDate = new Date(
      new Date(date).getTime() + (new Date(date).getTimezoneOffset() * 60000)
    );
    this.setState({ drugEndDate: offsetDate });
    this.setState({
      endDate: `${offsetDate.getFullYear()}-${
        +offsetDate.getMonth() + 1
      }-${offsetDate.getDate()}`,
    });
  };
  //Drug Timings Handler and Show Error Function.
  showTimeError = (text) => {
    this.setState({ drugTimeError: text });
  };
  handleDrugTime = (event, selectedDate) => {
    //Show clock picker to select time.
    this.setState({ show: false });
    if (this.checkRequiredInput()) {
      this.setState({ isModified: true });
    }
    if (selectedDate === '') {
      this.setState({ error: true });
      this.showTimeError('*Enter Time');
    } else {
      this.setState({ error: false });
      this.showTimeError('');
    }
    if (this.state.drugEndDate === '') {
      this.showEndDateError('*Enter End Date');
    } else this.showEndDateError('');
    //setting drug timing
    if (
      new Date(selectedDate) > new Date() ||
      this.state.drugStartDate > new Date()
    ) {
      this.setState({ time: selectedDate });
      this.showTimeError('');
      this.setState({
        drugTimings: `${selectedDate
          .getHours()
          .toString()}:${selectedDate.getMinutes().toString()}:00`,
      });
    } else {
      this.showTimeError('Select valid time');
    }
  };
  //Drug Dosage Handler and Show Error Function.
  showDosageError = (text) => {
    this.setState({ doseError: text });
  };
  handleDose = (text) => {
    if (this.checkRequiredInput()) {
      this.setState({ isModified: true });
    }
    if (text === '') {
      this.setState({ error: true });
      this.showDosageError('*Enter Dosage');
    } else {
      const dose = text;
      let characters = 0;
      let validDose = true;
      for (characters = 0; characters < dose.length; characters++) {
        if (dose[characters] >= '0' && dose[characters] <= '9');
        else {
          validDose = false;
          break;
        }
      }
      if (validDose) {
        this.showDosageError('');
      } else {
        this.showDosageError('Dose must contains number only');
      }
      this.setState({ error: false });
    }
    //Checking if name is set or not.
    if (this.state.drugName === '') {
      this.showNameError('*Enter Name');
    } else this.showNameError('');

    this.setState({ drugDosage: text });
  };
  //Drug Description Handler and Show Error Function.
  showDescriptionError = (text) => {
    this.setState({ drugDescriptionError: text });
  };
  handleDescription = (text) => {
    if (this.checkRequiredInput()) {
      this.setState({ isModified: true });
    }
    if (text === '') {
      this.setState({ error: true });
      this.showDescriptionError('*Enter Description');
    } else {
      this.setState({ error: false });
      this.showDescriptionError('');
    }
    if (this.state.drugTimings === '') this.showTimeError('*Enter Time');
    else this.showTimeError('');
    this.setState({ drugDescription: text });
  };
  //showFrequency
  showFrequencyError = (text) => {
    this.setState({ drugFrequencyError: text });
  };
  checkRequiredInput = () => {
    if (
      this.state.drugName === '' ||
      this.state.drugDosage === 0 ||
      this.state.drugStartDate === '' ||
      this.state.drugEndDate === '' ||
      this.state.drugTimings === '' ||
      this.state.drugDescription === '' ||
      this.state.drugFrequency === 0
    ) {
      //Onclick Form Validation.
     /* if (this.state.drugName === '') this.showNameError('*Enter Name');
      if (this.state.drugDosage === 0) this.showDosageError('*Enter Dosage');
      if (this.state.startDate === '') this.showDateError('*Enter Date');
      if (this.state.endDate === '') this.showEndDateError('*Enter Date');
      if (this.state.drugTimings === '') this.showTimeError('*Enter Time ');
      if (this.state.drugDescription === '') {
        this.showDescriptionError('*Enter Description');
      }
      if (this.state.drugFrequency === 0) {
        this.showFrequencyError('*Frequency cant be 0');
      }*/
      return false;
    }
    return true;
  };
  //Adding Prescription.
  addPrescription = () => {
    //Checking if any of the fields is empty.
    if (this.checkRequiredInput()) {
      this.schedulePushNotification();
      const nav = this.state.navigation;
      //Converting the data into Json.
      const params = JSON.stringify({
        startDate: this.state.drugStartDate,
        endDate: this.state.drugEndDate,
        drug_id: 50,
        drugDosage: this.state.drugDosage,
        drugTime: this.state.drugTimings,
        drugs: [
          {
            description: this.state.drugDescription,
            startDate: this.state.drugStartDate,
            endDate: this.state.drugEndDate,
            drugTime: this.state.drugTimings,
            drugDosage: this.state.drugDosage,
            medName: this.state.drugName,
            drugFrequency: this.state.drugFrequency,
          },
        ],
      });
      axios
        .post(
          `${addPrescription}${this.state.mrnNumber}`,
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
          alert('Prescription added');
          nav.goBack('prescriptions');
        })
        .catch(() => {
          // handle error
         this.setState({ footer: 'Internal Server Error' });
        }); //end
    } else {
      //if empty show error message.
      this.setState({ footer: '*Please Fill in all the details.' });
    }
  };
  render() {
    //Setting min day for calendar.
    const minDay = new Date();
    return (
      <View style={styles.mainView}>
        <KeyboardAvoidingView style={styles.mainView} behavior="height">
          <View style={styles.container}>
            <ScrollView>
              <View>
                <Text style={styles.Label}>Drug Name</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.drugName}
                  underlineColorAndroid="transparent"
                  placeholder="Drug  Name*"
                  placeholderTextColor="#2f2f2f"
                  autoCapitalize="none"
                  onChangeText={this.handleName}
                />
              </View>
              <Text style={styles.errorMessage}>
                {this.state.drugNameError}
              </Text>
              <View>
                <Text style={styles.Label}>Drug Dosage</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.drugDosage}
                  underlineColorAndroid="transparent"
                  placeholder="Drug Dosage*"
                  placeholderTextColor="#2f2f2f"
                  autoCapitalize="none"
                  onChangeText={this.handleDose}
                />
              </View>
              <Text style={styles.errorMessage}>{this.state.doseError}</Text>
              <View>
                <Text style={styles.Label}>Drug Start Date</Text>
                <DatePicker
                  style={styles.datePicker}
                  date={this.state.startDate} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="Select Start date"
                  format="YYYY-MM-DD"
                  //setting minimum date as YYYY-MM-DD format.
                  minDate={`${minDay.getFullYear()}-${
                    minDay.getMonth() + 1
                  }-${minDay.getDate()}`}
                  maxDate="2030-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={styles.dateIcon}
                  onDateChange={this.handleStartDate}
                />
              </View>
              <Text style={styles.errorMessage}>
                {this.state.startDateError}
              </Text>
              <View>
                <Text style={styles.Label}>Drug End Date</Text>
                <DatePicker
                  style={styles.datePicker}
                  date={this.state.endDate} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="Select End date"
                  format="YYYY-MM-DD"
                  //setting minimum date as YYYY-MM-DD format.
                  minDate={`${this.state.drugStartDate.getFullYear()}-${
                    this.state.drugStartDate.getMonth() + 1
                  }-${this.state.drugStartDate.getDate()}`}
                  maxDate="2030-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={styles.dateIcon}
                  onDateChange={this.handleEndate}
                />
              </View>
              <Text style={styles.errorMessage}>{this.state.endDateError}</Text>
              <Text style={styles.Label}>Drug Frequency</Text>
              <View style={styles.drugFrequencyView}>
                <Text>{this.state.frequencyPlaceholderText}</Text>
                <CounterInput
                  style={styles.counterInputStyles}
                  horizontal
                  onChange={(counter) => {
                    this.setState({ drugFrequency: counter });
                    this.setState({
                      frequencyPlaceholderText: counter.toString(),
                    });
                    if (counter > 0) {
                      this.showFrequencyError('');
                    } else {
                      this.showFrequencyError('Frequency cant be less than 0');
                      this.setState({ error: true });
                    }
                  }}
                />
              </View>
              <Text style={styles.errorMessage}>
                {this.state.drugFrequencyError}
              </Text>
              <View />
              <Text style={styles.Label}>Drug Time</Text>
              <View>
                <View style={styles.bodyAlignment}>
                  <TextInput
                    style={styles.input}
                    value={this.state.drugTimings.slice(0, 5)}
                    underlineColorAndroid="transparent"
                    placeholder="Drug Timings(hh:mm:ss)*"
                    placeholderTextColor="#2f2f2f"
                    autoCapitalize="none"
                  />
                  {this.state.show && (
                    <DateTimePicker
                      value={new Date()}
                      mode="time"
                      display="clock"
                      onChange={this.handleDrugTime}
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ show: true });
                    }}
                  >
                    <Image
                      style={styles.setTimeButton}
                      source={require('../../assets/clock.jpg')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.errorMessage}>
                {this.state.drugTimeError}
              </Text>
              <View>
                <Text style={styles.Label}>Drug Description</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.drugDescription}
                  underlineColorAndroid="transparent"
                  placeholder="Drug Description*"
                  placeholderTextColor="#2f2f2f"
                  autoCapitalize="none"
                  onChangeText={this.handleDescription}
                />
              </View>
              <Text style={styles.errorMessage}>
                {this.state.drugDescriptionError}
              </Text>
            </ScrollView>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              disabled={!this.state.isModified}
              style={
                this.state.isModified ?
                styles.addDrugButton :
                styles.addDrugButtonDisabled}
              onPress={this.addPrescription}
            >
              <Text style={styles.buttonText}>Add Prescription</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.errorMessage}>{this.state.footer}</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
//StyleSheet
