'use client'

import { ToastContainer } from '@/components/ui/toast'
import { useToastStore } from '@/hooks/use-toast'

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore()
  
  return <ToastContainer toasts={toasts} onDismiss={removeToast} />
}