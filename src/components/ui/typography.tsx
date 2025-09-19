import { cn } from '@/src/lib/utils'

// Page Title Component
interface PageTitleProps {
  children: React.ReactNode
  className?: string
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1 className={cn(
      "text-2xl font-bold text-gray-900",
      className
    )}>
      {children}
    </h1>
  )
}

// Section Title Component
interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn(
      "text-lg font-semibold text-gray-900",
      className
    )}>
      {children}
    </h2>
  )
}

// Label Component
interface LabelProps {
  children: React.ReactNode
  required?: boolean
  className?: string
}

export function Label({ children, required, className }: LabelProps) {
  return (
    <label className={cn(
      "block text-sm font-medium text-gray-700",
      className
    )}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

// Description Text Component
interface DescriptionProps {
  children: React.ReactNode
  className?: string
}

export function Description({ children, className }: DescriptionProps) {
  return (
    <p className={cn(
      "text-sm text-gray-500",
      className
    )}>
      {children}
    </p>
  )
}

// Value Display Component
interface ValueProps {
  label: string
  value: React.ReactNode
  className?: string
}

export function Value({ label, value, className }: ValueProps) {
  return (
    <div className={className}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  )
}