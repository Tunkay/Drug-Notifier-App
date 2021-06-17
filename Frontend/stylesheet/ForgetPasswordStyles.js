import { StyleSheet } from 'react-native';

const changeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: '#7f8c8d33',
    borderBottomWidth: 2,
    marginBottom: 0,
    textAlign: 'center',
    width: 255,
    marginLeft: 70,
  },
  sendVerification: {
    padding: 10,
    marginLeft: 80,
    marginTop: 10,
    backgroundColor: 'dodgerblue',
    width: 235,
    height: 40,
    borderWidth: 1,
  },
  sendCode: {
    padding: 10,
    marginLeft: 80,
    marginTop: 10,
    backgroundColor: 'dodgerblue',
    width: 235,
    height: 40,
    borderWidth: 1,
  },
  sendCodeDisabled: {
    padding: 10,
    marginLeft: 80,
    marginTop: 10,
    backgroundColor: 'dodgerblue',
    width: 235,
    height: 40,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  errormessage: {
    color: 'red',
    textAlign: 'left',
    marginTop: 0,
    marginLeft: 70,
    marginBottom: 0,
    width: 235,
  },
});
export default changeScreenStyles;
