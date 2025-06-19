import React from 'react';

export type ButtonVariant = 'default' | 'ghost' | 'outline' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center border rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles: Record<ButtonVariant, string> = {
    default: 'border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    outline: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    destructive: 'bg-red border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  };
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const combinedClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
