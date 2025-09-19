'use client'

import { ToastContainer } from '@/src/components/ui/toast'
import { useToastStore } from '@/src/hooks/use-toast'

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore()
  
  return <ToastContainer toasts={toasts} onDismiss={removeToast} />
}