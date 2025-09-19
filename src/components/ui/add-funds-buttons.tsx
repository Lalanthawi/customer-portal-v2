'use client'

import { cn } from '@/src/lib/utils'
import { useState } from 'react'

interface AddFundsButtonProps {
  onClick?: () => void
  className?: string
  variant?: 'gradient' | 'glow' | 'neon' | 'minimal' | 'glass' | 'pulse'
}

// Variant 1: Animated Gradient with Glow
export function AddFundsGradient({ onClick, className }: AddFundsButtonProps) {
  return (
    <button 
      onClick={onClick || (() => window.location.href = '/dashboard/wallet?action=deposit')}
      className={cn("relative w-full mt-3 group", className)}
    >
      {/* Animated background gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      
      {/* Button content */}
      <div className="relative px-4 py-2.5 bg-white rounded-lg ring-1 ring-gray-900/5 leading-none flex items-center justify-center space-x-2 transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-500">
        <span className="flex items-center space-x-2">
          {/* Animated icon */}
          <span className="relative">
            <svg className="w-4 h-4 text-green-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            {/* Pulse effect on icon */}
            <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 group-hover:animate-ping"></span>
          </span>
          
          {/* Text with gradient on hover */}
          <span className="text-xs font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-200">
            Add Funds
          </span>
        </span>
        
        {/* Arrow indicator */}
        <svg className="w-3 h-3 text-green-600 group-hover:text-white transform group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
    </button>
  )
}

// Variant 2: Neon Glow Effect
export function AddFundsNeon({ onClick, className }: AddFundsButtonProps) {
  return (
    <button
      onClick={onClick || (() => window.location.href = '/dashboard/wallet?action=deposit')}
      className={cn(
        "relative w-full mt-3 px-4 py-2.5 group overflow-hidden rounded-lg",
        "bg-gradient-to-r from-green-500 to-emerald-500",
        "hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
    >
      {/* Neon border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        <div className="relative">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          {/* Rotating glow */}
          <div className="absolute inset-0 rounded-full bg-white/30 blur-md animate-pulse" />
        </div>
        <span className="text-xs font-bold text-white tracking-wide">ADD FUNDS</span>
        <div className="flex gap-0.5">
          <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
          <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
          <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
        </div>
      </div>
      
      {/* Scan line effect */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent -top-px group-hover:top-full transition-all duration-1000" />
    </button>
  )
}

// Variant 3: Glassmorphism
export function AddFundsGlass({ onClick, className }: AddFundsButtonProps) {
  return (
    <button
      onClick={onClick || (() => window.location.href = '/dashboard/wallet?action=deposit')}
      className={cn(
        "relative w-full mt-3 group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative px-4 py-2.5 bg-white/80 backdrop-blur-md border border-green-200/50 rounded-lg overflow-hidden group-hover:bg-white/90 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-xs font-semibold text-green-700">Add Funds</span>
          <svg className="w-3 h-3 text-green-600 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </button>
  )
}

// Variant 4: Minimal with Micro-interactions
export function AddFundsMinimal({ onClick, className }: AddFundsButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <button
      onClick={onClick || (() => window.location.href = '/dashboard/wallet?action=deposit')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full mt-3 px-4 py-2.5",
        "border-2 border-green-500 rounded-lg",
        "hover:border-green-600 transition-all duration-300",
        "group overflow-hidden",
        className
      )}
    >
      {/* Background fill animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        <div className="relative">
          {/* Money icon animation */}
          <svg 
            className="w-4 h-4 text-green-600 group-hover:text-white transition-colors duration-300"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d={isHovered ? 
                "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" :
                "M12 4v16m8-8H4"
              }
              className="transition-all duration-300"
            />
          </svg>
        </div>
        <span className="text-xs font-semibold text-green-700 group-hover:text-white transition-colors duration-300">
          Add Funds
        </span>
      </div>
    </button>
  )
}

// Variant 5: Pulse Animation
export function AddFundsPulse({ onClick, className }: AddFundsButtonProps) {
  return (
    <button
      onClick={onClick || (() => window.location.href = '/dashboard/wallet?action=deposit')}
      className={cn(
        "relative w-full mt-3 group",
        className
      )}
    >
      {/* Pulsing rings */}
      <div className="absolute inset-0 rounded-lg">
        <div className="absolute inset-0 rounded-lg bg-green-500 opacity-20 animate-ping" />
        <div className="absolute inset-0 rounded-lg bg-green-500 opacity-10 animate-ping animation-delay-200" />
      </div>
      
      {/* Main button */}
      <div className="relative px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-200">
        <div className="flex items-center justify-center gap-2">
          {/* Coin stack icon */}
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
          </svg>
          <span className="text-xs font-bold text-white uppercase tracking-wider">Add Funds</span>
          {/* Plus icon that rotates on hover */}
          <svg className="w-3 h-3 text-white/80 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v12m6-6H6" />
          </svg>
        </div>
      </div>
    </button>
  )
}

// Variant 6: Split Button Design
export function AddFundsSplit({ onClick, className }: AddFundsButtonProps) {
  return (
    <div className={cn("w-full mt-3 flex gap-1", className)}>
      <button
        onClick={onClick || (() => window.location.href = '/dashboard/wallet?action=deposit')}
        className="flex-1 px-3 py-2 bg-white border-2 border-green-500 rounded-l-lg hover:bg-green-50 transition-colors duration-200 group"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xs font-semibold text-green-700">Add Funds</span>
        </div>
      </button>
      <button
        onClick={() => window.location.href = '/dashboard/wallet'}
        className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-r-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 group"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

// Main component that can switch between variants
export function AddFundsButton({ variant = 'gradient', ...props }: AddFundsButtonProps) {
  switch (variant) {
    case 'gradient':
      return <AddFundsGradient {...props} />
    case 'neon':
      return <AddFundsNeon {...props} />
    case 'glass':
      return <AddFundsGlass {...props} />
    case 'minimal':
      return <AddFundsMinimal {...props} />
    case 'pulse':
      return <AddFundsPulse {...props} />
    default:
      return <AddFundsGradient {...props} />
  }
}