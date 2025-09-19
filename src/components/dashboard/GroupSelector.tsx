'use client'

import { memo } from 'react'
import { GroupId, GROUP_IDS, GroupInfo } from '@/app/dashboard/group-bidding/types'

interface GroupSelectorProps {
  groups: Map<GroupId, GroupInfo>
  selectedGroup: GroupId | null
  onGroupSelect: (groupId: GroupId) => void
  disabled?: boolean
}

const GroupSelector = memo(function GroupSelector({
  groups,
  selectedGroup,
  onGroupSelect,
  disabled = false
}: GroupSelectorProps) {
  const getGroupStyles = (groupId: GroupId): string => {
    const group = groups.get(groupId)
    const isSelected = selectedGroup === groupId
    
    const baseStyles = 'relative aspect-square rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
    
    if (isSelected) {
      return `${baseStyles} bg-gradient-to-br from-[#FA7921] to-[#FF9A56] text-white shadow-lg ring-4 ring-[#FA7921]/30 scale-105`
    }
    
    if (!group) {
      return `${baseStyles} bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200`
    }
    
    switch (group.status) {
      case 'winning':
        return `${baseStyles} bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md border-2 border-green-400`
      case 'outbid':
        return `${baseStyles} bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md border-2 border-red-400 animate-pulse`
      case 'has-bid':
        return `${baseStyles} bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md border-2 border-blue-400`
      default:
        return `${baseStyles} bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-[#FA7921]`
    }
  }

  const formatCurrency = (amount: number): string => {
    return `¥${amount.toLocaleString('ja-JP')}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Select Group</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-green-500 to-emerald-600"></div>
            <span className="text-gray-600">Winning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-red-500 to-rose-600"></div>
            <span className="text-gray-600">Outbid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-blue-500 to-indigo-600"></div>
            <span className="text-gray-600">Has Bid</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-3">
        {GROUP_IDS.map((groupId) => {
          const group = groups.get(groupId)
          const hasActiveBid = group?.yourBid && group.yourBid.status !== 'lost'
          
          return (
            <button
              key={groupId}
              onClick={() => onGroupSelect(groupId)}
              disabled={disabled}
              className={getGroupStyles(groupId)}
              aria-label={`Group ${groupId}${hasActiveBid ? ' - You have an active bid' : ''}`}
            >
              <span className="text-xl font-bold">{groupId}</span>
              
              {/* Status indicators */}
              {group?.status === 'winning' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse">
                  <svg className="w-4 h-4 text-white p-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              {group?.status === 'outbid' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              )}
              
              {/* Bid info tooltip on hover */}
              {hasActiveBid && (
                <div className="absolute inset-x-0 -bottom-8 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1 py-0.5 rounded shadow-sm whitespace-nowrap">
                  {formatCurrency(group.yourBid!.bidAmount)}
                </div>
              )}
            </button>
          )
        })}
      </div>
      
      {/* Selected group info */}
      {selectedGroup && groups.get(selectedGroup) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Group {selectedGroup}</p>
              <p className="text-xs text-gray-600 mt-1">
                Current highest: {formatCurrency(groups.get(selectedGroup)!.currentHighestBid)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{groups.get(selectedGroup)!.totalBidders} bidders</p>
              {groups.get(selectedGroup)!.yourBid && (
                <p className="text-xs font-medium text-blue-600 mt-1">
                  Your bid: {formatCurrency(groups.get(selectedGroup)!.yourBid!.bidAmount)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

export default GroupSelector