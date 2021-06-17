import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'teal',
  },
  input: {
    width: 240,
    padding: 10,
    height: 35,
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 0,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
  submitButton: {
    width: 100,
    backgroundColor: 'dodgerblue',
    padding: 10,
    margin: 15,
    marginBottom: 0,
    height: 40,
    alignItems: 'center',
  },
  cardbutton: {
    width: 40,
    backgroundColor: '#FF8C00',
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: '5%',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.75,
    height: 1000,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errormessage: {
    color: 'red',
    textAlign: 'left',
    marginTop: 0,
    marginLeft: 12,
    marginBottom: 15,
  },
  showMessage: { marginLeft: 30, marginTop: 0, color: 'red' },
  searchButtonText: {
    fontWeight: 'bold',
  },
});
export default styles;
