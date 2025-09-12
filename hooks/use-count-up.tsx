'use client'

import { useEffect, useRef, useState } from 'react'

interface UseCountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  decimals?: number
  enableScrollSpy?: boolean
  scrollSpyDelay?: number
}

export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  enableScrollSpy = true,
  scrollSpyDelay = 0
}: UseCountUpProps) {
  const [displayValue, setDisplayValue] = useState(
    `${prefix}${start.toFixed(decimals)}${suffix}`
  )
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  const formatNumber = (num: number) => {
    const formatted = num.toFixed(decimals)
    // Add thousand separators
    const parts = formatted.split('.')
    parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''
    return parts.join('.')
  }

  const animate = () => {
    if (hasAnimated) return

    const startTime = performance.now() + delay
    startTimeRef.current = startTime

    const updateCount = (currentTime: number) => {
      if (currentTime < startTime) {
        frameRef.current = requestAnimationFrame(updateCount)
        return
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out-expo)
      const easeOutExpo = progress === 1 
        ? 1 
        : 1 - Math.pow(2, -10 * progress)
      
      const currentValue = start + (end - start) * easeOutExpo
      setDisplayValue(`${prefix}${formatNumber(currentValue)}${suffix}`)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(updateCount)
      } else {
        setHasAnimated(true)
      }
    }

    frameRef.current = requestAnimationFrame(updateCount)
  }

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    if (!enableScrollSpy) {
      animate()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => animate(), scrollSpyDelay)
          }
        })
      },
      { threshold: 0.1 }
    )

    // We'll observe the parent element when it's rendered
    const timeoutId = setTimeout(() => {
      const element = document.querySelector('[data-count-up]')
      if (element) {
        elementRef.current = element as HTMLElement
        observer.observe(element)
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [hasAnimated, enableScrollSpy])

  const reset = () => {
    setHasAnimated(false)
    setDisplayValue(`${prefix}${start.toFixed(decimals)}${suffix}`)
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
    }
  }

  return {
    displayValue,
    reset,
    hasAnimated
  }
}