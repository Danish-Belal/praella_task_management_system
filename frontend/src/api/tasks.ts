import apiRequest from './base';

export const createTask = (
  pId: string,
  data: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status?: 'to-do' | 'in-progress' | 'done';
    deadline: string;
  }
) => apiRequest(`/tasks/${pId}/createTask`, 'POST', data);




export const getAllTasks = (pId: string) =>
  apiRequest(`/tasks/getAllTasks/${pId}`);

export const updateTask = (
  pId: string,
  id: string,
  data: {
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    deadline?: string;
    status?: 'to-do' | 'in-progress' | 'done';
  }
) => apiRequest(`/tasks/${pId}/updateTask/${id}`, 'PUT', data);

export const deleteTask = (pId: string, id: string) =>
  apiRequest(`/tasks/${pId}/deleteTask/${id}`, 'DELETE');
