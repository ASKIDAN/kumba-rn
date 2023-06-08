import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TaskType} from '../../common/types';
import Checkbox from '../../components/Checkbox';
import styles from './styles';

interface TaskProps {
  task: TaskType;
  completeTask: (t: TaskType) => void;
}
const Task: React.FC<TaskProps> = ({task, completeTask}) => {
  return (
    <View style={[styles.container, task.completed && styles.activeContainer]}>
      <Text style={styles.text}>{task.title}</Text>
      <Checkbox
        active={task.completed}
        onChange={() => {
          completeTask(task);
        }}
      />
    </View>
  );
};

interface TasksProps {
  tasks: TaskType[];
  completeTask: (t: TaskType) => void;
}
const Tasks: React.FC<TasksProps> = ({tasks, completeTask}) => {
  return (
    <ScrollView style={styles.list}>
      {tasks.map(t => (
        <Task task={t} key={t.id} completeTask={completeTask} />
      ))}
    </ScrollView>
  );
};

export default Tasks;
