/* eslint-disable global-require */
/***************
 * Description:-
 * This screen rendered if the user logged in as a physician.It gets rendered with submenu
 * bar which could be open by clicking user icon in the Appbar header prop.
 * This provides search functionality to search the patient by their username,id,phone with
 * proper vaildations. It has one backend call for searching the patient.Then navigates to
 * prescription details with loading animation function as prop,patient's prescription.
 * Loading animation and clearOnBack function is empty the textInput after coming back from
 * another page.
 *****************/
import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import axios from 'axios';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  LogBox,
  FlatList
} from 'react-native';
//import { ListItem, List } from 'react-native-elements';
import styles from '../../stylesheet/PhysicianPortalStyles';
import { getPatient, recommendPatient } from '../../config';

LogBox.ignoreAllLogs();
//Urls to send request to server.

export default class PhysicianPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      searchText: '', //searchText field
      prescriptionList: [], //list to take prescriptions of the searched patient.
      data: [],
      showErrorMsg: '',
      isLoading: false, //animator overlay  loading is set to false and true if coming back
      loading: false,
    };
  }
  componentDidMount() {
    this.makeRemoteRequest();
  }
  //Global Function
  /*global   ShowDateError: writable,handlePrescription,alert,handleData,animationOnComeBack,
  showOpacity,clearOnBack,showError,handleName,makeRemoteRequest*/
  //Prescription fetched from the backend using axios call.
  handlePrescription = () => {
    //Intializing variables.
    const text = this.state.searchText;
    const clearOnBack = this.clearOnBack;
    const animationOnComeBack = this.animationOnComeBack;
    const nav = this.state.navigation;
    axios
      .get(`${getPatient}${this.state.searchText}`, { timeout: 20 })
      .then((response) => {
        // handle success
        //navigate to prescription with search text,animationLoading function,patient id.
        if (response.status === 200) {
          nav.navigate('prescription', {
            searchText: text,
            clearOnBack,
            patientId: response.data.p_id,
            animationOnComeBack,
          });
        } else {
          alert('Bad Request');
        }
      })
      .catch((error) => {
        // handle error
        if (error.message === 'timeout of 20ms exceeded') { 
          this.setState({ showErrorMsg: '*Server Error.Try after some time.' }); 
        } else if (this.state.searchText === '') {
          this.setState({ showErrorMsg: '*Enter Text' });
        } else
        if (error.response.status === 400) {
          this.setState({ showErrorMsg: '*User Doesnt exist' });
        }
      });
  };
  //Storing the fetched Data from the
  handleData = (data) => {
    this.setState({ prescriptionList: data.prescriptions });
  };

  //Triggered when screen is focused back.
  animationOnComeBack = () => {
    this.showError('');
    this.showOpacity(true);
    //adding delay.
    setTimeout(() => {
      this.showOpacity(false);
    }, 3000);
  };
  //Loading Overlay.
  showOpacity = (data) => {
    this.setState({ isLoading: data });
  };
  //clearing the search text on coming back to this screen.
  clearOnBack = (text) => {
    this.setState({ searchText: text });
  };
  //Search Handler and its error handler.
  showError = (text) => {
    this.setState({ showErrorMsg: text });
  };
  handleName = (text) => {
    if (text === '') this.setState({ showErrorMsg: '*Enter Search Text' });
    else this.setState({ showErrorMsg: '' });
    this.setState({ searchText: text });
    if (text.length >= 2) {
      this.makeRemoteRequest(text);
    } else {
      this.setState({ loading: false });
    }
  };
  makeRemoteRequest = (text) => {
     axios.get(`${recommendPatient}${text}`, { timeout: 20 })
    .then((response) => {
        //handle success
        this.setState({ data: response.data });
        this.setState({ loading: true });
    })
    .then({
       //handle error
    });
  };
  //Rendering Frontend.
  render() {
    return (
      <View>
        {this.state.isLoading && (
          //Loading the Activity indicator once the loading flag is set to true.
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
        <Appbar.Header style={styles.item}>
          <Appbar.Action
            icon={require('../../assets/user.png')}
            onPress={this.props.toggle}
          />
          <Appbar.Content title="Physician Portal" />
        </Appbar.Header>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            value={this.state.searchText}
            underlineColorAndroid="transparent"
            placeholder="Enter Patient name or phone "
            placeholderTextColor="#848482"
            autoCapitalize="none"
            onChangeText={this.handleName}
          />
         
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.handlePrescription}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {this.state.loading && (
          //Loading the Activity indicator once the loading flag is set to true.
      <FlatList
        data={this.state.data}
        renderItem={(item) => (
          <TouchableOpacity
          onPress={() => {
            this.setState({ searchText: item.item }); 
            this.setState({ loading: false });
          }
          }
          ><Text>{item.item}</Text></TouchableOpacity>
        )}
        style={{ borderWidth: 1, width: 240, marginLeft: 30 }}
      />
        )}
        <View>
          <Text style={styles.showMessage}>{this.state.showErrorMsg}</Text>
        </View>
      </View>
    );
  }
}
