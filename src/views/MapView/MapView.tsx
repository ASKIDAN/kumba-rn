import React from 'react';
import {SafeAreaView} from 'react-native';
import Map, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../Router';
import {TaskType} from '../../common/types';
import styles from './styles';

interface MapViewProps {
  markers: TaskType[];
  goToNewItem: (coordinate: LatLng) => void;
}
const MapView: React.FC<MapViewProps> = ({markers}) => {
  const navigation = useNavigation<any>();
  const addMark = (coordinate: LatLng) => {
    navigation.navigate(SCREENS.NEW_TASK, {coordinate});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Map
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onPress={e => addMark(e.nativeEvent.coordinate)}>
        {markers.map(m => (
          <Marker key={m.id} coordinate={m.coordinate} title={m.title} />
        ))}
      </Map>
    </SafeAreaView>
  );
};

export default MapView;
