import React, {useContext, useMemo} from 'react';
import {StyleSheet, View, Text, Pressable, Image, ScrollView} from 'react-native';

import {TaskType} from '../types';
import TasksContext from '../TasksContext';

interface CheckBoxProps {
  active: boolean,
  onChange: () => void,
}
const CheckBox:React.FC<CheckBoxProps> = ({ active, onChange }) => <Pressable onPress={onChange}>
  <View style={[styles.checkbox, active && styles.active]}>
    {active ? <Image style={styles.image} source={require('../assets/check.png')}/> : null}
  </View>
</Pressable>

interface TaskProps {
  task: TaskType,
  completeTask: (t: TaskType) => void,
}
const Task:React.FC<TaskProps> = ({ task, completeTask }) => {
  return <View style={[styles.container, task.completed && styles.activeContainer]}>
    <Text style={styles.text}>{task.title}</Text>
    <CheckBox active={task.completed} onChange={() => {
      completeTask(task)
    }}/>
  </View>
}

interface TasksProps {
  tasks: TaskType[];
  completeTask: (t:TaskType) => void;
}
const Tasks:React.FC<TasksProps> = ({ tasks, completeTask }) => {
  return <ScrollView style={styles.list}>
    {tasks.map(t => <Task task={t} key={t.id} completeTask={completeTask} />)}
  </ScrollView>
}

const Container = () => {
  const { tasks, completeTask } = useContext(TasksContext);
  return useMemo(() => <Tasks
    tasks={tasks}
    completeTask={completeTask}
  />, [tasks, completeTask]);
};

export default Container;

const styles = StyleSheet.create({
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
    backgroundColor: '#FFF'
  },
  text: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  checkbox: {
    width: 16,
    height: 16,
    backgroundColor: '#EDF8FA',
    marginLeft: 12,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  active: {
    backgroundColor: '#A68BFF',
  },
  activeContainer: {
    borderColor: '#A68BFF',
  },
  image: {
    height: 10,
    width: 10
  }
});
