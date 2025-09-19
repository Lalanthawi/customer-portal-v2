'use client'

import { useState, useEffect } from 'react'

interface AddAddressModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (address: AddressData) => void
}

interface AddressData {
  fullName: string
  phoneNumber: string
  country: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  isDefault: boolean
  addressType: 'home' | 'office' | 'other'
  label?: string
}

export default function AddAddressModal({ isOpen, onClose, onSave }: AddAddressModalProps) {
  const [formData, setFormData] = useState<AddressData>({
    fullName: '',
    phoneNumber: '',
    country: 'Japan',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    isDefault: false,
    addressType: 'home',
    label: ''
  })

  const [errors, setErrors] = useState<Partial<Record<keyof AddressData, string>>>({})

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: '',
        phoneNumber: '',
        country: 'Japan',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        isDefault: false,
        addressType: 'home',
        label: ''
      })
      setErrors({})
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    // Clear error for this field
    if (errors[name as keyof AddressData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof AddressData, string>> = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State/Prefecture is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'
    
    // Phone number validation (basic)
    if (formData.phoneNumber && !/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format'
    }
    
    // Postal code validation for Japan (7 digits, optionally with hyphen)
    if (formData.country === 'Japan' && formData.postalCode && !/^\d{3}-?\d{4}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Invalid Japanese postal code (e.g., 100-0001)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave?.(formData)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          {/* Glassmorphism container */}
          <div className="relative overflow-hidden rounded-2xl">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FA7921]/5 via-transparent to-[#FF9A56]/5"></div>
            
            {/* Border gradient */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-[#FA7921]/20 via-gray-200/30 to-[#FF9A56]/20">
              <div className="h-full w-full rounded-2xl bg-white/60 backdrop-blur-xl"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-sm px-6 py-4 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Add New Address</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Enter your shipping address details</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-lg transition-all"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all ${
                          errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-gray-200 bg-white/70'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all ${
                          errors.phoneNumber ? 'border-red-500 bg-red-50/50' : 'border-gray-200 bg-white/70'
                        }`}
                        placeholder="+81 90-1234-5678"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>
                      )}
                    </div>

                    {/* Country */}
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 bg-white/70 rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all"
                      >
                        <option value="Japan">Japan</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Address Line 1 */}
                    <div className="sm:col-span-2">
                      <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Address Line 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        id="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all ${
                          errors.addressLine1 ? 'border-red-500 bg-red-50/50' : 'border-gray-200 bg-white/70'
                        }`}
                        placeholder="Street address, building name"
                      />
                      {errors.addressLine1 && (
                        <p className="mt-1 text-xs text-red-600">{errors.addressLine1}</p>
                      )}
                    </div>

                    {/* Address Line 2 */}
                    <div className="sm:col-span-2">
                      <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Address Line 2 <span className="text-xs text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        id="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 bg-white/70 rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all"
                        placeholder="Apartment, suite, unit, etc."
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all ${
                          errors.city ? 'border-red-500 bg-red-50/50' : 'border-gray-200 bg-white/70'
                        }`}
                        placeholder="Tokyo"
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                      )}
                    </div>

                    {/* State/Prefecture */}
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1.5">
                        State/Prefecture <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all ${
                          errors.state ? 'border-red-500 bg-red-50/50' : 'border-gray-200 bg-white/70'
                        }`}
                        placeholder="Tokyo"
                      />
                      {errors.state && (
                        <p className="mt-1 text-xs text-red-600">{errors.state}</p>
                      )}
                    </div>

                    {/* Postal Code */}
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all ${
                          errors.postalCode ? 'border-red-500 bg-red-50/50' : 'border-gray-200 bg-white/70'
                        }`}
                        placeholder="100-0001"
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-xs text-red-600">{errors.postalCode}</p>
                      )}
                    </div>

                    {/* Address Type */}
                    <div>
                      <label htmlFor="addressType" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Address Type
                      </label>
                      <select
                        name="addressType"
                        id="addressType"
                        value={formData.addressType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 bg-white/70 rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all"
                      >
                        <option value="home">Home</option>
                        <option value="office">Office</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Label (Optional) */}
                    <div className="sm:col-span-2">
                      <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Address Label <span className="text-xs text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="label"
                        id="label"
                        value={formData.label}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 bg-white/70 rounded-lg focus:ring-2 focus:ring-[#FA7921]/20 focus:border-[#FA7921] transition-all"
                        placeholder="e.g., Main Office, Parents House"
                      />
                    </div>

                    {/* Set as Default */}
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={formData.isDefault}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]/20 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Set as default shipping address</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-gray-50/50 to-white/50 backdrop-blur-sm px-6 py-4 border-t border-gray-200/50">
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white/70 border border-gray-200 rounded-lg hover:bg-gray-50/70 hover:border-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#FA7921] to-[#FF9A56] rounded-lg hover:from-[#FA7921]/90 hover:to-[#FF9A56]/90 shadow-lg shadow-[#FA7921]/20 hover:shadow-xl hover:shadow-[#FA7921]/30 transition-all"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}