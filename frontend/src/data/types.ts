export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'to-do' | 'in-progress' | 'done'; // matching backend value
  deadline: Date; // or Date if you parse it manually
  project_id: string;
  created_at: Date; // or Date
  updated_at: Date; // or Date
  
}


export interface Comment {
  id: string;
  content: string;
  task_id: string;
  user_id: string;
  parent_id?: string | null;
  created_at: Date;
  updated_at: Date;
  attachment?: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
