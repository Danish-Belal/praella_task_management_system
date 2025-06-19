import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

      onLogin(email, password); 

  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden">
      <div className="absolute top-10 left-5 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-8 right-10 w-48 h-48 bg-white/5 rounded-full"></div>

      <div className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-shadow duration-300 transform hover:-translate-y-1">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="font-medium text-gray-700">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-indigo-600 hover:underline font-medium"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
};
