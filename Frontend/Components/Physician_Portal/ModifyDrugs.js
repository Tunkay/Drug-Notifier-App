/* eslint-disable global-require */
/***************
 * Description:-
 * This screen rendered if the user wants to modify drug.This screen provides user to
 * input drug details and when submit this class modify the details into database and
 * schedule a push notification by function. schedulePushNotification()-here the start date
 * is converted into milliseconds and added to current date time iterating till endDate of
 * drug.It contains all input form validations and their respective handler to set the
 * variable or invoke error message.
 *****************/
import axios from 'axios';
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  LogBox,
  Platform,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import CounterInput from 'react-native-counter-input';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import { HeaderBackButton } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../stylesheet/NewPrescriptionStyles';
import { modifyDrug } from '../../config';

LogBox.ignoreAllLogs();
//Show The Notification alert and handle notification function.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default class ModifyDrugs extends Component {
  constructor(props) {
    super(props);
    //Intialization of variables and props from previous screen.
    this.state = {
      navigation: this.props.navigation,
      drugList: props.route.params.data, //Drug Data from Drug Detail Page.
      //Updater Function which will update the values after data is modified.
      updateState: props.route.params.updateAction, //update screen once drug is modified.
      drugName: '',
      drugDosage: 0,
      drugStartDate: new Date(),
      drugEndDate: new Date(),
      drugTimings: '',
      drugDescription: '',
      drugFrequency: 0,
      drugNameError: '',
      startDateError: '',
      frequencyPlaceholderText: 'Select Frequency*',
      endDateError: '',
      timeError: '',
      drugDescriptionError: '',
      drugFrequencyError: '',
      doseError: '',
      error: false,
      footer: '',
      isTimer: false,
      time: new Date(),
      expoPushToken: '', //token for the push notification
      notification: false, //notification prop.
      isModified: false,
    };
    //Creating reference function for the listener.
    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();
  }
  //Global Function Declaration
  /*global   showDateError: writable,handleStartDate,showEndDateError,handleEnDate
  showTimeError,handleDrugTime,showDescriptionError,handleDescription,checkRequiredInput, 
  showFrequencyError,alert,backAction*/
  async componentDidMount() {
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
    //Mounting the component with fetched Data into the text fields.
    const drugs = this.state.drugList;
    this.setState({ drugName: drugs.medName });
    this.setState({
      drugStartDate: new Date(
        new Date(this.state.drugList.startDate).getTime() +
          //Syncing with the time zone by adding appropriate time in miliseconds.
         (new Date(this.state.drugList.startDate).getTimezoneOffset() * 60000)
      ),
    });
    this.setState({ drugFrequency: drugs.drugFrequency });
    this.setState({ frequencyPlaceholderText: drugs.drugFrequency.toString() });
    this.setState({ drugDosage: this.state.drugList.drugDosage });
    this.setState({
      drugEndDate: new Date(
        new Date(this.state.drugList.endDate).getTime() +
          //Syncing with the time zone by adding appropriate time in miliseconds.
          (new Date(this.state.drugList.endDate).getTimezoneOffset() * 60000)
      ),
    });
    this.setState({ time: this.state.drugList.drugTime });
    this.setState({ drugTimings: this.state.drugList.drugTime });
    this.setState({ drugDescription: this.state.drugList.description });
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
        alert(response);
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
  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
  //Schedule Push Notification function.
  schedulePushNotification() {
    const today = new Date();
    //Converting the time difference between today's date and start date into milliseconds.
    const dateDifference =
      (this.state.drugStartDate.getDate() - today.getDate()) * 60 * 60 * 24000;
    //Getting Drug Timings.
    const timeModified = this.state.drugTimings.split(':');
    //Setting the repeatition till the endate by counting the days to complete medication.
    const repeat =
      (this.state.drugEndDate - this.state.drugStartDate) /
      (1000 * 60 * 60 * 24);
    //Seconds is kept 0 to recieve the notification at the start of scheduled time.
    today.setSeconds(0);
    /*Adding the scheduled time to the current date and time till the completion of drug
    by iterating through no of days between drug end date and start date.*/
    for (let iterator = 0; iterator <= repeat; iterator++) {
      //Setting trigger time for notification.
      for (
        let frequent = 0;
        frequent < 24 / this.state.drugFrequency;
        frequent++
      ) {
        const trigger = new Date(
          today.getTime() +
            //adding no of days from today date when drug starts in milliseconds unit.
            dateDifference +
            /*adding no. of hours and minutes for setting correct hours to start drug date in 
        milliseconds by multiplying (60*60*1000) to hours and 60*1000 into minutes.*/
            Number((timeModified[0] - today.getHours()) * 60 * 60 * 1000) +
            Number((timeModified[1] - today.getMinutes()) * 1000 * 60) +
            //frequency of drug.
            (frequent * this.state.drugFrequency * 60 * 60 * 1000) +
            //iterating for every 24 hours till end date.
            (iterator * 24 * 60 * 60 * 1000)
        );
        //Scheduling the notification.
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Reminder',
            body: `Drug Name :${this.state.drugName}
          Drug  Dosage:${this.state.drugDosage.toString()}`,
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
  checkRequiredInput = () => {
    if (
      this.state.drugName === '' ||
      this.state.drugDosage === 0 ||
      this.state.drugStartDate === '' ||
      this.state.drugEndDate === '' ||
      this.state.drugTimings === '' ||
      this.state.drugDescription === ''
    ) {
      //Onclick Form Validation.
      if (this.state.drugName === '') this.showNameError('*Enter Name');
      if (this.state.drugDosage === 0) this.showDosageError('*Enter Dosage');
      if (this.state.date === '') this.showDateError('*Enter Date');
      if (this.state.edate === '') this.showEndDateError('*Enter Date');
      if (this.state.drugTimings === '') this.showTimeError('*Enter Time ');
      if (this.state.drugDescription === '') {
        this.showDescriptionError('*Enter Description');
      }
      if (this.state.drugFrequency === 0) {
        this.showFrequencyError('*Frequency cant be 0');
      }
      return false;
    }
    return true;
  };
  //Adding Drug to prescription by accessing the backend.
  /*global modifyDrug: writable */
  modifyDrug = () => {
    //Scheduling the time for push notification.
    this.schedulePushNotification();
    //Checking if any of the fields is empty.
    if (!this.state.error) {
      const sdate = this.state.drugStartDate;
      //Navigator prop.
      const nav = this.state.navigation;
      //Converting the data into Json.
      const params = JSON.stringify({
        description: this.state.drugDescription,
        startDate: sdate,
        endDate: this.state.drugEndDate,
        drugTime: this.state.drugTimings,
        drugDosage: this.state.drugDosage,
        medName: this.state.drugName,
        drugFrequency: this.state.drugFrequency,
      });
      //Axios Call.
      axios
        .put(
          `${modifyDrug}${this.state.drugList.id}`,
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
          alert('Drug modified to the prescription');
          this.setState({ flag: false });
          nav.goBack('drugDetail');
        })
        .catch(() => {
          // handle error
          this.setState({ footer: 'Internal Server Error' });
        }); //end
    } else {
      //Setting Footer error if fields is empty.
      this.setState({ footer: 'Please Fill in all the details.' });
    }
  };
  //Form Validation Functions.
  //Drug Name Handler
  /*global showNameError: writable*/
  showNameError = (text) => {
    this.setState({ drugNameError: text });
  };
  /*global handleName: writable */
  handleName = (text) => {
    this.setState({ isModified: true });
    if (text === '') {
      this.setState({ error: true });
      this.showNameError('*Enter Name');
    } else {
      this.setState({ error: false });
      this.showNameError('');
    }
    this.setState({ drugName: text });
  };
  //Drug Dosage Handler and Show Error Function.
  /*global  showDosageError: writable */
  showDosageError = (text) => {
    this.setState({ doseError: text });
  };
  /*global  handledose: writable */
  handledose = (text) => {
    this.setState({ isModified: true });
    if (text === '') {
      this.setState({ error: true });
      this.showDosageError('*Enter Dosage');
    } else {
      const dose = text;
      let characters = 0;
      let flag = true;
      for (characters = 0; characters < dose.length; characters++) {
        if (dose[characters] >= '0' && dose[characters] <= '9');
        else {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.setState({ error: false });
        this.showDosageError('');
      } else {
        this.setState({ error: true });
        this.showDosageError('Dose must contains number only');
      }
    }
    //Invoking Name error if not set
    if (this.state.drugName === '') {
      this.showNameError('*Enter Name');
    } else {
      this.showNameError('');
    }

    this.setState({ drugDosage: text });
  };
  //Drug Start Handler and Show Error Function.
  showDateError = (text) => {
    this.setState({ startDateError: text });
  };
  handleStartDate = (dates) => {
    this.setState({ isModified: true });
    if (dates === '') {
      this.setState({ error: true });
      this.showEndDateError('*Enter end Date');
    } else {
      this.setState({ error: false });
      this.showEndDateError('');
    }
    const offsetDate = new Date(
      new Date(dates).getTime() + (new Date(dates).getTimezoneOffset() * 60000)
    );
    if (new Date(dates).getTime() <= this.state.drugEndDate.getTime()) {
      this.showDateError('');
      this.setState({ drugStartDate: offsetDate });
    } else {
      this.showDateError('*Start date must be less than the end date ');
    }
  };
  //Drug End Date Handler and Show Error Function.
  showEndDateError = (text) => {
    this.setState({ endDateError: text });
  };
  handleEnDate = (date) => {
    this.setState({ isModified: true });
    if (date === '') {
      this.setState({ error: true });
      this.showEndDateError('*Enter end Date');
    } else {
      this.setState({ error: false });
      this.showEndDateError('');
    }
    //Invoking Start error if not set
    if (this.state.drugStartDate === '') {
      this.showDateError('*Enter Start Date');
    } else {
      this.showDateError('');
    }
    const offsetDate = new Date(
      new Date(date).getTime() + (new Date(date).getTimezoneOffset() * 60000)
    );
    this.setState({ drugEndDate: offsetDate });
  };
  //Drug Timings Handler and Show Error Function.
  showTimeError = (text) => {
    this.setState({ timeError: text });
  };
  handleDrugTime = (event, selectedDate) => {
  //Show calendar picker.
    this.setState({ isTimer: false });
    this.setState({ isModified: true });
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
    if (
      new Date(selectedDate).getTime() > new Date().getTime() ||
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
  //Drug Description Handler and Show Error Function.
  showDescriptionError = (text) => {
    this.setState({ drugDescriptionError: text });
  };
  handleDescription = (text) => {
    this.setState({ isModified: true });
    if (text === '') {
      this.setState({ error: true });
      this.showDescriptionError('*Enter Description');
    } else {
      this.setState({ error: false });
      this.showDescriptionError('');
    }
    //Invoking Time error if not set
    if (this.state.drugTimings === '') {
      this.showTimeError('*Enter Time');
    } else {
      this.showTimeError('');
    }
    this.setState({ drugDescription: text });
  }; //Form Validation Function end.
  //showFrequency
  showFrequencyError = (text) => {
    this.setState({ drugFrequencyError: text });
  };
  //Frontend Rendering Function.
  render() {
    //Setting minimum day of calendar as today.
    const minday = new Date();
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
                  placeholder={this.state.drugName}
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
                  placeholder={this.state.drugDosage.toString()}
                  placeholderTextColor="#2f2f2f"
                  autoCapitalize="none"
                  onChangeText={this.handledose}
                />
              </View>
              <Text style={styles.errorMessage}>{this.state.doseError}</Text>
              <View>
                <Text style={styles.Label}>Drug Start Date</Text>
                <View>
                  <View style={styles.bodyAlignment}>
                    <DatePicker
                      style={styles.datePicker}
                      date={this.state.drugStartDate} //initial date from state
                      mode="date" //The enum of date, datetime and time
                      placeholder="Select Start date"
                      utcOffset={0}
                      format="YYYY-MM-DD"
                      //setting minimum date as YYYY-MM-DD format.
                      minDate={`${minday.getFullYear()}-${
                        //
                        minday.getMonth() + 1
                      }-${minday.getDate()}`}
                      maxDate="2030-01-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={styles.dateIcon}
                      onDateChange={this.handleStartDate}
                    />
                  </View>
                </View>
                <Text style={styles.errorMessage}>
                  {this.state.startDateError}
                </Text>
                <View>
                  <Text style={styles.Label}>Drug End Date</Text>
                  <DatePicker
                    style={styles.datePicker}
                    date={this.state.drugEndDate} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Select End date"
                    utcOffset={0}
                    format="YYYY-MM-DD"
                    //setting minimum date as YYYY-MM-DD format.
                    minDate={`${this.state.drugStartDate.getFullYear()}-${
                      this.state.drugStartDate.getMonth() + 1
                    }-${this.state.drugStartDate.getDate()}`}
                    maxDate="2030-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={styles.dateIcon}
                    onDateChange={this.handleEnDate}
                  />
                </View>
              </View>
              <Text style={styles.errorMessage}>{this.state.endDateError}</Text>
              <Text style={styles.Label}>Drug Frequency</Text>
              <View style={styles.drugFrequencyView}>
                <Text>{this.state.frequencyPlaceholderText}</Text>
                <CounterInput
                  style={styles.counterInputStyles}
                  horizontal
                  onChange={(counter) => {
                    this.setState({ isModified: true });
                    this.setState({ drugFrequency: counter });
                    this.setState({
                      frequencyPlaceholderText: counter.toString(),
                    });
                    if (counter > 0) {
                      this.setState({ error: false });
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
              <Text style={styles.Label}>Drug Time</Text>
              <View style={styles.bodyAlignment}>
                <TextInput
                  style={styles.input}
                  value={this.state.drugTimings.slice(0, 5)}
                  underlineColorAndroid="transparent"
                  placeholder="Drug Timings(hh:mm:ss)*"
                  placeholderTextColor="#2f2f2f"
                  autoCapitalize="none"
                  onChangeText={this.handleDrugTime}
                />
                {this.state.isTimer && (
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="clock"
                    onChange={this.handleDrugTime}
                  />
                )}
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isTimer: true });
                  }}
                >
                  <Image
                    style={styles.setTimeButton}
                    source={require('../../assets/clock.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.errorMessage}>{this.state.timeError}</Text>
              <View>
                <Text style={styles.Label}>Drug Description</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.drugDescription}
                  underlineColorAndroid="transparent"
                  placeholder={this.state.drugDescription}
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
              onPress={this.modifyDrug}
            >
              <Text style={styles.buttonText}>Modify Drug</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.errorMessage}>{this.state.footer}</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
} //Frontend end.
