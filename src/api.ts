import {TaskType} from './types';

const API_URL = 'https://todo-app-sky.herokuapp.com';
function request<T>(path: string, method: 'GET' | 'POST' | 'PATCH', body?: any):Promise<T> {
  return fetch(`${API_URL}${path}`, { method, body })
    .then(data => data.json())
    .then(data => data);
}

const api = {
  post: <T>(path: string, data:any) => request<T>(path, 'POST', JSON.stringify(data)),
  get: <T>(path: string) => request<T>(path, 'GET'),
  patch: <T>(path: string, data:any) => request<T>(path, 'PATCH', JSON.stringify(data)),
}

export const getTasks = () => api.get<TaskType[]>('/');

export const postTask = (data: any) => api.post<TaskType>('/', data);

export const patchTask = (id: number, data: any) => api.patch<TaskType>('/' + id, data);
