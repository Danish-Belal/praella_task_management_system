import React from 'react';
import { Button } from '../ui/button';
import type { User } from '../../data/types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Project Manager
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Welcome, {user.name}
            </span>
            <Button onClick={onLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};