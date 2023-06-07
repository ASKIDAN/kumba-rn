import {TaskType} from './types';

export const processTaskFromServer:(obj:TaskType) => TaskType = (task) => {
  const taskTitle = task.title || '';
  const [title, lat, lng] = taskTitle.split('###');
  return {
    ...task,
    title,
    coordinate: {
      latitude: parseInt(lat, 10) || 0,
      longitude: parseInt(lng, 10) || 0,
    }
  };
}

export const processTaskToServer:(task:TaskType) => any = (task) => {
  const newTask = {
    ...task,
    title: `${task.title}###${task.coordinate.latitude}###${task.coordinate.longitude}`
  }
  delete (newTask as any)?.coordinate;
  return newTask;
}

export const syncTask:(tasks:TaskType[], server:TaskType[]) => { result: TaskType[], tasksToCreate: TaskType[], tasksToUpdate: TaskType[] } = (stored, server) => {
  const result = [...stored];
  const tasksToUpdate:TaskType[] = [];
  server.forEach((s) => {
    const task = result.find(r => r.id === s.id);
    if (task && !task.completed && s.completed) {
      task.completed = s.completed;
    }
    if (task && task.completed && !s.completed) {
      tasksToUpdate.push(task);
    }
    if (!task) {
      result.push(s);
    }
  });

  const tasksToCreate = result.filter(t => t.id < 0);

  return {
    result,
    tasksToCreate,
    tasksToUpdate
  };
};
