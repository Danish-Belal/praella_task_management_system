import apiRequest from './base';

export const createProject = (data: {name:string,description:string} ) =>
  apiRequest('/projects/createProject', 'POST', data);

export const getAllProjects = () => apiRequest(`/projects/getAllProject`);

export const updateProject = (id: string, data: { name: string, description:string }) =>
  apiRequest(`/projects/updateProject/${id}`, 'PUT', data);

export const deleteProject = (id: string) =>
  apiRequest(`/projects/deleteProject/${id}`, 'DELETE');

export const getProjectById = (id: string) =>
  apiRequest(`/projects/getProjectbyId/${id}`);
