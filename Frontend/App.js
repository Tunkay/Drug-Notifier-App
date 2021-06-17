import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from './Components/Login/LoginScreen.js';
import register from './Components/Login/Register';
import registerPatient from './Components/Login/RegisterPatient.js';
import patientPortal from './Components/Patient_Portal/PatientPortal.js';
import profileScreen from './Components/SharedScreens/ProfileScreen.js';
import drugDetail from './Components/SharedScreens/DrugDetail.js';
import physicianPortal from './Components/Physician_Portal/PhysicianPortal';
import newPrescription from './Components/Physician_Portal/NewPrescription';
import drawerNavigation from './Components/SharedScreens/DrawerNavigation.js';
import newDrug from './Components/Physician_Portal/NewDrug';
import modifyDrugs from './Components/Physician_Portal/ModifyDrugs.js';
import prescription from './Components/Physician_Portal/PerscriptionDetails';
import adminPortal from './Components/adminPortal/AdminPortal';
import registerPhysician from './Components/adminPortal/RegisterPhysician';
import ForgetPassword from './Components/Login/ForgetPassword.js';
import changePassword from './Components/Login/ChangePassword.js';

//Creating Navigating stack.
const Stack = createStackNavigator();
export default function App() {
  //Route of the application
  /*global alert */
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loginScreen">
        <Stack.Screen
          name="loginScreen"
          component={loginScreen}
          options={{ title: 'Drug Notifier' }}
        />
        <Stack.Screen name="register" component={register} options={{ title: 'Register' }} />
        <Stack.Screen name="registerPatient" component={registerPatient} />
        <Stack.Screen
          name="drawerNavigation"
          component={drawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="patientPortal"
          component={patientPortal}
          options={{ headerShown: false, title: 'Patient Portal' }}
        />
        <Stack.Screen
        name="drugDetail" component={drugDetail} 
        options={{ title: 'Drug Details' }} 
        />
        <Stack.Screen
        name="profileScreen" component={profileScreen}
        options={{ title: 'Profile Screen' }}
        />
        <Stack.Screen
        name="forgetPassword" component={ForgetPassword}
        options={{ title: 'Forget Password' }}
        />
        <Stack.Screen
        name="changePassword" component={changePassword}
        options={{ title: 'Forget Password' }}
        />
        <Stack.Screen 
        name="newPrescription" 
        component={newPrescription}
        options={{ title: 'New Prescription' }}
        />
        <Stack.Screen
          name="physicianPortal"
          component={physicianPortal}
          options={{ headerShown: false, title: 'Physician Portal' }}
        />
        <Stack.Screen
          name="prescription"
          component={prescription}
          options={{ title: 'Prescription Details' }}
        />
        <Stack.Screen
         name="newDrug"
        component={newDrug} 
        options={{ title: 'New Drug' }}
        />
        <Stack.Screen
         name="adminPortal"
        component={adminPortal} 
        options={{ title: 'Admin Portal' }}
        />
        <Stack.Screen
         name="registerPhysician"
        component={registerPhysician} 
        options={{ title: 'Register Physician' }}
        />
        <Stack.Screen 
        name="modifyDrugs" 
        component={modifyDrugs}
       options={{ title: 'Modify Drug' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

