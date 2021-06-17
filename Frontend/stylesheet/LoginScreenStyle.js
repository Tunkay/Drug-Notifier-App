import { StyleSheet } from 'react-native';
//Styling Sheet.
const loginScreenStyles = StyleSheet.create({
  container: {
    padding: 50,
  },
  footer: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 0,
    marginTop: 0,
  },
  input: {
    width: 235,
    padding: 10,
    margin: 15,
    marginBottom: 0,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  btn: {
    width: 235,
  },
  submitButton: {
    width: 235,
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    marginTop: 2,
    marginBottom: 0,
    height: 40,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    width: 235,
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    marginTop: 2,
    marginBottom: 0,
    height: 40,
    alignItems: 'center',
    opacity: 0.3,
  },
  submitButtonText: {
    color: 'white',
  },
  registerButton: {
    marginTop: 5,
    color: 'blue',
  },
  message: {
    color: 'red',
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 15,
    marginLeft: 12,
  },
  registerButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 17,
  },
  forgetPasswordText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 17,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 0,
    marginTop: 0,
  },
  bodyAlignment: { flexDirection: 'row' },
});
export default loginScreenStyles;
