import React from 'react';
import { Button } from '../ui/button';
import type { Task } from '../../data/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onViewComments: (taskId: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusColors = {
  todo: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onViewComments,
}) => {
  const isOverdue = new Date() > task.deadline && task.status !== 'done';

  return (
   <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group-hover:bg-white">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-red-600 transition-all duration-300">
            {task.title}
          </h3>
          <div className="flex gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>{task.priority}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>{task.status}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>
        <div className="text-sm text-gray-500 mb-4">
          <div className={`font-medium ${isOverdue ? 'text-red-600' : ''}
            `}>
            Deadline: {new Date(task.deadline).toLocaleDateString()}{isOverdue && ' (Overdue)'}
          </div>
          <div>Created: {task.created_at.toLocaleDateString()}</div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => onViewComments(task.id)}
            className="flex-1 min-w-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300 border-0"
            size="sm"
          >
            💬 Comments
          </Button>
          <Button
            onClick={() => onEdit(task)}
            className="flex-1 min-w-0 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-medium hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-600 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            variant="outline"
            size="sm"
          >
            ✏️ Edit
          </Button>
          <Button
            onClick={() => onDelete(task.id)}
            className="rounded-xl bg-white border-2 border-red-200 text-red-600 font-medium hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            variant="outline"
            size="sm"
          >
            🗑️ Delete
          </Button>
        </div>
        {/* Decorative */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-red-500 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};