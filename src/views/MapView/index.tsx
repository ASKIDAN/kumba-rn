import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useMemo} from 'react';
import {LatLng} from 'react-native-maps';
import {SCREENS} from '../../Router';
import TasksContext from '../../TasksContext';
import MapView from './MapView';

const Container = () => {
  const navigation = useNavigation<any>();
  const goToNewItem = useCallback(
    (coordinate: LatLng) => {
      navigation.navigate(SCREENS.NEW_TASK, {coordinate});
    },
    [navigation.navigate],
  );
  const {tasks} = useContext(TasksContext);
  return useMemo(
    () => <MapView markers={tasks} goToNewItem={goToNewItem} />,
    [tasks, goToNewItem],
  );
};

export default Container;
