"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"

interface AppleStatCardProps {
  title: string
  value: string | number | React.ReactNode
  unit?: string
  subtitle?: string
  trend?: {
    value: number
    label?: string
  }
  sparkline?: number[]
  accentColor?: string
  className?: string
  delay?: number
  details?: Array<{
    label: string
    value: string | number
    color?: string
  }>
  action?: {
    label: string
    onClick: () => void
  }
}

export function AppleStatCard({
  title,
  value,
  unit,
  subtitle,
  trend,
  sparkline,
  accentColor = "#007AFF",
  className,
  delay = 0,
  details,
  action
}: AppleStatCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [hasInteracted, setHasInteracted] = React.useState(false)

  // Mouse position for subtle gradient follow
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations for the gradient
  const gradientX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const gradientY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  // Transform mouse position to gradient position
  const gradientBackground = useTransform(
    [gradientX, gradientY],
    ([x, y]) => {
      if (!isHovered) return "transparent"
      return `radial-gradient(600px circle at ${x}px ${y}px, ${accentColor}08, transparent 40%)`
    }
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!hasInteracted) setHasInteracted(true)
  }

  // Format large numbers with proper spacing (Apple style)
  const formatValue = (val: string | number | React.ReactNode) => {
    // If it's already a React node, return it as is
    if (React.isValidElement(val)) {
      return val
    }

    // Handle null/undefined cases
    if (val == null) {
      return <span className="font-semibold">0</span>
    }

    const numStr = val.toString()
    if (numStr.includes('.')) {
      const [whole, decimal] = numStr.split('.')
      return (
        <>
          <span className="font-semibold">{whole}</span>
          <span className="opacity-60">.{decimal}</span>
        </>
      )
    }
    return <span className="font-semibold">{numStr}</span>
  }

  const isPositive = trend ? trend.value > 0 : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] // Apple's custom easing
      }}
      className={cn(
        "relative group",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className={cn(
        "relative overflow-hidden",
        "bg-white/80 dark:bg-gray-900/80",
        "backdrop-blur-xl backdrop-saturate-150",
        "rounded-2xl",
        "border border-gray-200/50 dark:border-gray-700/50",
        "shadow-sm",
        "transition-all duration-700 ease-out",
        "min-h-[300px] h-full flex flex-col",
        isHovered && "shadow-xl border-gray-300/50 dark:border-gray-600/50 scale-[1.02]"
      )}>

        {/* Subtle gradient that follows mouse */}
        <motion.div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background: gradientBackground
          }}
        />

        {/* Subtle grain texture (Apple style) */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative p-6 flex-1 flex flex-col">
          {/* Title */}
          <motion.h3
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.06em]",
              "text-gray-500 dark:text-gray-400",
              "mb-4",
              "transition-colors duration-500"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.1 }}
          >
            {title}
          </motion.h3>

          {/* Value with sophisticated animation */}
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: delay + 0.2,
              duration: 0.8,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
          >
            <div className="flex items-baseline gap-1">
              <span
                className={cn(
                  "text-[36px] tracking-[-0.02em] leading-none",
                  "text-gray-900 dark:text-white",
                  "font-light",
                  "transition-all duration-500",
                  isHovered && "tracking-[-0.01em]"
                )}
              >
                {formatValue(value)}
              </span>
              {unit && (
                <span className="text-[14px] text-gray-500 dark:text-gray-400 font-normal ml-1">
                  {unit}
                </span>
              )}
            </div>
          </motion.div>

          {/* Subtitle with trend */}
          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            <div className="flex items-center gap-3">
              {subtitle && (
                <p className="text-[13px] text-gray-600 dark:text-gray-300 font-normal">
                  {subtitle}
                </p>
              )}

              {trend && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn(
                      "flex items-center gap-1",
                      "px-2 py-0.5 rounded-full",
                      "text-[11px] font-semibold",
                      isPositive
                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    )}
                  >
                    <svg
                      className={cn("w-3 h-3", isPositive ? "rotate-0" : "rotate-180")}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M7 11l5-5 5 5"
                      />
                    </svg>
                    <span>{Math.abs(trend.value)}%</span>
                    {trend.label && (
                      <span className="opacity-70 font-normal">{trend.label}</span>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Sparkline */}
            {sparkline && sparkline.length > 0 && (
              <div className="flex items-end gap-0.5 h-10">
                {sparkline.map((value, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-full"
                    style={{
                      backgroundColor: accentColor,
                      opacity: 0.3 + (value / Math.max(...sparkline)) * 0.7
                    }}
                    initial={{ height: 0 }}
                    animate={{
                      height: `${(value / Math.max(...sparkline)) * 100}%`
                    }}
                    transition={{
                      delay: delay + 0.4 + (i * 0.02),
                      duration: 0.6,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Additional Details Section */}
          {details && details.length > 0 && (
            <motion.div
              className={cn(
                "pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2.5",
                !action && "mt-auto"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.4, duration: 0.5 }}
            >
              {details.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <span className="text-[12px] text-gray-500 dark:text-gray-400">
                    {detail.label}
                  </span>
                  <span
                    className={cn(
                      "text-[12px] font-medium",
                      detail.color || "text-gray-900 dark:text-white"
                    )}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Action Button - Refined Apple Style */}
          {action && (
            <motion.div
              className="mt-auto pt-4 -mx-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.5, duration: 0.5 }}
            >
              <button
                onClick={action.onClick}
                className={cn(
                  "w-full group/btn relative",
                  "transition-all duration-700 ease-out"
                )}
              >
                {/* Background glow effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 blur-xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor}20, transparent)`
                  }}
                />

                {/* Button content */}
                <div
                  className={cn(
                    "relative flex items-center justify-center gap-2",
                    "py-2.5 px-4 rounded-xl",
                    "bg-white/50 dark:bg-gray-800/30",
                    "backdrop-blur-sm",
                    "border border-gray-100/50 dark:border-gray-700/30",
                    "group-hover/btn:border-gray-200/70 dark:group-hover/btn:border-gray-600/50",
                    "group-hover/btn:bg-white/80 dark:group-hover/btn:bg-gray-800/50",
                    "transition-all duration-500"
                  )}
                >
                  {/* Text with color transition */}
                  <span
                    className="text-[12px] font-semibold tracking-wide transition-all duration-500 group-hover/btn:tracking-wider"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}CC, ${accentColor})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {action.label}
                  </span>

                  {/* Animated arrow instead of plus */}
                  <svg
                    className="w-3.5 h-3.5 transition-all duration-500 group-hover/btn:translate-x-1"
                    style={{ color: accentColor }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute -bottom-px left-1/4 right-1/4 h-px opacity-0 group-hover/btn:opacity-100 transition-all duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                />
              </button>
            </motion.div>
          )}

          {/* Interactive hover indicator - Apple's attention to detail */}
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[2px]",
              "bg-gradient-to-r from-transparent via-current to-transparent",
              "opacity-0 group-hover:opacity-100",
              "transition-all duration-700"
            )}
            style={{ color: accentColor }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </div>

        {/* Subtle corner glow on hover */}
        <div
          className={cn(
            "absolute -top-20 -right-20 w-40 h-40 rounded-full",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-1000",
            "pointer-events-none blur-3xl"
          )}
          style={{
            background: `radial-gradient(circle, ${accentColor}20, transparent 70%)`
          }}
        />
      </div>

      {/* Reflection effect (subtle) */}
      <div className={cn(
        "absolute inset-0 rounded-2xl",
        "bg-gradient-to-b from-white/5 to-transparent",
        "pointer-events-none",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity duration-700"
      )} />
    </motion.div>
  )
}

// Widget-style card for Apple Watch/iOS widget aesthetic
export function AppleWidgetCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "#007AFF",
  className
}: {
  icon?: React.ElementType
  title: string
  value: string | number
  subtitle?: string
  color?: string
  className?: string
}) {
  const [isPressed, setIsPressed] = React.useState(false)

  return (
    <motion.button
      className={cn(
        "relative w-full text-left",
        "bg-gray-100 dark:bg-gray-800",
        "rounded-3xl p-5",
        "transition-all duration-200",
        "active:scale-95",
        isPressed && "scale-95",
        className
      )}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon with colored background */}
      {Icon && (
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      )}

      {/* Content */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {/* Subtle inner shadow for depth */}
      <div className={cn(
        "absolute inset-0 rounded-3xl",
        "shadow-inner",
        "pointer-events-none",
        "opacity-0",
        isPressed && "opacity-100",
        "transition-opacity duration-200"
      )} />
    </motion.button>
  )
}

// Activity Ring Card (Apple Watch style)
export function AppleActivityRing({
  title,
  value,
  max = 100,
  color = "#FF3B30",
  size = 120,
  strokeWidth = 12,
  className
}: {
  title: string
  value: number
  max?: number
  color?: string
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn("relative", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />

        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1.5,
            ease: [0.21, 0.47, 0.32, 0.98],
            delay: 0.2
          }}
          style={{
            strokeDasharray: circumference,
            filter: `drop-shadow(0 0 6px ${color}40)`
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {title}
          </p>
        </motion.div>
      </div>
    </div>
  )
}