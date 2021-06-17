/***************
 * Description:-
 * Prescription details will be render the prescriptions of the searched patient in
 * componenedidMount and format it into the card format with add ,delete,view option.
 * GetPrescription is to get prescription from frontend with the help of search text
 * Delete Prescription is to delete from the database.The user gets navigated to DrugDetail
 * screen upon clicking on view button and NewPrescription screen on add new prescription.
 *****************/
import React, { Component } from 'react';
import axios from 'axios';
import { Card } from 'react-native-elements';
import {
  View,
  TouchableOpacity,
  Text,
  LogBox,
  Alert,
  ScrollView,
} from 'react-native';
import styles from '../../stylesheet/PrescriptionDetailStyle';
import { baseUrl, deleteUrl } from '../../config';
//Urls to send request to server.


// eslint-disable-next-line camelcase
export default class Perscription_detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Intialization of the props.
      navigation: this.props.navigation,
      text: props.route.params.searchText, //Search Text prop.
      patientId: props.route.params.patientId, //p_id
      clearOnBack: props.route.params.clearOnBack, //Updater function to invoke intial state.
      prescriptionList: [], //List to store the prescription.
      //Invoking Loading overlay on unmount.
      loadingAnimation: props.route.params.animationOnComeBack,
      prescriptionNotFound: '',
      flag: false,
    };
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
  }
  componentDidMount() {
    //Loading the view to list prescription.
    this.handlePrescription();
    //Clear the Search Text of previous screen.
    this.state.clearOnBack('');
  }
  //Global Function declaration for linting.
  /*global   componentWillUnmount: writable,deletePrescription,alert,handlePrescription,handleData
  handleContent*/
  componentWillUnmount = () => {
    //Invoking Loading overlay on unmount.
    this.state.loadingAnimation();
  };
  //Deleting Prescription Function.
  deletePrescription = (id) => {
    const refreshPrescriptions = this.handlePrescription;
    axios
      .get(`${deleteUrl}${id}`, { timeout: 20 })
      .then((response) => {
        // handle success
        if (response.data) {
          alert('Prescription Deleted');
        }
        refreshPrescriptions(); //Refresh the prescription upon deleting prescription.
      })
      .catch((error) => {
        // handle error
        alert(error.message);
      });
  };
  //GetPrescription Handler.
  handlePrescription = () => {
    //const setDict = this.handleData;
    axios
      .get(`${baseUrl}${this.state.text}`, { timeout: 20 })
      .then((response) => {
        // handle success
        //setting the response data to list.
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
        // handle error
        alert(error.message);
      });
  };
  //Storing the fetched Data from the DataBase.
  handleData = (data) => {
    this.setState({ prescriptionList: data });
  };
  //Dynamically rendering the available prescription list via card View.
  handleContent=(element, index) => {
    //Card View for each prescripytion.(
      const refreshPrescription = this.handlePrescription;
    return (
    <Card key={element.prescription_id}>
      <View style={styles.buttonAlignment}>
        <Text style={styles.cardText}>
          Prescription{index + 1}
        </Text>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            //on card click navigate to Drug vDetails with prescription details and user identifier.
            this.state.navigation.navigate('drugDetail', {
              data: element,
              userIdentifier: 'physician',
              refreshPrescription
            });
          }}
        >
          <Text style={styles.viewTextButton}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              'Alert',
              'Do you want to delete prescription.Confirm?',
              [
                {
                  text: 'OK',
                  onPress: () =>
                    this.deletePrescription(element.prescription_id),
                },
                {
                  text: 'Cancel',
                },
              ]
            );
          }}
        >
          <Text style={styles.viewTextButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>);
  }
        
  //Rendering the Frontend.
  render() {
    //setting patient id.
    const patientId = this.state.patientId;
    return (
      <View style={styles.mainView}>
        <ScrollView>
          { this.state.flag &&
          <Text style={styles.prescriptionNotFoundText}>{this.state.prescriptionNotFound}</Text>
         }
          <View style={styles.bodyView}>
            {
              //Rendering the contents of list into the card view dynamically.
              this.state.prescriptionList.map(this.handleContent)
            }
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.newPrescription}
            onPress={() => {
              //Sending to new prescription screen with update function and patient id
              this.state.navigation.navigate('newPrescription', {
                updatePrescriptionList: this.handlePrescription,
                patientId,
              });
            }}
          >
            <Text style={styles.viewTextButton}>Add New Prescription</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
