'use client'

import { cn } from '@/lib/utils'
import { motion, useAnimation, useInView, Variants } from 'framer-motion'
import { useRef, useEffect, ReactNode } from 'react'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

interface BentoCardProps {
  children: ReactNode
  className?: string
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'hero'
  delay?: number
  gradient?: string
  hover?: boolean
}

// Bento Grid Container
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6",
      "gap-4 md:gap-6",
      "auto-rows-[minmax(180px,_1fr)]",
      className
    )}>
      {children}
    </div>
  )
}

// Individual Bento Card with size variants
export function BentoCard({ 
  children, 
  className, 
  size = 'medium',
  delay = 0,
  gradient,
  hover = true
}: BentoCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()
  
  // Size to grid span mapping
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-2 row-span-1',
    large: 'col-span-2 row-span-2',
    wide: 'col-span-3 row-span-1',
    tall: 'col-span-1 row-span-2',
    hero: 'col-span-3 row-span-2 lg:col-span-4 lg:row-span-2'
  }
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay
      }
    }
  }
  
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={hover ? { 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/80 backdrop-blur-xl",
        "border border-white/20",
        "shadow-xl",
        "transition-all duration-500",
        "group cursor-pointer",
        sizeClasses[size],
        className
      )}
    >
      {/* Animated gradient background */}
      {gradient && (
        <div 
          className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500"
          style={{
            background: gradient,
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 15s ease infinite'
          }}
        />
      )}
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-2px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="absolute inset-0 bg-gradient-radial from-white to-transparent transform rotate-45" />
      </div>
    </motion.div>
  )
}

// Magnetic hover effect wrapper
export function MagneticWrapper({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.1, y: y * 0.1 })
  }
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}

import { useState } from 'react'

// Pre-built Bento layouts
export const BentoLayouts = {
  dashboard: [
    { size: 'hero' as const, content: 'main-metric' },
    { size: 'medium' as const, content: 'secondary-1' },
    { size: 'medium' as const, content: 'secondary-2' },
    { size: 'small' as const, content: 'quick-stat-1' },
    { size: 'small' as const, content: 'quick-stat-2' },
    { size: 'tall' as const, content: 'chart' },
    { size: 'wide' as const, content: 'table' }
  ],
  analytics: [
    { size: 'large' as const, content: 'chart-main' },
    { size: 'large' as const, content: 'chart-secondary' },
    { size: 'medium' as const, content: 'metric-1' },
    { size: 'medium' as const, content: 'metric-2' },
    { size: 'medium' as const, content: 'metric-3' },
    { size: 'medium' as const, content: 'metric-4' }
  ],
  compact: [
    { size: 'medium' as const, content: 'stat-1' },
    { size: 'medium' as const, content: 'stat-2' },
    { size: 'medium' as const, content: 'stat-3' },
    { size: 'medium' as const, content: 'stat-4' }
  ]
}