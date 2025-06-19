import React from 'react';
import { Button } from '../ui/button';
import type { Project } from '../../data/types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onViewTasks: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onViewTasks,
}) => {
  return (
    <div className="group relative">
      {/* Background glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
      
      {/* Main card */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group-hover:bg-white">
        {/* Header section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse delay-75"></div>
            <div className="w-1 h-1 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full animate-pulse delay-150"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
            {project.name}
          </h3>
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Date badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">
              Created {project.created_at.toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => onViewTasks(project.id)}
            className="flex-1 min-w-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300 border-0"
            size="sm"
          >
            <span className="mr-2">👀</span>
            View Tasks
          </Button>
          <Button
            onClick={() => onEdit(project)}
            className="flex-1 min-w-0 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            variant="outline"
            size="sm"
          >
            <span className="mr-2">✏️</span>
            Edit
          </Button>
          <Button
            onClick={() => onDelete(project.id)}
            className="rounded-xl bg-white border-2 border-red-200 text-red-600 font-medium hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            variant="outline"
            size="sm"
          >
            <span className="mr-1">🗑️</span>
            Delete
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-4 left-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};
