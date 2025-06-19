import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import type { Comment, User } from '../../data/types';

interface CommentCardProps {
  comment: Comment;
  user: User;
  currentUserId: string;
  replies: Comment[];
  onReply: (parentId: string, content: string, file?: File) => void;
  onDelete: (commentId: string) => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  user,
  currentUserId,
  replies,
  onReply,
  onDelete,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyFile, setReplyFile] = useState<File | null>(null);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    onReply(comment.id, replyContent, replyFile || undefined);
    setReplyContent('');
    setReplyFile(null);
    setShowReplyForm(false);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="font-semibold text-sm">{user.name}</div>
        <div className="text-xs text-gray-500">
          {new Date(comment.created_at).toLocaleDateString()}
        </div>
      </div>

      <p className="text-gray-700 mb-3">{comment.content}</p>

      {comment.attachment && (
        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Attachment:</div>
          <a
            href={comment.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View Attachment
          </a>
        </div>
      )}

      <div className="flex gap-2 mb-3">
        <Button
          onClick={() => setShowReplyForm(!showReplyForm)}
          variant="ghost"
          size="sm"
        >
          Reply
        </Button>
        {comment.user_id === currentUserId && (
          <Button
            onClick={() => onDelete(comment.id)}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        )}
      </div>

      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mb-3">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="mb-2"
            rows={2}
            required
          />
          <Input
            type="file"
            onChange={(e) => setReplyFile(e.target.files?.[0] || null)}
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm">Reply</Button>
            <Button
              type="button"
              onClick={() => {
                setShowReplyForm(false);
                setReplyContent('');
                setReplyFile(null);
              }}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {replies.length > 0 && (
        <div className="ml-4 border-l-2 border-gray-200 pl-4">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-white rounded-lg p-3 mb-2">
              <div className="flex justify-between items-start mb-1">
                <div className="font-semibold text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">
                  {new Date(reply.created_at).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-700 text-sm">{reply.content}</p>
              {reply.attachment && (
                <a
                  href={reply.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline mt-1 block"
                >
                  View Attachment
                </a>
              )}
              {reply.user_id === currentUserId && (
                <Button
                  onClick={() => onDelete(reply.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
