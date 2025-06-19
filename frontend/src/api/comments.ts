import apiRequest from './base';

export const createComment = (
  pId: string,
  tId: string,
  formData: FormData
) => apiRequest(`/comments/${pId}/${tId}/createComment`, 'POST', formData, true);



export const getAllComments = (pId: string, tId: string) =>
  apiRequest(`/comments/${pId}/${tId}/getAllComments`);

export const deleteComment = (
  pId: string,
  tId: string,
  cId: string
) => apiRequest(`/comments/${pId}/${tId}/deleteComment/${cId}`, 'DELETE');

