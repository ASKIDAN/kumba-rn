import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  list: {
    display: 'flex',
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#EDF8FA',
    borderRadius: 8,
    marginBottom: 17,
    backgroundColor: '#FFF',
  },
  text: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  activeContainer: {
    borderColor: '#A68BFF',
  },
});
