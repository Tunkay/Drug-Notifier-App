/***************
 * Description:-
 * This screen rendered if the user logged in as a patient.It gets rendered with submenu bar which 
 * could be open by clicking user icon in the Appbar header prop.It takes the username from Drawer
 * Navigation Screen and loads the prescriptions list of the patient on componentdidmount function
 * and map them into the card format and also provide view for drug details.
 *****************/
/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { Appbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../stylesheet/PatientPortalStyle.js';
import { getPrescription } from '../../config.js';

export default class PatientPortal extends Component {
  constructor(props) {
    super(props);
    //Intializing properties and variables.
    this.state = {
      navigation: this.props.navigation,
      prescriptions: [], //List to save the recieved prescriptions locally.
      usrname: this.props.username, //username from Drawer Navigation
      prescriptionNotFound: '',
      flag: false, 
    };
  }
  /*global   ShowDateError: writable,handleprescription,alert,handleData,animationOncomeback,
  showOpacity,clearonback,showerror,handleName,handleContent*/
  //On screen loading get all the prescription and map it to local list.
  componentDidMount() {
    axios
      .get(`${getPrescription}${this.state.usrname}`, {
        timeout: 20,
      })
      .then((response) => {
        // handle success
        //Saving the response data into  list .
        if (response.data.length) { 
          this.setState({ prescriptionNotFound: '' });
          this.setState({ flag: false });
        } else {
          this.setState({ flag: true });
           this.setState({ prescriptionNotFound: '*No Prescription Found' });
        }
        this.handleData(response.data);
      })
      .catch((error) => {
        alert(error.message);
        // handle error
      });
  }
  //Handling the list content into frontend.
  handleContent = (element, index) => (
    <TouchableOpacity
      key={element.prescription_id}
      onPress={() =>
        //navigate to Drug Detail screen with prescription and user identifier.
        this.state.navigation.navigate('drugDetail', {
          data: element,
          user: 'patient',
        })
      }
    >
      <Card key={element.prescription_id}>
        <View style={styles.bodyAlignment}>
          <Text>Prescription {index + 1}</Text>
          <View style={styles.spacingWidth} />
          <Image
            style={styles.image}
            source={require('../../assets/rightarrow.png')}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
  //Handling Database data and mapping into a list.
  handleData = (data) => {
    this.setState({ prescriptions: data });
  };
  render() {
    return (
      <View style={styles.notificationbar}>
        <Appbar.Header style={styles.item}>
          <Appbar.Action
            icon={require('../../assets/user.png')}
            onPress={this.props.toggle}
          />
          <Appbar.Content title="Patient Portal" />
        </Appbar.Header>
        { this.state.flag &&
          <Text style={styles.prescriptionNotFoundText}>{this.state.prescriptionNotFound}</Text>
         }
        {
          //Rendering the contents of list into the card view.
          this.state.prescriptions.map(this.handleContent) 
        }
      </View>
    );
  }
}
