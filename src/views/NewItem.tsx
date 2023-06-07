import React,{useContext, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {LatLng} from 'react-native-maps';
import {useNavigation, useRoute} from '@react-navigation/native';

import TasksContext from '../TasksContext';
import {TaskType} from '../types';

interface NewItemProps {
  createTask: (t: TaskType) => void;
}
const NewItem:React.FC<NewItemProps> = ({ createTask }) => {
  const { params } = useRoute<any>();
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>();
  return <View style={styles.container}>
    <Text style={styles.label}>Title</Text>
    <TextInput
      style={styles.input}
      onChangeText={setTitle}
      value={title} />
    <View style={styles.buttons}>
      <Pressable
        style={[styles.button, styles.buttonCancel]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.text, styles.textCancel]}>Cancel</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonContinue]}
        onPress={() => createTask({
          id: 0 - Date.now(),
          title: title || '',
          coordinate: params?.coordinate as LatLng,
          completed: false,
        })}
      >
        <Text style={[styles.text, styles.textContinue]}>Continue</Text>
      </Pressable>
    </View>

  </View>
};

const Container = () => {
  const { createTask } = useContext(TasksContext);
  return useMemo(() => <NewItem createTask={createTask} />, [createTask]);
};

export default Container;

const styles = StyleSheet.create({
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
    justifyContent: 'space-around'
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
    fontWeight: '600'
  },
  textCancel: {
  },
  textContinue: {
    color: '#fff'
  },
  buttonCancel: {
    backgroundColor: '#fff'
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
  }
})
