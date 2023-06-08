import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  label: {
    marginLeft: 13,
    marginBottom: 4,
  },
  buttons: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    borderRadius: 24,
    borderStyle: 'solid',
    borderColor: '#22A3C3',
    borderWidth: 1,
    minWidth: 160,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  textCancel: {},
  textContinue: {
    color: '#fff',
  },
  buttonCancel: {
    backgroundColor: '#fff',
  },
  buttonContinue: {
    backgroundColor: '#22A3C3',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderColor: 'rgba(172, 188, 213, 0.56)',
  },
});
