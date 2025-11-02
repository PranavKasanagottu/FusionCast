'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ToastContext = createContext(undefined);

const MAX_TOASTS = 5;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast = {
      id,
      type: toast.type || 'info',
      message: toast.message,
      duration: toast.duration || (toast.type === 'error' ? 4000 : 3000),
    };

    setToasts((prevToasts) => {
      const updatedToasts = [...prevToasts, newToast];
      // Remove oldest toast if we exceed the maximum
      if (updatedToasts.length > MAX_TOASTS) {
        return updatedToasts.slice(1);
      }
      return updatedToasts;
    });

    // Auto-dismiss after duration
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Convenience methods
  const toast = useMemo(
    () => ({
      success: (message, duration) => addToast({ type: 'success', message, duration }),
      error: (message, duration) => addToast({ type: 'error', message, duration }),
      info: (message, duration) => addToast({ type: 'info', message, duration }),
      warning: (message, duration) => addToast({ type: 'warning', message, duration }),
    }),
    [addToast]
  );

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      toast,
    }),
    [toasts, addToast, removeToast, toast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
