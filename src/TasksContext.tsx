import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {TaskType} from './common/types';
import {patchTask, postTask, getTasks} from './common/api';
import {
  processTaskFromServer,
  processTaskToServer,
  syncTask,
} from './common/lib';

interface TasksContextInterface {
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  createTask: (t: TaskType) => void;
  completeTask: (t: TaskType) => void;
}
const TasksContext = createContext<TasksContextInterface>({
  tasks: [],
  setTasks: () => {},
  createTask: () => {},
  completeTask: () => {},
});
export default TasksContext;

interface TaskContextProviderProps {
  children: React.ReactNode;
}
export const TaskContextProvider: React.FC<TaskContextProviderProps> = ({
  children,
}) => {
  const navigation = useNavigation<any>();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const netInfo = useNetInfo();

  const createTask = useCallback(
    (task: TaskType) => {
      if (netInfo.isConnected) {
        postTask(processTaskToServer(task)).then(data => {
          setTasks(prev => [{...task, id: data.id}, ...prev]);
        });
      } else {
        console.log('offline complete');
        setTasks(prev => [task, ...prev]);
      }
      navigation.goBack();
    },
    [setTasks, netInfo.isConnected, navigation],
  );

  const completeTask = useCallback(
    (task: TaskType) => {
      if (netInfo.isConnected) {
        patchTask(task.id, {completed: true}).then(() => {
          setTasks(prev =>
            prev.map(p => {
              if (p.id === task.id) {
                return {...task, completed: true};
              }
              return p;
            }),
          );
        });
      } else {
        console.log('offline complete');
        setTasks(prev =>
          prev.map(t => {
            if (t.id === task.id) {
              return {...t, completed: true};
            }
            return t;
          }),
        );
      }
    },
    [setTasks, netInfo.isConnected],
  );

  // sync
  useEffect(() => {
    if (netInfo.isConnected) {
      getTasks().then(async data => {
        const tasksProcessed = data.map(processTaskFromServer);
        if (tasks) {
          const {result, tasksToCreate, tasksToUpdate} = syncTask(
            tasks,
            tasksProcessed,
          );
          await Promise.all(
            tasksToUpdate.map(t => patchTask(t.id, {completed: true})),
          );
          const createdTasks = await Promise.all(
            tasksToCreate.map(t => postTask(processTaskToServer(t))),
          );
          createdTasks.forEach((task, i) => {
            const taskToSync = result.find(r => r.id === tasksToCreate[i].id);
            if (taskToSync) {
              taskToSync.id = task.id;
            }
          });
          setTasks(result);
        } else {
          setTasks(tasksProcessed);
        }
      });
    }
  }, [netInfo.isConnected]);

  // local storage
  useEffect(() => {
    if (tasks.length) {
      console.log('offline store items');
      AsyncStorage.setItem('tasks', JSON.stringify(tasks)).then(() => {});
    }
  }, [tasks]);

  // get from local storage
  useEffect(() => {
    if (!netInfo.isConnected) {
      console.log('offline get items');
      AsyncStorage.getItem('tasks').then(data => {
        setTasks(JSON.parse(data || '[]'));
      });
    }
  }, []);

  return (
    <TasksContext.Provider value={{tasks, setTasks, createTask, completeTask}}>
      {children}
    </TasksContext.Provider>
  );
};
