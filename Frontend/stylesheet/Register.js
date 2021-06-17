import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    flex: 0.9,
  },
  input: {
    width: 220,
    padding: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    marginLeft: 13,
  },
  space: {
    width: 50,
  },
  btn: {
    width: 220,
    margin: 10,
    flexDirection: 'row',
  },
  errormessage: {
    color: 'red',
    textAlign: 'left',
    marginTop: 0,
    marginLeft: 12,
    marginBottom: 15,
    width: 235,
  },
  radio: {
    width: 500,
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    height: 80,
    alignItems: 'center',
  },
  mainView: { flex: 1 },
});

export default styles;
