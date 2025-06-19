import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
}

export const Input: React.FC<InputProps> = ({ id, className, ...props }) => {
  return (
    <input
      id={id}
      className={
        `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm` +
        (className ? ` ${className}` : '')
      }
      {...props}
    />
  );
};

