import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, className, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={
        `block text-sm font-medium text-gray-700` +
        (className ? ` ${className}` : '')
      }
      {...props}
    >
      {children}
    </label>
  );
};