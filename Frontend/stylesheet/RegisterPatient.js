import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},
  input: {
    width: 220,
    padding: 10,
    height: 40,
    marginLeft: 12,
    borderColor: 'black',
    borderWidth: 1,
  },
  picker: {
    width: 235,
    borderColor: 'black',
    borderWidth: 5,
  },
  btn: {
    width: 220,
    marginLeft: 12,
  },
  errormessage: {
    color: 'red',
    textAlign: 'left',
    marginTop: 0,
    marginLeft: 12,
    marginBottom: 15,
  },
  space: {
    width: 20,
    height: 20,
  },
  datepicker: {
    height: 40,
    width: 225,
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -250,
    backgroundColor: 'white',
    height: 30,
    alignItems: 'center',
  },
  dropDownView: { alignItems: 'center', marginLeft: 2 },
  datePicker: {
    width: 220,
    margin: 15,
    marginTop: 0,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 0,
  },
  dateIcon: {
    position: 'relative',
    right: 0,
    top: 4,
    marginRight: 0,
  },
  setTimeButton: {
    position: 'relative',
    width: 50,
    height: 50,
    shadowRadius: 20,
  },
});

export default styles;
