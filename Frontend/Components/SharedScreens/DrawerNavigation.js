/***************
 * Description:-
 * This screen rendered after the Loginscreen.It creates drawer navigation for the submenu and 
 * user portal.This class contains toggle function which would toggle the sub menu and gateway to 
 * conditional rendering of the dashboard according to user identifier prop.No backend call.
 *****************/
import React, { Component } from 'react';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import Menu from '../SharedScreens/Menu';
import PatientPortal from '../Patient_Portal/PatientPortal.js';
import PhysicianPortal from '../Physician_Portal/PhysicianPortal';
import AdminPortal from '../../Components/adminPortal/AdminPortal';
import styles from '../../stylesheet/DrawerNavStyles.js';

export default class DrawerNavigation extends Component {
  constructor(props) {
    super(props);
    //Button to toggle the Drawer Menu.
    this.toggle = this.toggle.bind(this);
    //Intialization
    this.state = {
      navigation: this.props.navigation,
      username: props.route.params.username, //Username from LoginScreen.
      userIdentifier: props.route.params.actor, //actor from LoginScreen.Condition render of screen.
      isOpen: false, //Flag to check the drawer is open or not.
      selectedItem: '',
    };
  }
  /*global   ShowDateError: writable,onMenuItemSelected*/
  //Toggle menu function
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  //Update the flag for when the menu view is enabled or disabled.
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
 //selecting the menuitem from sub menu and setting its behaviour.
  onMenuItemSelected = (item) =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  //Rendering on the basis of user.
  conditionalViewRender() {
    if (this.state.userIdentifier === 'patient') {
      return (
        <PatientPortal
          toggle={this.toggle}
          username={this.state.username}
          navigation={this.state.navigation}
        />
      );
    } else if (this.state.userIdentifier === 'physician') {
 return (
      <PhysicianPortal
        toggle={this.toggle}
        username={this.state.username}
        navigation={this.state.navigation}
      />
    ); 
} 
  return (
    <AdminPortal
      toggle={this.toggle}
      username={this.state.username}
      navigation={this.state.navigation}
    />
  );
  }
  render() {
    //Rendering the Menu view into the Drawer.
    const menu = (
      <Menu
        navigation={this.state.navigation}
        username={this.state.username}
        userIdentifier={this.state.userIdentifier}
      />
    );
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
      >
        <View style={styles.container}>{this.conditionalViewRender()}</View>
      </SideMenu>
    );
  }
}
