import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerStack: {
    backgroundColor: '#22A3C3',
  },
  headerTitle: {
    color: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingBottom: 20,
    height: 60,
  },
  tabText: {
    fontSize: 24,
    fontWeight: '500',
  },
  activeTab: {
    color: '#22A3C3',
  },
});
