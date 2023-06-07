import React, {useCallback, useContext, useMemo} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Map, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../App';
import TasksContext from '../TasksContext';
import {TaskType} from '../types';

interface MapViewProps {
  markers: TaskType[];
  goToNewItem: (coordinate: LatLng) => void;
}
const MapView:React.FC<MapViewProps> = ({ markers}) => {
  const navigation = useNavigation<any>();
  const addMark = (coordinate:LatLng) => {
    navigation.navigate(SCREENS.NEW_TASK, { coordinate });
  }

  return <SafeAreaView style={styles.container}>
    <Map
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      onPress={(e) => addMark(e.nativeEvent.coordinate)}
    >
      {markers.map(m => <Marker key={m.id} coordinate={m.coordinate} title={m.title} />)}
    </Map>
  </SafeAreaView>
};

const Container = () => {
  const navigation = useNavigation<any>();
  const goToNewItem = useCallback((coordinate:LatLng) => {
    navigation.navigate(SCREENS.NEW_TASK, { coordinate });
  }, [navigation.navigate]);
  const { tasks } = useContext(TasksContext);
  return useMemo(() => <MapView markers={tasks} goToNewItem={goToNewItem} />, [tasks, goToNewItem]);
};

export default Container;


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
    borderRadius: 22,
  },
});
