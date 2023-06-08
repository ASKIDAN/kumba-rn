import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {LatLng} from 'react-native-maps';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TaskType} from '../../common/types';
import styles from './styles';

interface NewItemProps {
  createTask: (t: TaskType) => void;
}
const NewItem: React.FC<NewItemProps> = ({createTask}) => {
  const {params} = useRoute<any>();
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      <View style={styles.buttons}>
        <Pressable
          style={[styles.button, styles.buttonCancel]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.text, styles.textCancel]}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonContinue]}
          onPress={() =>
            createTask({
              id: 0 - Date.now(),
              title: title || '',
              coordinate: params?.coordinate as LatLng,
              completed: false,
            })
          }>
          <Text style={[styles.text, styles.textContinue]}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NewItem;
