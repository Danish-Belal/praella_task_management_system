import React, { useState, useEffect } from 'react';
import { LoginForm } from './auth/LoginForm';
import { SignupForm } from './auth/SignupForm';
import { Header } from './layout/Header';
import { Dashboard } from './Dashboard';
import type { User, Project, Task, Comment } from '../data/types';
import { useToast } from './hooks/use-toast';
import { AuthAPI, TaskAPI, ProjectAPI, CommentAPI } from '../api';

export const ProjectApp: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();

  const loadUserData = async (userData: User) => {
    setUser(userData);
    await fetchProjects();
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await AuthAPI.login({ email, password });

      const loggedInUser: User = {
        id: res.user.id,
        email: res.user.email,
        name: res.user.name,
        password: '',
        createdAt: res.user.created_at,
      };

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      toast({ title: 'Login successful', description: 'Welcome back!' });

      await loadUserData(loggedInUser);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast({ title: 'Login failed', description: message });
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      const res = await AuthAPI.signup({ email, password, name });

      const signedUpUser: User = {
        id: res.user.id,
        email: res.user.email,
        name: res.user.name,
        password: '',
        createdAt: res.user.created_at,
      };

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(signedUpUser));

      toast({ title: 'Account created', description: 'Welcome to Project Manager!' });

      await loadUserData(signedUpUser);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      toast({ title: 'Signup failed', description: message });
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await ProjectAPI.getAllProjects();
      const parsedProjects = res.ProjectData.map((p: Project) => ({
        ...p,
        created_at: new Date(p.created_at),
        updated_at: new Date(p.updated_at),
      }));
      setProjects(parsedProjects);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch projects';
      toast({ title: 'Error', description: message });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProjects([]);
    setTasks([]);
    setComments([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast({ title: 'Logged out', description: 'See you next time!' });
  };

  const handleCreateProject = async (name: string, description: string) => {
    try {
      const res = await ProjectAPI.createProject({ name, description });
      const createdProject: Project = {
        ...res.ProjectData,
        created_at: new Date(res.ProjectData.created_at),
        updated_at: new Date(res.ProjectData.updated_at),
      };
      setProjects((prev) => [...prev, createdProject]);

      toast({ title: 'Project created', description: `"${createdProject.name}" created.` });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create project';
      toast({ title: 'Error', description: message });
    }
  };

  const handleUpdateProject = async (id: string, title: string, description: string) => {
    try {
      const res = await ProjectAPI.updateProject(id, { name: title, description });

      const updatedProject = {
        ...res.ProjectData,
        created_at: new Date(res.ProjectData.created_at),
        updated_at: new Date(res.ProjectData.updated_at),
      };

      setProjects((prev) => prev.map((project) => (project.id === id ? updatedProject : project)));

      toast({ title: 'Project updated', description: 'Successfully updated.' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Update failed';
      toast({ title: 'Update failed', description: message });
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await ProjectAPI.deleteProject(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      setTasks((prev) => prev.filter((task) => task.project_id !== id));

      toast({ title: 'Project deleted', description: 'Deleted with its tasks.' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      toast({ title: 'Delete failed', description: message });
    }
  };

  const handleCreateTask = async (taskData: Partial<Task>) => {
    if (!user || !taskData.project_id) {
      toast({ title: 'Missing Project ID', description: 'Please select a project.' });
      return;
    }

    try {
      const res = await TaskAPI.createTask(taskData.project_id, {
        title: taskData.title!,
        description: taskData.description || '',
        priority: taskData.priority || 'medium',
        deadline: taskData.deadline?.toISOString() || new Date().toISOString(),
      });

      const newTask: Task = {
        ...res.task,
        deadline: new Date(res.task.deadline),
        created_at: new Date(res.task.created_at),
        updated_at: new Date(res.task.updated_at),
      };

      setTasks((prev) => [...prev, newTask]);

      toast({ title: 'Task created', description: `"${newTask.title}" added.` });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Task creation failed';
      toast({ title: 'Error', description: message });
    }
  };

  const handleUpdateTask = async (id: string, taskData: Partial<Task>) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const res = await TaskAPI.updateTask(task.project_id, id, {
        title: taskData.title ?? task.title,
        description: taskData.description ?? task.description,
        priority: taskData.priority ?? task.priority,
        deadline: (taskData.deadline ?? task.deadline).toISOString(),
        status: taskData.status ?? task.status,
      });

      const updatedTask: Task = {
        ...res.task,
        deadline: new Date(res.task.deadline),
        created_at: new Date(res.task.created_at),
        updated_at: new Date(res.task.updated_at),
      };

      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));

      toast({ title: 'Task updated', description: `"${updatedTask.title}" updated.` });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Update failed';
      toast({ title: 'Update failed', description: message });
    }
  };

  const handleDeleteTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      await TaskAPI.deleteTask(task.project_id, id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setComments((prev) => prev.filter((c) => c.task_id !== id));

      toast({ title: 'Task deleted', description: 'Deleted successfully.' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Deletion failed';
      toast({ title: 'Deletion failed', description: message });
    }
  };

  const handleCreateComment = async (
    projectId: string,
    taskId: string,
    formData: FormData
  ) => {
    try {
      const response = await CommentAPI.createComment(projectId, taskId, formData);

      const newComment: Comment = {
        ...response.comment,
        created_at: new Date(response.comment.created_at),
        updated_at: new Date(response.comment.updated_at),
      };

      setComments((prev) => [...prev, newComment]);

      toast({ title: 'Comment added', description: 'Comment created.' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to add comment';
      toast({ title: 'Error', description: message });
    }
  };

  const handleDeleteComment = async (
    projectId: string,
    taskId: string,
    commentId: string
  ) => {
    try {
      await CommentAPI.deleteComment(projectId, taskId, commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast({ title: 'Comment deleted', description: 'Removed.' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete comment';
      toast({ title: 'Error', description: message });
    }
  };

  const fetchTasksAndComments = async (projectId: string) => {
    try {
      const taskRes = await TaskAPI.getAllTasks(projectId);
      const parsedTasks = taskRes.tasks.map((task: Task) => ({
        ...task,
        deadline: new Date(task.deadline),
        created_at: new Date(task.created_at),
        updated_at: new Date(task.updated_at),
      }));
      setTasks(parsedTasks);

      const commentResults = await Promise.all(
        parsedTasks.map((task:Task) => CommentAPI.getAllComments(projectId, task.id))
      );

      const allComments: Comment[] = commentResults.flatMap((res) =>
        res.comments.map((comment: Comment) => ({
          ...comment,
          created_at: new Date(comment.created_at),
          updated_at: new Date(comment.updated_at),
        }))
      );

      setComments(allComments);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to load tasks/comments';
      toast({ title: 'Error', description: message });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      loadUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {isSignup ? (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setIsSignup(false)}
          />
        ) : (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setIsSignup(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      <Dashboard
        user={user}
        projects={projects}
        tasks={tasks}
        comments={comments}
        onLoadProjectData={fetchTasksAndComments}
        onCreateProject={handleCreateProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onCreateComment={handleCreateComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
};
