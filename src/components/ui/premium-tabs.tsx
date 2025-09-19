import React from 'react'
import { cn } from '@/src/lib/utils'

interface Tab {
  id: string
  label: string
  count?: number
}

interface PremiumTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function PremiumTabs({ tabs, activeTab, onTabChange, className }: PremiumTabsProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
            activeTab === tab.id
              ? 'bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white shadow-md transform scale-[1.02]'
              : 'bg-gray-50/80 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              "ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full",
              activeTab === tab.id ? "bg-white/20" : "bg-gray-200/50"
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}