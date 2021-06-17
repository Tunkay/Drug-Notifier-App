/***************
 * Description:-
 * This screen rendered if the user logged in as a patient.It gets rendered with submenu bar which
 * could be open by clicking user icon in the Appbar header prop.It takes the username from Drawer
 * Navigation Screen and loads the physicianList list of the patient on componentdidmount function
 * and map them into the card format and also provide view for drug details.
 *****************/
/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { Appbar } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../stylesheet/AdminPortalStyle';
import { getAdmin } from '../../config';

export default class PatientPortal extends Component {
  constructor(props) {
    super(props);
    //Intializing properties and variables.
    this.state = {
      navigation: this.props.navigation,
      adminId: '',
      physicianList: [], //List to save the recieved physicianList locally.
      usrname: this.props.username, //username from Drawer Navigation
    };
  }
  /*global   ShowDateError: writable,handleprescription,alert,handleData,animationOncomeback,
  showOpacity,clearonback,showerror,handleName,handleContent,refreshPhysicianList*/
  //On screen loading get all the prescription and map it to local list.
  componentDidMount() {
    this.refreshPhysicianList();
  }
  refreshPhysicianList = () => {
    axios
      .get(`${getAdmin}${this.state.usrname}`, {
        timeout: 20,
      })
      .then((response) => {
        // handle success
        //Saving the response data into  list .
        this.setState({ physicianList: response.data.physicianList });
        this.handleData(response.data);
      })
      .catch((error) => {
        alert(error.message);
        // handle error
      });
  };
  //Handling the list content into frontend.
  handleContent = (element) => (
    <Card key={element.u_id}>
      <View style={styles.cardBodyAlignment}>
        <Text style={styles.cardTextView}>Name : </Text>
        <Text>{element.name}</Text>
        </View>
        <View style={styles.cardBodyAlignment}>
        <Text style={styles.cardTextView}>Gender : </Text>
        <Text> {element.gender}</Text>
        </View>
        <View style={styles.cardBodyAlignment}>
        <Text style={styles.cardTextView}> Age : </Text>
        <Text>{element.physician_Age}</Text>
        </View>
        <View style={styles.cardBodyAlignment}>
        <Text style={styles.cardTextView}>Phone :</Text>
        <Text> {element.physician_Phone}</Text>
        </View>
        <View style={styles.cardBodyAlignment}>
        <Text style={styles.cardTextView}>Qualification : </Text>
        <Text>{element.physician_Qualifiacation}</Text>
        </View>
        <View style={styles.cardBodyAlignment}>
        <Text style={styles.cardTextView}>Specialization : </Text>
        <Text>{element.physician_Specilization}</Text>
        </View>
        <View style={styles.spacingWidth} />
    </Card>
  );
  //Handling Database data and mapping into a list.
  handleData = (data) => {
    this.setState({ adminId: data.adminId });
  };
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.bodyView}>
          <ScrollView>
            <View style={styles.notificationbar}>
              <Appbar.Header style={styles.item}>
                <Appbar.Action
                  icon={require('../../assets/user.png')}
                  onPress={this.props.toggle}
                />
                <Appbar.Content title="Admin Portal" />
              </Appbar.Header>
            </View>
            <View>
              <ScrollView>
                {
                  //Rendering the contents of list into the card view.
                  this.state.physicianList.map(this.handleContent)
                }
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addDrugButton}
            onPress={() =>
              this.state.navigation.navigate('registerPhysician', {
                id: this.state.adminId,
                refreshPhysicianList: this.refreshPhysicianList,
              })
            }
          >
            <Text>Add Physician</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
