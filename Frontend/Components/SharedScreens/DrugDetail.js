/***************
 * Description:-
 * This is one of the shared screen which rendered by patient and physician side.This class
 * contains delete , modify ,add option for physician and only view for patient.Major functionality
 * is to get drugs from backend and provide various CRUD operation for the physician screen only.The
 * conditional rendering for patient or phgysician is on the basis user identifier prop.It maps
 * each drug into the card format.
 *****************/
import axios from 'axios';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteDrug, getDrug } from '../../config';
import styles from '../../stylesheet/DrugDetailsStyle';

export default class DrugDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      //Different accessiblity for different users.
      userIdentifier: props.route.params.userIdentifier,
      precriptionList: props.route.params.data, //Prescription fetched from Prescription_details .
      handlePrescription: props.route.params.refreshPrescription,
      prescriptionNotFound: '',
      flag: false,
    };
  }
  /*global retrieveDrugs,handleData,deletePrescription,alert,handleContent,handlePhysician */
  //Retrieve Drugs function.
  componentDidMount() {
    if (this.state.precriptionList.drugs.length) {
      this.setState({ prescriptionNotFound: '' });
          this.setState({ flag: false });
    } else {
      this.setState({ flag: true });
           this.setState({ prescriptionNotFound: '*No Drugs Found' });
    }
  }
  componentWillUnmount() {
    if (this.state.userIdentifier === 'physician') { this.state.handlePrescription(); }  
  }
  retrieveDrugs = () => {
    const setDict = this.handleData;
    axios
      .get(`${getDrug}${this.state.precriptionList.prescription_id}`, {
        timeout: 20,
      })
      .then((response) => {
        // handle success
        if (response.data.drugs.length) { 
          this.setState({ prescriptionNotFound: '' });
          this.setState({ flag: false });
        } else {
          console.log(response.data);
          this.setState({ flag: true });
           this.setState({ prescriptionNotFound: '*No Drugs Added' });
        }
        setDict(response.data); //Storing the data fetched from backend.
      })
      .catch((error) => {
        // handle error
        alert(error.message);
      });
  };
  //Setting the fetched data from backend.
  handleData = (data) => {
    this.setState({ precriptionList: data });
  };
  //Drug Deleting function using backend call.
  deletePrescription = (id) => {
    const refereshContent = this.retrieveDrugs; //Refresh content
    axios
      .get(`${deleteDrug}${id}`, { timeout: 20 })
      .then((response) => {
        // handle success
        if (response.data) {
          alert('Drug Deleted');
        }
        refereshContent(); //Refreshing the previous screen.
      })
      .catch((error) => {
        // handle error
        alert(error.message);
      });
  };
  //Dynamic rendering of card view for the drug data display function
  handleContent = (element) => {
    const nav = this.state.navigation;
    if (this.state.userIdentifier === 'physician') {
      //For Physician so that user can apply various function in the drugs.
      return (
        <Card
          key={element.id}
          containerStyle={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.cardView}>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Name: </Text>
              <Text>{element.medName}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Dosage: </Text>
              <Text>{element.drugDosage} ml</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Description: </Text>
              <Text style={styles.fittingTextStyle}>{element.description}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Start Date: </Text>
              <Text>{element.startDate}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>End Date: </Text>
              <Text>{element.endDate}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Time: </Text>
              <Text>{element.drugTime.slice(0, 5)}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Frequency: </Text>
              <Text>{element.drugFrequency} hours</Text>
            </View>
          </View>
          <View style={styles.buttonAlignment}>
            <TouchableOpacity
              style={styles.deleteDrugButton}
              onPress={() => {
                Alert.alert('Alert', 'Do you want to delete.Confirm?', [
                  {
                    text: 'OK',
                    onPress: () => this.deletePrescription(element.id),
                  },
                  {
                    text: 'Cancel',
                  },
                ]);
              }}
            >
              <Text style={styles.buttonTextStyle}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modifyDrugButton}
              onPress={() => {
                nav.navigate('modifyDrugs', {
                  data: element,
                  Prescription: this.state.precriptionList.prescription_id,
                  updateAction: this.retrieveDrugs,
                });
              }}
            >
              <Text style={styles.buttonTextStyle}>
                Modify
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      );
    }
    //For Patient User only to read the prescribed drugs.
    return (
      <TouchableOpacity key={element.id}>
        <Card key={element.id}>
          <View style={styles.cardContentView}>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Name: </Text>
              <Text>{element.medName}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Dosage: </Text>
              <Text>{element.drugDosage} ml</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Description: </Text>
              <Text style={styles.fittingTextStyle}>{element.description}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Start Date: </Text>
              <Text>{element.startDate}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>End Date: </Text>
              <Text>{element.endDate}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Time: </Text>
              <Text>{element.drugTime.slice(0, 5)}</Text>
            </View>
            <View style={styles.bodyAlignment}>
              <Text style={styles.cardTextView}>Drug Frequency: </Text>
              <Text>{element.drugFrequency} hours</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  handlePhysician = (element) => {
    const nav = this.state.navigation;
    if (this.state.userIdentifier === 'physician') {
      return (
        <View>
          <TouchableOpacity
            style={styles.addDrugButton}
            onPress={() => {
              nav.navigate('newDrug', {
                data: element,
                updateaction: this.retrieveDrugs,
              });
            }}
          >
            <Text style={styles.buttonTextStyle}>Add New Drug</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.bodyView}>
          <ScrollView>
          { this.state.flag &&
          <Text style={styles.prescriptionNotFoundText}>{this.state.prescriptionNotFound}</Text>
         }
            <View>
              {
                //Mapping the Drugs into frontend using map function.
                this.state.precriptionList.drugs.map(this.handleContent)
              }
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          {
            //For adding new button.
            this.handlePhysician(this.state.precriptionList)
          }
        </View>
      </View>
    );
  }
}
