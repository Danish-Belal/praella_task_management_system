import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface CommentFormProps {
  onSubmit: (content: string, file?: File) => void;
  onCancel: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content, attachment || undefined);
      setContent('');
      setAttachment(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Add Comment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="content">Comment</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment..."
            required
            className="mt-1"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="attachment">Add Attachment</Label>
          <Input
            id="attachment"
            type="file"
            onChange={(e) => setAttachment(e.target.files?.[0] || null)}
            className="mt-1"
          />
          {attachment && (
            <p className="text-sm mt-1 text-gray-600">Selected: {attachment.name}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit">Add Comment</Button>
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
