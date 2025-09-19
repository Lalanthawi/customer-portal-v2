import { cn } from '@/src/lib/utils'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export function PageLayout({ 
  children, 
  className,
  maxWidth = '2xl'
}: PageLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      "w-full mx-auto px-4 sm:px-6 lg:px-8 py-6",
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  )
}