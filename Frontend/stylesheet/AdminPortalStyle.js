import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'teal',
        marginBottom: 20,
      },
  addDrugButton: {
    width: 170,
    backgroundColor: 'dodgerblue',
    padding: 10,
    margin: 15,
    alignItems: 'center',
    borderWidth: 1,
    textShadowColor: 'black',
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
  btn: {
    width: 220,
    margin: 10,
    flexDirection: 'row',
  },
  mainView: { flex: 1 },
  bodyView: { flex: 0.9 },
  cardBodyAlignment: { flexDirection: 'row' },
  cardTextView: { color: 'teal', fontWeight: 'bold' },
});

export default styles;
