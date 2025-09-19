'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/src/lib/utils'
import { Button } from './button'

interface PageHeaderProps {
  title: string
  subtitle?: string
  showBack?: boolean
  backHref?: string
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ 
  title, 
  subtitle, 
  showBack = true, 
  backHref,
  actions,
  className 
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    } else {
      router.back()
    }
  }

  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <Button
              onClick={handleBack}
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}