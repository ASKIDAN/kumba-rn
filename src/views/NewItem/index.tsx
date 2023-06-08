import React, {useContext, useMemo} from 'react';
import TasksContext from '../../TasksContext';
import NewItem from './NewItem';

const Container = () => {
  const {createTask} = useContext(TasksContext);
  return useMemo(() => <NewItem createTask={createTask} />, [createTask]);
};

export default Container;
