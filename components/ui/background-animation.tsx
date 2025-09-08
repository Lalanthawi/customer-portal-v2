'use client'

import React, { useEffect, useState } from 'react'

interface BackgroundAnimationProps {
  variant?: 'orbs' | 'mesh' | 'morphing' | 'particles' | 'all'
  intensity?: 'subtle' | 'normal' | 'vibrant'
}

export function BackgroundAnimation({ 
  variant = 'all',
  intensity = 'subtle' 
}: BackgroundAnimationProps) {
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (!mounted || prefersReducedMotion) {
    return null
  }

  const opacityMap = {
    subtle: 0.03,
    normal: 0.05,
    vibrant: 0.08
  }

  const baseOpacity = opacityMap[intensity]

  return (
    <div className="animated-bg" aria-hidden="true">
      {/* Mesh Gradient Background */}
      {(variant === 'mesh' || variant === 'all') && (
        <div className="mesh-gradient" />
      )}

      {/* Floating Gradient Orbs */}
      {(variant === 'orbs' || variant === 'all') && (
        <>
          <div 
            className="gradient-orb gradient-orb-1" 
            style={{ opacity: baseOpacity }}
          />
          <div 
            className="gradient-orb gradient-orb-2" 
            style={{ opacity: baseOpacity }}
          />
          <div 
            className="gradient-orb gradient-orb-3" 
            style={{ opacity: baseOpacity * 0.8 }}
          />
        </>
      )}

      {/* Morphing Blobs */}
      {(variant === 'morphing' || variant === 'all') && (
        <>
          <div 
            className="morph-blob morph-blob-1"
            style={{ opacity: baseOpacity * 0.6 }}
          />
          <div 
            className="morph-blob morph-blob-2"
            style={{ opacity: baseOpacity * 0.6 }}
          />
        </>
      )}

      {/* Particle Network */}
      {variant === 'particles' && (
        <div className="particle-network">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 40}s`,
                animationDuration: `${30 + Math.random() * 20}s`,
                opacity: baseOpacity * 0.4
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Interactive Glow Component for hover effects
export function InteractiveGlow({ children }: { children: React.ReactNode }) {
  return (
    <div className="glow-container">
      {children}
      <div className="glow-effect" />
    </div>
  )
}

// Shimmer Effect Component for CTAs
export function ShimmerButton({ 
  children,
  className = ''
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <button className={`shimmer-effect ${className}`}>
      {children}
    </button>
  )
}