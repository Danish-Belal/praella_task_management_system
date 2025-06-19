import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import type { Project } from '../../data/types';

interface ProjectFormProps {
  project?: Project;
  onSave: (name: string, description: string) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSave,
  onCancel,
}) => {
  const [name, setTitle] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');

  useEffect(() => {
    if (project) {
      setTitle(project.name);
      setDescription(project.description);
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, description);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {project ? 'Edit Project' : 'Create Project'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={name}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1"
            rows={4}
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            {project ? 'Update' : 'Create'}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};