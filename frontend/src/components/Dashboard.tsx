import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectForm } from '../components/projects/ProjectForm';
import { TaskCard } from '../components/tasks/taskCard';
import { TaskForm } from '../components/tasks/taskForm';
import { CommentCard } from '../components/comments/CommentCard';
import { CommentForm } from '../components/comments/CommentForm';
import type { Project, Task, Comment, User } from '../data/types';

interface DashboardProps {
  user: User;
  projects: Project[];
  tasks: Task[];
  comments: Comment[];
  onCreateProject: (title: string, description: string) => void;
  onUpdateProject: (id: string, title: string, description: string) => void;
  onDeleteProject: (id: string) => void;
  onCreateTask: (taskData: Partial<Task>) => void;
  onUpdateTask: (id: string, taskData: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onCreateComment: (projectId: string, taskId: string, formData: FormData) => Promise<void>;
  onDeleteComment: (projectId: string, taskId: string, commentId: string) => void;
  onLoadProjectData: (projectId: string) => Promise<void>;
}

type ViewMode = 'projects' | 'tasks' | 'comments';

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  projects,
  tasks,
  comments,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onCreateComment,
  onDeleteComment,
  onLoadProjectData,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateProject = (title: string, description: string) => {
    onCreateProject(title, description);
    setShowProjectForm(false);
  };

  const handleUpdateProject = (title: string, description: string) => {
    if (editingProject) {
      onUpdateProject(editingProject.id, title, description);
      setEditingProject(null);
      setShowProjectForm(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleViewTasks = (projectId: string) => {
    console.log("PRoject id in dashborad", projectId);
    onLoadProjectData(projectId);
    setSelectedProjectId(projectId);
    setViewMode('tasks');
  };

  const handleCreateTask = (taskData: Partial<Task>) => {
    console.log('HandleCreateTask i Dashboard', taskData)
    onCreateTask(taskData);
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
      setEditingTask(null);
      setShowTaskForm(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleViewComments = (taskId: string) => {
    setSelectedTaskId(taskId);
    setViewMode('comments');
  };

  const handleCreateComment = async (
  content: string,
  file?: File // <- Accept actual file object
) => {
  if (!selectedProjectId || !selectedTaskId) return;
  console.log("pId",selectedProjectId, "TId", selectedTaskId);
  

  const formData = new FormData();
  formData.append('content', content);
  if (file) formData.append('attachment', file);

  try {
    console.log("Geoing to create comment", formData);
    
    await onCreateComment(selectedProjectId, selectedTaskId, formData); // Pass FormData to API handler
    setShowCommentForm(false);
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};


  const handleReply = async (
  parentId: string,
  content: string,
  file?: File
) => {
  if (!selectedProjectId || !selectedTaskId) return;

  const formData = new FormData();
  formData.append('content', content);
  if (file) formData.append('attachment', file);
  formData.append('parent_id', parentId);

  try {
    await onCreateComment(selectedProjectId, selectedTaskId, formData); // Pass FormData with parent_id
  } catch (error) {
    console.error("Error replying to comment:", error);
  }
};


  const filteredTasks = selectedProjectId 
    ? tasks.filter(task => task.project_id === selectedProjectId)
    : tasks;

  const filteredComments = selectedTaskId
    ? comments.filter(comment => comment.task_id === selectedTaskId)
    : comments;

  const topLevelComments = filteredComments.filter(comment => !comment.parent_id);

  const getCommentReplies = (commentId: string) => {
    return filteredComments.filter(comment => comment.parent_id === commentId);
  };

  const selectedTask = selectedTaskId ? tasks.find(task => task.id === selectedTaskId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setViewMode('projects')}
                  variant={viewMode === 'projects' ? 'default' : 'outline'}
                  className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                    viewMode === 'projects' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105' 
                      : 'bg-white/70 border-2 border-gray-200 text-gray-600 hover:bg-white hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  Projects
                </Button>
                {selectedProjectId && (
                  <Button
                    onClick={() => setViewMode('tasks')}
                    variant={viewMode === 'tasks' ? 'default' : 'outline'}
                    className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                      viewMode === 'tasks' 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:scale-105' 
                        : 'bg-white/70 border-2 border-gray-200 text-gray-600 hover:bg-white hover:border-emerald-300 hover:text-emerald-600'
                    }`}
                  >
                    Tasks
                  </Button>
                )}
                {selectedTaskId && (
                  <Button
                    onClick={() => setViewMode('comments')}
                    variant={viewMode === 'comments' ? 'default' : 'outline'}
                    className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                      viewMode === 'comments' 
                        ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transform hover:scale-105' 
                        : 'bg-white/70 border-2 border-gray-200 text-gray-600 hover:bg-white hover:border-orange-300 hover:text-orange-600'
                    }`}
                  >
                    Comments
                  </Button>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                {viewMode === 'projects' && (
                  <Button 
                    onClick={() => setShowProjectForm(true)}
                    className="rounded-full px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transform hover:scale-105 transition-all duration-300"
                  >
                    ✨ New Project
                  </Button>
                )}
                {viewMode === 'tasks' && selectedProjectId && (
                  <Button 
                    onClick={() => setShowTaskForm(true)}
                    className="rounded-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300"
                  >
                    ➕ New Task
                  </Button>
                )}
                {viewMode === 'comments' && selectedTaskId && (
                  <Button 
                    onClick={() => setShowCommentForm(true)}
                    className="rounded-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300"
                  >
                    💬 Add Comment
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Forms Section */}
        {showProjectForm && (
          <div className="mb-8 animate-fade-in">
            <ProjectForm
              project={editingProject || undefined}
              onSave={editingProject ? handleUpdateProject : handleCreateProject}
              onCancel={() => {
                setShowProjectForm(false);
                setEditingProject(null);
              }}
            />
          </div>
        )}
        
        {showTaskForm && selectedProjectId && (
          
          <div className="mb-8 animate-fade-in">
            <TaskForm
              task={editingTask || undefined}
              project_id={selectedProjectId}
              onSave={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setShowTaskForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        )}

        {showCommentForm && selectedTaskId && (
          <div className="mb-8 animate-fade-in">
            <CommentForm
              onSubmit={handleCreateComment}
              onCancel={() => setShowCommentForm(false)}
            />
          </div>
        )}

        {/* Content Section */}
        <div className="space-y-8">
          {viewMode === 'projects' && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Your Projects
                </h2>
                <p className="text-gray-600 text-lg">Manage and organize your creative endeavors</p>
              </div>
              {projects.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-6xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No projects yet</h3>
                  <p className="text-gray-500 mb-6">Create your first project to get started!</p>
                  <Button 
                    onClick={() => setShowProjectForm(true)}
                    className="rounded-full px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transform hover:scale-105 transition-all duration-300"
                  >
                    ✨ Create Project
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onEdit={handleEditProject}
                      onDelete={onDeleteProject}
                      onViewTasks={handleViewTasks}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {viewMode === 'tasks' && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Tasks
                </h2>
                <p className="text-gray-600 text-lg">Track progress and stay organized</p>
              </div>
              {filteredTasks.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-6xl">📋</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
                  <p className="text-gray-500 mb-6">Add your first task to start tracking progress!</p>
                  {selectedProjectId && (
                    <Button 
                      onClick={() => setShowTaskForm(true)}
                      className="rounded-full px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300"
                    >
                      ➕ Create Task
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={onDeleteTask}
                      onViewComments={handleViewComments}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {viewMode === 'comments' && selectedTask && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Comments for: {selectedTask.title}
                </h2>
                <p className="text-gray-600 text-lg">Collaborate and share feedback</p>
              </div>
              {topLevelComments.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-6xl">💬</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No comments yet</h3>
                  <p className="text-gray-500 mb-6">Start the conversation with your team!</p>
                  <Button 
                    onClick={() => setShowCommentForm(true)}
                    className="rounded-full px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300"
                  >
                    💬 Add Comment
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {topLevelComments.map(comment => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        user={user}
                        currentUserId={user.id}
                        replies={getCommentReplies(comment.id)}
                        onReply={handleReply}
                        onDelete={(commentId) => {
                          if (selectedProjectId && selectedTaskId) {
                            onDeleteComment(selectedProjectId, selectedTaskId, commentId);
                          } else {
                            console.warn("Missing selectedProjectId or selectedTaskId");
                          }
                        }}
                      />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
