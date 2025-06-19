import apiRequest from './base';

export const login = (data: { email: string; password: string }) =>
  apiRequest('/auth/login', 'POST', data);

export const signup = (data: { email: string; password: string; name: string }) =>
  apiRequest('/auth/signup', 'POST', data);
