'use client'

import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

interface ToastProps {
  toast: Toast
  onDismiss: (id: string) => void
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const colors = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200'
}

const iconColors = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-amber-600',
  info: 'text-blue-600'
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const Icon = icons[toast.type]
  
  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onDismiss(toast.id)
      }, toast.duration)
      
      return () => clearTimeout(timer)
    }
    return undefined
  }, [toast, onDismiss])

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-slide-in",
      colors[toast.type]
    )}>
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconColors[toast.type])} />
      <div className="flex-1">
        <p className="font-medium">{toast.title}</p>
        {toast.description && (
          <p className="text-sm mt-1 opacity-90">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// Toast Container Component
export function ToastContainer({ toasts, onDismiss }: { toasts: Toast[], onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}