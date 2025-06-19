import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';


interface SignupFormProps {
  onSignup: (email: string, password: string, name: string) => void;
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSignup, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, password, name);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden">
    {/* Floating accents */}
    <div className="absolute top-12 right-8 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
    <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full"></div>

    <div className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-shadow duration-300 transform hover:-translate-y-1">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Create Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="font-medium text-gray-700">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
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
            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <Button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          Sign Up
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-indigo-600 hover:underline font-medium"
        >
          Log In
        </button>
      </p>
    </div>
  </div>
  );
};