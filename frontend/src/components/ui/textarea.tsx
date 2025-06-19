import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({ id, rows = 3, className, ...props }) => {
  return (
    <textarea
      id={id}
      rows={rows}
      className={
        `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none` +
        (className ? ` ${className}` : '')
      }
      {...props}
    />
  );
};