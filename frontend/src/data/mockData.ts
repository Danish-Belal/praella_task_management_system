import type { User, Project, Task, Comment  }  from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    password: 'password123',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    password: 'password456',
    createdAt: new Date('2024-01-02'),
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Website',
    description: 'Building a modern e-commerce platform',
    owner_id: '1',
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'React Native mobile application',
    owner_id: '1',
    created_at: new Date('2024-01-20'),
    updated_at: new Date('2024-01-20'),
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Setup Authentication',
    description: 'Implement user login and registration',
    priority: 'high',
    status: 'in-progress',
    deadline: new Date('2024-02-01'),
    project_id: '1',
    created_at: new Date('2024-01-16'),
    updated_at: new Date('2024-01-18'),
  },
  {
    id: '2',
    title: 'Design Database Schema',
    description: 'Create database tables and relationships',
    priority: 'medium',
    status: 'done',
    deadline: new Date('2024-01-25'),
    project_id: '1',
    created_at: new Date('2024-01-16'),
    updated_at: new Date('2024-01-22'),
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Started working on the authentication flow',
    task_id: '1',
    user_id: '1',
    created_at: new Date('2024-01-18'),
    updated_at: new Date('2024-01-18'),
  },
  {
    id: '2',
    content: 'Should we use JWT tokens?',
    task_id: '1',
    user_id: '1',
    parent_id: '1',
    created_at: new Date('2024-01-18'),
    updated_at: new Date('2024-01-18'),
  },
];