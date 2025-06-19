import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
}

export interface Toast extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (options: ToastOptions) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);
let toastCount = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, duration = 3000 }: ToastOptions) => {
    const id = ++toastCount;
    setToasts((prev) => [...prev, { id, title, description, duration }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-gray-800 text-white px-4 py-2 rounded shadow"
          >
            <div className="font-semibold">{t.title}</div>
            {t.description && <div className="text-sm">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
