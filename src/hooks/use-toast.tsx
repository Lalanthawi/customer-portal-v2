'use client'

import { create } from 'zustand'
import { Toast } from '@/src/components/ui/toast'

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(7)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000
    }
    set((state) => ({ toasts: [...state.toasts, newToast] }))
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }))
  },
  clearToasts: () => {
    set({ toasts: [] })
  }
}))

// Hook for easy toast usage
export function useToast() {
  const { addToast, removeToast, clearToasts } = useToastStore()

  const toast = {
    success: (title: string, description?: string) => {
      addToast({ type: 'success', title, description })
    },
    error: (title: string, description?: string) => {
      addToast({ type: 'error', title, description })
    },
    warning: (title: string, description?: string) => {
      addToast({ type: 'warning', title, description })
    },
    info: (title: string, description?: string) => {
      addToast({ type: 'info', title, description })
    },
    custom: (toast: Omit<Toast, 'id'>) => {
      addToast(toast)
    },
    dismiss: removeToast,
    clear: clearToasts
  }

  return toast
}