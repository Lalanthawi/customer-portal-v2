import { cn } from '@/lib/utils'

interface CardGridProps {
  children: React.ReactNode
  columns?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CardGrid({ 
  children, 
  columns = { default: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  className 
}: CardGridProps) {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6'
  }

  const gridClasses = cn(
    'grid',
    `grid-cols-${columns.default || 1}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    gapClasses[gap],
    className
  )

  return (
    <div className={gridClasses}>
      {children}
    </div>
  )
}