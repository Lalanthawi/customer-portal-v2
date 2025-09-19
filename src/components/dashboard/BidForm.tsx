'use client'

import { useState, useEffect, memo } from 'react'
import { GroupId, GroupBidFormData as BidFormData, ValidationError } from '@/app/dashboard/group-bidding/types'

interface BidFormProps {
  selectedGroup: GroupId | null
  onSubmit: (data: BidFormData) => Promise<void>
  isSubmitting: boolean
  minBidAmount?: number
  maxQuantity?: number
}

const BidForm = memo(function BidForm({
  selectedGroup,
  onSubmit,
  isSubmitting,
  minBidAmount = 100000,
  maxQuantity = 10
}: BidFormProps) {
  const [formData, setFormData] = useState<BidFormData>({
    groupId: selectedGroup || 'A',
    vehicleId: '',
    bidAmount: minBidAmount
  })
  
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedGroup) {
      setFormData(prev => ({ ...prev, groupId: selectedGroup }))
    }
  }, [selectedGroup])

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const validateForm = (): ValidationError[] => {
    const newErrors: ValidationError[] = []
    
    if (!formData.groupId) {
      newErrors.push({ field: 'groupId', message: 'Please select a group' })
    }
    
    if (formData.bidAmount < minBidAmount) {
      newErrors.push({ 
        field: 'bidAmount', 
        message: `Minimum bid amount is ${formatCurrency(minBidAmount)}` 
      })
    }
    
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setErrors([])
    setIsLoading(true)
    
    try {
      await onSubmit(formData)
      // Reset form on success
      setFormData({
        groupId: selectedGroup || 'A',
        vehicleId: '',
        bidAmount: minBidAmount
      })
    } catch (error) {
      console.error('Failed to submit bid:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldError = (field: ValidationError['field']): string | undefined => {
    return errors.find(e => e.field === field)?.message
  }

  const totalAmount = formData.bidAmount

  const quickAmounts = [100000, 250000, 500000, 1000000]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Place Your Bid</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selected Group Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Group
          </label>
          <div className={`px-4 py-3 rounded-lg border-2 ${
            formData.groupId 
              ? 'bg-[#FA7921]/5 border-[#FA7921] text-gray-900' 
              : 'bg-gray-50 border-gray-200 text-gray-400'
          }`}>
            {formData.groupId ? `Group ${formData.groupId}` : 'No group selected'}
          </div>
          {getFieldError('groupId') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('groupId')}</p>
          )}
        </div>

        {/* Bid Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bid Amount per Unit (¥)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            <input
              type="number"
              value={formData.bidAmount}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                bidAmount: Math.max(0, parseInt(e.target.value) || 0) 
              }))}
              className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent text-lg placeholder:text-gray-400 ${
                getFieldError('bidAmount') ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter amount"
              min={minBidAmount}
              step={10000}
            />
          </div>
          
          {/* Quick amount buttons */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {quickAmounts.map(amount => (
              <button
                key={amount}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, bidAmount: amount }))}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-[#FA7921] hover:bg-[#FA7921]/5 transition-colors font-medium"
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>
          
          {getFieldError('bidAmount') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('bidAmount')}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {}}
              className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-[#FA7921] hover:bg-[#FA7921]/5 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <input
              type="number"
              value={1}
              onChange={() => {}}
              className={`w-24 px-4 py-2 text-center border-2 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent text-lg font-medium placeholder:text-gray-400 ${
                'border-gray-200'
              }`}
              placeholder="1"
              min={1}
              max={maxQuantity}
            />
            
            <button
              type="button"
              onClick={() => {}}
              className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-[#FA7921] hover:bg-[#FA7921]/5 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Total Amount Display */}
        <div className="p-4 bg-gradient-to-r from-[#FA7921]/10 to-[#FF9A56]/10 rounded-xl border border-[#FA7921]/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total Amount</span>
            <span className="text-2xl font-bold text-[#FA7921]">
              {formatCurrency(totalAmount)}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {formatCurrency(formData.bidAmount)}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isSubmitting || !formData.groupId}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
            isLoading || isSubmitting || !formData.groupId
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#FA7921] to-[#FF9A56] hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isLoading || isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Placing Bid...
            </span>
          ) : (
            'Place Bid'
          )}
        </button>
      </form>
    </div>
  )
})

export default BidForm