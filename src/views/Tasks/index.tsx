import React, {useContext} from 'react';
import Tasks from './Tasks';
import TasksContext from '../../TasksContext';

const Container = () => {
  const {tasks, completeTask} = useContext(TasksContext);
  return <Tasks tasks={tasks} completeTask={completeTask} />;
};

export default Container;
