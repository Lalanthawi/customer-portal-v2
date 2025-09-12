'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useCountUp } from '@/hooks/use-count-up'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'

interface StatCardUltraProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  status?: {
    label: string
    type: 'active' | 'error' | 'warning' | 'success'
  }
  trend?: {
    value: number
    label?: string
    isPositive: boolean
    data?: number[]
  }
  variant?: 'holographic' | 'liquid' | 'particle' | 'neon' | 'glass'
  size?: 'small' | 'medium' | 'large' | 'hero'
  className?: string
  children?: React.ReactNode
  animate?: boolean
  loading?: boolean
  onClick?: () => void
  onHover?: (isHovered: boolean) => void
  countUpOptions?: {
    duration?: number
    delay?: number
    prefix?: string
    suffix?: string
    decimals?: number
  }
}

// Mesh gradient background component
function MeshGradient({ variant }: { variant: string }) {
  const colors = {
    holographic: ['#FF006E', '#8338EC', '#3A86FF', '#06FFB4', '#FFBE0B'],
    liquid: ['#4361EE', '#7209B7', '#F72585', '#4CC9F0', '#4361EE'],
    particle: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6B3', '#FFE66D'],
    neon: ['#00F5FF', '#00FF88', '#FF00E5', '#FFD600', '#00F5FF'],
    glass: ['#E8F5FF', '#F0F9FF', '#F5F3FF', '#FFF5F8', '#E8F5FF']
  }

  const selectedColors = colors[variant as keyof typeof colors] || colors.glass

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            </filter>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              {selectedColors.map((color, i) => (
                <stop key={i} offset={`${(i / (selectedColors.length - 1)) * 100}%`} stopColor={color}>
                  <animate attributeName="stop-color" 
                    values={`${selectedColors.join(';')};${selectedColors[0]}`}
                    dur="10s" 
                    repeatCount="indefinite" />
                </stop>
              ))}
            </linearGradient>
          </defs>
          <g filter="url(#goo)">
            <circle cx="30%" cy="30%" r="40%" fill="url(#gradient1)">
              <animate attributeName="cx" values="30%;70%;30%" dur="20s" repeatCount="indefinite" />
              <animate attributeName="cy" values="30%;70%;30%" dur="20s" begin="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="70%" cy="70%" r="35%" fill="url(#gradient1)">
              <animate attributeName="cx" values="70%;30%;70%" dur="20s" repeatCount="indefinite" />
              <animate attributeName="cy" values="70%;30%;70%" dur="20s" begin="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="50%" r="30%" fill="url(#gradient1)">
              <animate attributeName="r" values="30%;45%;30%" dur="10s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  )
}

// Particle system component
function ParticleField({ color = '#FA7921', count = 50 }: { color?: string; count?: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: 0.3
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Holographic effect overlay
function HolographicOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            linear-gradient(135deg, 
              transparent 0%, 
              rgba(255, 0, 110, 0.1) 20%, 
              rgba(131, 56, 236, 0.1) 40%, 
              rgba(58, 134, 255, 0.1) 60%, 
              rgba(6, 255, 180, 0.1) 80%, 
              transparent 100%)
          `,
          backgroundSize: '200% 200%',
          animation: 'holographic 8s ease infinite'
        }}
      />
      <div 
        className="absolute inset-0 mix-blend-color-dodge opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
          transform: 'translateZ(0)'
        }}
      />
    </div>
  )
}

// Real-time waveform visualization
function WaveformVisualizer({ data = [], color = '#FA7921' }: { data?: number[]; color?: string }) {
  const [waveData, setWaveData] = useState(data.length ? data : Array(20).fill(0).map(() => Math.random() * 100))
  
  useEffect(() => {
    if (data.length) {
      setWaveData(data)
      return undefined
    } else {
      const interval = setInterval(() => {
        setWaveData(prev => {
          const newData = [...prev.slice(1), Math.random() * 100]
          return newData
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [data])

  return (
    <div className="w-full h-12 flex items-end gap-0.5">
      {waveData.map((value, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-gradient-to-t rounded-t"
          style={{
            background: `linear-gradient(to top, ${color}40, ${color}80)`,
          }}
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

// Circular progress ring
function CircularProgress({ value, max = 100, color = '#FA7921', size = 60 }: { value: number; max?: number; color?: string; size?: number }) {
  const percentage = (value / max) * 100
  const strokeWidth = size * 0.1
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            filter: `drop-shadow(0 0 6px ${color}50)`
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold">{Math.round(percentage)}%</span>
      </div>
    </div>
  )
}

export function StatCardUltra({
  title,
  value,
  subtitle,
  icon: Icon,
  status,
  trend,
  variant = 'glass',
  size = 'medium',
  className,
  children,
  animate = true,
  loading = false,
  onClick,
  onHover,
  countUpOptions
}: StatCardUltraProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Mouse position tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 300 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  // 3D transforms based on mouse position
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])
  
  // Parse numeric value
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
    : value
  
  // Count up animation
  const { displayValue } = useCountUp({
    end: numericValue,
    duration: animate ? (countUpOptions?.duration ?? 2000) : 0,
    delay: countUpOptions?.delay ?? 0,
    prefix: countUpOptions?.prefix ?? '',
    suffix: countUpOptions?.suffix ?? '',
    decimals: countUpOptions?.decimals ?? 0,
    enableScrollSpy: false
  })
  
  // Handle mouse move for parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set((x - width / 2) / width)
    mouseY.set((y - height / 2) / height)
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.(true)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    onHover?.(false)
  }
  
  // Size configurations
  const sizeClasses = {
    small: 'min-h-[200px]',
    medium: 'min-h-[280px]',
    large: 'min-h-[360px]',
    hero: 'min-h-[480px] col-span-2 row-span-2'
  }
  
  // Loading state
  if (loading) {
    return (
      <div className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/80 backdrop-blur-xl",
        "border border-white/20",
        sizeClasses[size],
        className
      )}>
        <div className="p-6 h-full animate-pulse">
          <div className="h-4 bg-gray-200/50 rounded w-24 mb-4" />
          <div className="h-8 bg-gray-200/50 rounded w-32 mb-2" />
          <div className="h-4 bg-gray-200/50 rounded w-20" />
        </div>
      </div>
    )
  }
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl overflow-hidden cursor-pointer",
        "bg-white/80 backdrop-blur-xl",
        "border border-white/20",
        "shadow-xl hover:shadow-2xl",
        "transition-all duration-500",
        sizeClasses[size],
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setIsExpanded(!isExpanded)
        onClick?.()
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background effects based on variant */}
      {variant === 'liquid' && <MeshGradient variant={variant} />}
      {variant === 'particle' && <ParticleField color={trend?.isPositive ? '#10B981' : '#EF4444'} />}
      {variant === 'holographic' && <HolographicOverlay />}
      
      {/* Neon glow effect */}
      {variant === 'neon' && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${trend?.isPositive ? '#10B98140' : '#EF444440'} 0%, transparent 70%)`,
            filter: 'blur(40px)'
          }}
        />
      )}
      
      {/* Glass morphism overlay */}
      {variant === 'glass' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
      )}
      
      {/* Content */}
      <div className="relative p-6 h-full flex flex-col z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <motion.div
                className="p-3 rounded-xl bg-white/20 backdrop-blur-md"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="h-5 w-5 text-gray-700" />
              </motion.div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
              {status && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mt-1.5",
                    "backdrop-blur-md",
                    status.type === 'active' && "bg-green-400/20 text-green-700",
                    status.type === 'error' && "bg-red-400/20 text-red-700",
                    status.type === 'warning' && "bg-amber-400/20 text-amber-700",
                    status.type === 'success' && "bg-emerald-400/20 text-emerald-700"
                  )}
                >
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full animate-pulse",
                    status.type === 'active' && "bg-green-500",
                    status.type === 'error' && "bg-red-500",
                    status.type === 'warning' && "bg-amber-500",
                    status.type === 'success' && "bg-emerald-500"
                  )} />
                  {status.label}
                </motion.span>
              )}
            </div>
          </div>
          
          {/* Live indicator */}
          {status?.type === 'active' && (
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="flex-grow">
          <motion.div
            className="text-4xl font-bold text-gray-900 mb-1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {animate && typeof value === 'number' ? displayValue : value}
          </motion.div>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        
        {/* Visualizations */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-3"
            >
              {trend?.data && <WaveformVisualizer data={trend.data} color={trend.isPositive ? '#10B981' : '#EF4444'} />}
              {trend && (
                <div className="flex items-center justify-between">
                  <CircularProgress value={Math.abs(trend.value)} max={100} color={trend.isPositive ? '#10B981' : '#EF4444'} />
                  <div className="text-right">
                    <p className={cn(
                      "text-2xl font-bold",
                      trend.isPositive ? "text-green-600" : "text-red-600"
                    )}>
                      {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                    </p>
                    {trend.label && <p className="text-xs text-gray-500">{trend.label}</p>}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Trend indicator (when not expanded) */}
        {!isExpanded && trend && (
          <motion.div 
            className="flex items-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <motion.svg 
                className="w-4 h-4"
                animate={{ y: trend.isPositive ? -2 : 2 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={trend.isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
                />
              </motion.svg>
              {Math.abs(trend.value)}%
            </div>
            {trend.label && <span className="text-xs text-gray-500">{trend.label}</span>}
          </motion.div>
        )}
        
        {/* Children content */}
        {children && (
          <motion.div 
            className="mt-4 pt-4 border-t border-gray-200/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}