/***************
 * Description:-
 * This screen is menu which contains user details and sign out option as functionality.When
 * user is signed out successfully then the navigation is reset to LoginScreen and on selecting 
 * user details it navigates to profile Screen.
 *****************/
import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  LogBox,
  Alert
} from 'react-native';
 import styles from '../../stylesheet/Menu';
//Drawer Menu image content.
 const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
export default function Menu({ navigation, username, userIdentifier }) {
  //Intializer function to ignnore the warnings
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  /*global alert */
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri }} />
        <Text style={styles.name}>{username}</Text>
      </View>
      <Text
        onPress={() =>
          navigation.navigate('profileScreen', { name: username, actor: userIdentifier })
        } //Menu on press navigation.
        style={styles.item}
      >
        View Profile
      </Text>
      <Text
        onPress={() => {
          Alert.alert(
            'Alert',
            'Do you want to sign out?',
            [
              {
                text: 'Yes',
                onPress: () => {
                alert('You are Successfully signed out.');
                navigation.reset({
                  routes: [{ name: 'loginScreen' }],
                });
              }
              },
              {
                text: 'Cancel',
              },
            ]
          );
        }}
        style={styles.item}
      >
        Sign Out
      </Text>
    </ScrollView>
  );
}
Menu.propTypes = {};
