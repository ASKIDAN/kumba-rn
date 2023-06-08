import {LatLng} from 'react-native-maps';

export type TaskType = {
  id: number;
  title: string;
  completed: boolean;
  coordinate: LatLng;
};
