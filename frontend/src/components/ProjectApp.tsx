import React, { useState, useEffect } from 'react';
import { LoginForm } from './auth/LoginForm';
import { SignupForm } from './auth/SignupForm';
import { Header } from './layout/Header';
import { Dashboard } from './Dashboard';
import type { User, Project, Task, Comment } from '../data/types';
import { useToast } from './hooks/use-toast';
import { AuthAPI, TaskAPI,ProjectAPI, CommentAPI } from '../api';



export const ProjectApp: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
  try {
    const res = await AuthAPI.login({ email, password });

    // Save token + user
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));

    setUser({
      id: res.user.id,
      email: res.user.email,
      name: res.user.name, // or fetch `name` if returned
      password: '',
      createdAt: new Date(), // can be fetched or omitted
    });

    toast({
      title: 'Login successful',
      description: 'Welcome back!',
    });

    // 🔄 Optionally fetch projects now
    fetchProjects();
  } catch (error: any) {
    toast({
      title: 'Login failed',
      description: error.message,
    });
  }
};
const fetchProjects = async () => {
  try {
    const res = await ProjectAPI.getAllProjects();
    console.log("All project data", res.ProjectData);

    const parsedProjects = res.ProjectData.map((project: any) => ({
      ...project,
      created_at: new Date(project.created_at),
      updated_at: new Date(project.updated_at),
    }));

    setProjects(parsedProjects);
  } catch (err: any) {
    toast({
      title: 'Failed to fetch projects',
      description: err.message,
    });
  }
};


  const handleSignup = async(email: string, password: string, name: string) => {
     const res = await AuthAPI.signup({email,password,name});
    setUser(mockUser);
    toast({
      title: "Account created",
      description: "Welcome to Project Manager!",
    });
  };

  const handleLogout = () => {
    setUser(null);
    setProjects([]);
    setTasks([]);
    setComments([]);
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const handleCreateProject = async(name: string, description: string) => {
    if (!user) return;

    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
    const res = await ProjectAPI.createProject({name, description} );
    console.log("Creating project respond.", res);
    
    
    const createdProject = res.ProjectData;

    setProjects((prev) => [...prev, createdProject]);

    toast({
      title: "Project created",
      description: `"${createdProject.name}" has been created successfully.`,
    });
  } catch (err: any) {
    toast({
      title: "Failed to create project",
      description: err.message,
    });
  }
};

  const handleUpdateProject = async (id: string, title: string, description: string) => {
  try {
    const res = await ProjectAPI.updateProject(id, {
      name: title,
      description: description,
    });
    // console.log(res,"res data");
    

    const updatedProject = {
      ...res.ProjectData,
      created_at: new Date(res.ProjectData.created_at),
      updated_at: new Date(res.ProjectData.updated_at),
    };

    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? updatedProject : project
      )
    );

    toast({
      title: "Project updated",
      description: "Project has been updated successfully.",
    });
  } catch (error: any) {
    toast({
      title: "Update failed",
      description: error.message || "Something went wrong",
    });
  }
};


  const handleDeleteProject = async (id: string) => {
  try {
    await ProjectAPI.deleteProject(id);

    setProjects((prev) => prev.filter((project) => project.id !== id));
    setTasks((prev) => prev.filter((task) => task.project_id !== id));

    toast({
      title: "Project deleted",
      description: "Project and all its tasks have been deleted.",
    });
  } catch (error: any) {
    toast({
      title: "Delete failed",
      description: error.message || "Something went wrong",
    });
  }
};

  const handleCreateTask = async (taskData: Partial<Task>) => {
    console.log("TaskDatat", taskData);
    
  if (!user) return;
  if (!user || !taskData.project_id) {
    toast({ title: "Missing Project ID", description: "Please select a project." });
    return;
  }

  try {
    const res = await TaskAPI.createTask(taskData.project_id, {
      title: taskData.title!,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      deadline: taskData.deadline?.toISOString() || new Date().toISOString(),
    });

    // Convert to proper Task object and append
    const newTask: Task = {
      ...res.task,
      deadline: new Date(res.task.deadline),
      created_at: new Date(res.task.created_at),
      updated_at: new Date(res.task.updated_at),
    };

    setTasks((prev) => [...prev, newTask]);

    toast({
      title: 'Task created',
      description: `"${newTask.title}" has been created successfully.`,
    });
  } catch (err: any) {
    toast({ title: 'Task creation failed', description: err.message });
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

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updatedTask : t))
    );

    toast({
      title: 'Task updated',
      description: `"${updatedTask.title}" has been updated successfully.`,
    });
  } catch (err: any) {
    toast({ title: 'Update failed', description: err.message });
  }
};


  const handleDeleteTask = async (id: string) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  try {
    await TaskAPI.deleteTask(task.project_id, id);

    setTasks((prev) => prev.filter((t) => t.id !== id));
    setComments((prev) => prev.filter((c) => c.task_id !== id));

    toast({
      title: 'Task deleted',
      description: 'Task and all its comments have been deleted.',
    });
  } catch (err: any) {
    toast({ title: 'Deletion failed', description: err.message });
  }
};


  const handleCreateComment = async (
  projectId: string,
  taskId: string,
  formData: FormData
): Promise<void> => {
  try {
    const response = await CommentAPI.createComment(projectId, taskId, formData);

    const newComment: Comment = {
      ...response.comment,
      created_at: new Date(response.comment.created_at),
      updated_at: new Date(response.comment.updated_at),
    };

    setComments(prev => [...prev, newComment]);

    toast({
      title: "Comment added",
      description: "Your comment has been added successfully.",
    });
  } catch (err: any) {
    toast({ title: "Failed to add comment", description: err.message });
  }
};




  const handleDeleteComment = async (
  projectId: string,
  taskId: string,
  commentId: string
) => {
  try {
    await CommentAPI.deleteComment(projectId, taskId, commentId);
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    toast({ title: "Comment deleted", description: "Successfully deleted comment." });
  } catch (error: any) {
    toast({ title: "Failed to delete comment", description: error.message });
  }
};

  const fetchTasksAndComments = async (projectId: string) => {
  try {
    // 1. Fetch all tasks for the project
    const taskRes = await TaskAPI.getAllTasks(projectId);
    const parsedTasks = taskRes.tasks.map((task: any) => ({
      ...task,
      deadline: new Date(task.deadline),
      created_at: new Date(task.created_at),
      updated_at: new Date(task.updated_at),
    }));
    setTasks(parsedTasks);

    // 2. Fetch all comments for each task
    const commentFetches = parsedTasks.map((task: Task) =>
      CommentAPI.getAllComments(projectId, task.id)
    );

    const allCommentsResults = await Promise.all(commentFetches);

    // Flatten all comments from all tasks
    const allComments: Comment[] = allCommentsResults.flatMap((res) =>
      res.comments.map((comment: any) => ({
        ...comment,
        created_at: new Date(comment.created_at),
        updated_at: new Date(comment.updated_at),
      }))
    );

    setComments(allComments);
  } catch (err: any) {
    toast({
      title: 'Failed to load tasks/comments',
      description: err.message,
    });
  }
};





  useEffect(() => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    setUser(JSON.parse(user));
    fetchProjects();
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