'use client'

import { useState, useEffect } from 'react'
import { StatCardUltra } from '@/components/ui/stat-card-ultra'
import { BentoGrid, BentoCard } from '@/components/ui/stat-card-bento'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Zap,
  Globe,
  Shield,
  Award,
  Target,
  Layers
} from 'lucide-react'
import { motion } from 'framer-motion'

// Simulated real-time data
function useRealtimeData() {
  const [data, setData] = useState({
    revenue: 2456789,
    users: 12543,
    conversion: 68.9,
    performance: 94.2,
    activeNow: 3421,
    growth: 23.5
  })
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 500),
        users: prev.users + Math.floor(Math.random() * 10 - 5),
        conversion: Math.max(0, Math.min(100, prev.conversion + (Math.random() * 2 - 1))),
        performance: Math.max(0, Math.min(100, prev.performance + (Math.random() * 2 - 1))),
        activeNow: Math.max(0, prev.activeNow + Math.floor(Math.random() * 20 - 10)),
        growth: Math.max(0, prev.growth + (Math.random() * 0.5 - 0.25))
      }))
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return data
}

// Generate sparkline data
function generateSparkline(trend: 'up' | 'down' | 'stable' = 'up', points = 20) {
  const data: number[] = []
  let value = 50
  
  for (let i = 0; i < points; i++) {
    if (trend === 'up') {
      value += Math.random() * 10 - 3
    } else if (trend === 'down') {
      value -= Math.random() * 10 - 3
    } else {
      value += Math.random() * 6 - 3
    }
    value = Math.max(10, Math.min(90, value))
    data.push(value)
  }
  
  return data
}

export default function UltraDashboard() {
  const realtimeData = useRealtimeData()
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week')
  
  // Animated background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ultra-modern animated background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 opacity-50" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
            x: mousePosition.x - 200,
            y: mousePosition.y - 200
          }}
          animate={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 p-6 space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ultra Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Real-time analytics with next-gen UI</p>
          </div>
          
          {/* Period selector */}
          <div className="flex gap-2 p-1 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg">
            {(['day', 'week', 'month'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Bento Grid Layout */}
        <BentoGrid>
          {/* Hero Revenue Card */}
          <BentoCard size="hero" gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" delay={0}>
            <StatCardUltra
              title="Total Revenue"
              value={realtimeData.revenue}
              subtitle="Live revenue tracking"
              icon={DollarSign}
              status={{ label: "Live", type: "active" }}
              trend={{
                value: 15.3,
                label: "vs last period",
                isPositive: true,
                data: generateSparkline('up')
              }}
              variant="holographic"
              size="hero"
              countUpOptions={{
                prefix: "$",
                duration: 2500,
                decimals: 0
              }}
            />
          </BentoCard>
          
          {/* Active Users Card */}
          <BentoCard size="large" gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" delay={0.1}>
            <StatCardUltra
              title="Active Users"
              value={realtimeData.activeNow}
              subtitle="Currently online"
              icon={Users}
              status={{ label: "Peak", type: "success" }}
              trend={{
                value: 8.7,
                isPositive: true,
                data: generateSparkline('stable')
              }}
              variant="liquid"
              size="large"
            />
          </BentoCard>
          
          {/* Conversion Rate */}
          <BentoCard size="medium" gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" delay={0.2}>
            <StatCardUltra
              title="Conversion Rate"
              value={realtimeData.conversion}
              subtitle="Optimization score"
              icon={Target}
              trend={{
                value: 4.2,
                isPositive: true,
                data: generateSparkline('up', 15)
              }}
              variant="particle"
              size="medium"
              countUpOptions={{
                suffix: "%",
                decimals: 1
              }}
            />
          </BentoCard>
          
          {/* Performance Score */}
          <BentoCard size="medium" gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)" delay={0.3}>
            <StatCardUltra
              title="Performance"
              value={realtimeData.performance}
              subtitle="System health"
              icon={Activity}
              status={{ label: "Optimal", type: "active" }}
              trend={{
                value: 2.1,
                isPositive: true,
                data: generateSparkline('stable', 10)
              }}
              variant="neon"
              size="medium"
              countUpOptions={{
                suffix: "%",
                decimals: 1
              }}
            />
          </BentoCard>
          
          {/* Growth Rate */}
          <BentoCard size="tall" gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" delay={0.4}>
            <StatCardUltra
              title="Growth Rate"
              value={realtimeData.growth}
              subtitle="Monthly increase"
              icon={TrendingUp}
              trend={{
                value: 12.5,
                isPositive: true,
                label: "Accelerating",
                data: generateSparkline('up', 25)
              }}
              variant="glass"
              size="large"
              countUpOptions={{
                suffix: "%",
                decimals: 1,
                duration: 3000
              }}
            >
              {/* Custom content */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Target</span>
                  <span className="font-semibold">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(realtimeData.growth / 25) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </StatCardUltra>
          </BentoCard>
          
          {/* Total Users */}
          <BentoCard size="small" delay={0.5}>
            <StatCardUltra
              title="Total Users"
              value={realtimeData.users}
              icon={Users}
              trend={{
                value: 5.3,
                isPositive: true
              }}
              variant="holographic"
              size="small"
            />
          </BentoCard>
          
          {/* Security Score */}
          <BentoCard size="small" delay={0.6}>
            <StatCardUltra
              title="Security"
              value={98}
              icon={Shield}
              status={{ label: "Protected", type: "success" }}
              variant="neon"
              size="small"
              countUpOptions={{
                suffix: "%"
              }}
            />
          </BentoCard>
          
          {/* Achievements */}
          <BentoCard size="small" delay={0.7}>
            <StatCardUltra
              title="Achievements"
              value={47}
              icon={Award}
              trend={{
                value: 3,
                isPositive: true,
                label: "This month"
              }}
              variant="particle"
              size="small"
            />
          </BentoCard>
        </BentoGrid>
        
        {/* Feature Showcase */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all">
            <Zap className="w-8 h-8 text-yellow-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">60fps animations with GPU acceleration</p>
          </div>
          
          <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all">
            <Globe className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Sync</h3>
            <p className="text-sm text-gray-600">WebSocket powered live updates</p>
          </div>
          
          <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all">
            <Layers className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Multi-layered</h3>
            <p className="text-sm text-gray-600">Depth and dimension in every interaction</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}