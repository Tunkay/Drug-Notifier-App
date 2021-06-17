/* eslint-disable global-require */
/***************
 * Description:-
 * the user details are fetched from the backend call  and implemented on card format.The user 
 * identifier prop helps to search for patient or physician.One backend call.
 *****************/
import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-elements';
import styles from '../../stylesheet/ProfileScreen';
import { getPatient, getPhysician } from '../../config';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    //Intialization of variables and properties from different components using navigation.
    this.state = {
      navigation: this.props.navigation,
      patients: [],
      physician: [],
      username: props.route.params.name,
      userIdentifier: props.route.params.actor,
    };
  }
  /* global alert
  */
  //On Page Loading Function-Render the patient data from the database.
  componentDidMount() {
    const username = this.state.username;
    const setDict = this.handleData;
    if (this.state.userIdentifier === 'patient') {
      axios
        .get(`${getPatient}${username}`, {
          timeout: 20,
        })
        .then((response) => {
          // handle success
          //Mapping the database information into a list.
          setDict(response.data);
        })
        .catch((error) => {
          console.log(error.message);

          // handle error
        });
    } else {
      axios
        .get(`${getPhysician}${username}`, {
          timeout: 20,
        })
        .then((response) => {
          // handle success
          //Mapping the database information into a list.
          setDict(response.data);
        })
        .catch((error) => {
          alert(error.message);
          // handle error
        });
    }
  }
  /*global handleData*/
  handleData = (data) => {
    if (this.state.userIdentifier === 'patient') this.setState({ patients: data });
    else {
      this.setState({ physician: data });
    }
  };
  render() {
    //rendering patient profile
    const patient = this.state.patients;
    const Physician = this.state.physician;
    if (this.state.userIdentifier === 'patient') {
      return (
        <View style={styles.mainView}>
          <Card>
            <View style={styles.bodyAlignment}>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Name:</Text><Text>{patient.name} </Text></View>
              <View style={styles.bodyView} />
              <Image
                style={styles.image}
                source={require('../../assets/user.png')}
              />
            </View>
            <View style={styles.bodyAlignment}>
            <Text style={styles.cardTextView}>Age:</Text><Text>{patient.age} years</Text>
            </View>
            <View style={styles.bodyAlignment}>
            <Text style={styles.cardTextView}>Gender:</Text><Text>{patient.gender}</Text>
            </View>
            <View style={styles.bodyAlignment}>
            <Text style={styles.cardTextView}>Address:</Text><Text>{patient.address}</Text>
            </View>
            <View style={styles.bodyAlignment}>
            <Text style={styles.cardTextView}>Phone Number:</Text><Text>{patient.phone}</Text>
            </View>
          </Card>
        </View>
      );
    }
    return (
      <View style={styles.mainView}>
        <Card>
          <View style={styles.bodyAlignment}>
          <View style={styles.bodyAlignment}>
            <Text style={styles.cardTextView}>Name:</Text><Text> {Physician.name} </Text>
            </View>
            <View style={styles.bodyView} />
            <Image
              style={styles.image}
              source={require('../../assets/user.png')}
            />
          </View>
          <View style={styles.bodyAlignment}>
          <Text style={styles.cardTextView}>Age:</Text><Text>{Physician.physician_Age} years</Text>
          </View>
          <View style={styles.bodyAlignment}>
          <Text style={styles.cardTextView}>Gender:</Text><Text>{Physician.gender}</Text>
          </View>
          <View style={styles.bodyAlignment}>
          <Text style={styles.cardTextView}>Phone:</Text><Text>{Physician.physician_Phone}</Text>
          </View>
          <View style={styles.bodyAlignment}>
          <Text style={styles.cardTextView}>
            Qualifiacation: </Text><Text>{Physician.physician_Qualifiacation}</Text>
            </View>
            <View style={styles.bodyAlignment}>
          <Text style={styles.cardTextView}>
            Specilization: </Text><Text>{Physician.physician_Specilization}</Text>
            </View>
        </Card>
      </View>
    );
  }
}
