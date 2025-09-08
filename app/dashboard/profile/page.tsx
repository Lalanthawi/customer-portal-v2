'use client'

import { useState, useRef, ChangeEvent, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { ProfileTab, UserProfileData, PasswordData, Device, NotificationSettings, PaymentMethod } from './types'
import TwoFactorAuth from '../components/TwoFactorAuth'
import AddAddressModal from '../components/AddAddressModal'

// Tab definitions
const tabs: ProfileTab[] = [
  { id: 'account', label: 'Account' },
  { id: 'status', label: 'Account Status' },
  { id: 'company', label: 'Business Details' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing', label: 'Billing & Payment' },
]

// Countries list
const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Japan', 
  'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 
  'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria'
]

// Languages list
const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 
  'Portuguese', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 
  'Finnish', 'Japanese', 'Korean', 'Chinese (Simplified)', 'Chinese (Traditional)'
]

// Device data
const devices: Device[] = [
  {
    id: '1',
    browser: 'Chrome on macOS',
    browserIcon: '🌐',
    device: 'MacBook Pro',
    location: 'Tokyo, Japan',
    lastActivity: '2 minutes ago',
    isCurrentDevice: true,
  },
  {
    id: '2',
    browser: 'Safari on iPhone',
    browserIcon: '📱',
    device: 'iPhone 14 Pro',
    location: 'Tokyo, Japan',
    lastActivity: '1 hour ago',
  },
  {
    id: '3',
    browser: 'Chrome on Windows',
    browserIcon: '💻',
    device: 'Windows PC',
    location: 'Osaka, Japan',
    lastActivity: '3 days ago',
  },
  {
    id: '4',
    browser: 'Firefox on Android',
    browserIcon: '📱',
    device: 'Samsung Galaxy S23',
    location: 'Kyoto, Japan',
    lastActivity: '1 week ago',
  },
]

// Payment methods data
const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'stripe',
    last4: '4242',
    brand: 'Stripe',
    isDefault: true,
    expiryDate: '12/25',
  },
  {
    id: '2',
    type: 'paypal',
    email: 'john.doe@example.com',
    isDefault: false,
  },
  {
    id: '3',
    type: 'wise',
    email: 'john.doe@example.com',
    isDefault: false,
  },
]

function ProfileSettingsContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('account')
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [profileData, setProfileData] = useState<UserProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 234 567 8900',
    country: 'United States',
    language: 'English',
  })
  const [companyData, setCompanyData] = useState({
    hasCompany: false,
    companyName: '',
    companyRegistrationNumber: '',
    vatNumber: '',
    businessType: '',
    companyAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    yearEstablished: '',
    importFrequency: '',
    averageMonthlyVolume: '',
  })
  // Account types based on user profile
  const getAccountType = () => {
    // Check for staff roles first
    const userEmail = profileData.email.toLowerCase()
    if (userEmail.includes('@zervtek.com') || userEmail.includes('@admin')) {
      // Staff roles based on department
      if (userEmail.includes('admin')) {
        return { type: 'Administrator', description: 'Full system access and management', isStaff: true }
      } else if (userEmail.includes('sales')) {
        return { type: 'Sales Representative', description: 'Customer management and bid approval', isStaff: true }
      } else if (userEmail.includes('support')) {
        return { type: 'Support Agent', description: 'Customer support and assistance', isStaff: true }
      } else if (userEmail.includes('finance')) {
        return { type: 'Finance Team', description: 'Payment and billing management', isStaff: true }
      }
      return { type: 'Staff Member', description: 'Internal team member', isStaff: true }
    }
    
    // Customer account types
    if (companyData.hasCompany) {
      return { type: 'Business Account', description: 'Verified business with priority support', isStaff: false }
    } else {
      // Check if user has bid history to determine if they're new or regular
      const hasPreviousPurchases = false // This would check actual purchase history
      if (hasPreviousPurchases) {
        return { type: 'Trusted Buyer', description: 'Regular customer with instant bid approval', isStaff: false }
      }
      return { type: 'Standard Account', description: 'New buyer - bids require approval', isStaff: false }
    }
  }
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: {
      newBids: true,
      outbid: true,
      wonAuctions: true,
      newsletters: false,
    },
    pushNotifications: {
      enabled: true,
      newBids: true,
      outbid: false,
      wonAuctions: true,
    },
    smsNotifications: {
      enabled: false,
      wonAuctions: false,
      paymentReminders: false,
    },
  })
  const [show2FA, setShow2FA] = useState(false)
  const [twoFAPurpose, setTwoFAPurpose] = useState<'setup' | 'verify' | 'upgrade'>('verify')
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [pendingUpgrade, setPendingUpgrade] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const passwordRequirements = [
    { met: passwordData.newPassword.length >= 8, text: 'Minimum 8 characters long, the more the better' },
    { met: /[a-z]/.test(passwordData.newPassword), text: 'At least one lowercase character' },
    { met: /[\d\W\s]/.test(passwordData.newPassword), text: 'At least one number, symbol, or whitespace character' },
  ]

  const handle2FAVerification = () => {
    // 2FA verification successful
    setShow2FA(false)
    
    if (pendingUpgrade) {
      // After successful 2FA verification, proceed with upgrade
      setCompanyData({
        ...companyData,
        hasCompany: true,
      })
      setPendingUpgrade(false)
      setActiveTab('company')
      // Show success message
      alert('2FA verification successful! Please complete your business details to upgrade your account.')
    } else if (twoFAPurpose === 'setup') {
      setTwoFAEnabled(true)
      alert('Two-factor authentication has been successfully enabled!')
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-8">
            {/* Profile Photo Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
                <p className="text-xs text-gray-500 mt-0.5">Update your profile picture</p>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden shadow-inner">
                      {profileImage ? (
                        <Image src={profileImage} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/gif"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="primary"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Photo
                      </Button>
                      <Button
                        onClick={() => setProfileImage(null)}
                        variant="secondary"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-700 flex items-start gap-2">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Allowed formats: JPG, GIF or PNG. Maximum file size: 800KB</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                <p className="text-xs text-gray-500 mt-0.5">Update your personal details</p>
              </div>
              <form className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all placeholder:text-black/70"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all placeholder:text-black/70"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all"
                      placeholder="Enter email address"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      value={profileData.phoneNumber}
                      onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all"
                      placeholder="Enter phone number"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      id="country"
                      value={profileData.country}
                      onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all appearance-none"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      id="language"
                      value={profileData.language}
                      onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all appearance-none"
                    >
                      {languages.map((language) => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <Button type="submit" variant="primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </Button>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            {/* Delete Account Section */}
            <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-2xl border border-red-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Account</h3>
                    <p className="text-sm text-gray-700 mb-4">Permanently remove your account and all associated data</p>
                    <div className="bg-white/70 backdrop-blur rounded-xl p-4 mb-4 border border-red-100">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <strong className="text-red-600">Warning:</strong> This action cannot be undone. This will permanently delete your account, 
                        including all your bids, favorites, transaction history, and personal information.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <label className="flex items-start gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={deleteConfirmed}
                          onChange={(e) => setDeleteConfirmed(e.target.checked)}
                          className="w-5 h-5 text-red-600 border-red-300 rounded focus:ring-red-500 mt-0.5"
                        />
                        <span className="text-sm text-gray-700 select-none">
                          I understand that my account will be permanently deleted and cannot be recovered
                        </span>
                      </label>
                      <Button
                        disabled={!deleteConfirmed}
                        variant="destructive"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Account Permanently
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'status':
        return (
          <div className="space-y-8">
            {/* Account Tier Overview */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-white/80 text-sm mb-2">Current Account Tier</p>
                    <h2 className="text-4xl font-bold mb-2">
                      {getAccountType().type}
                    </h2>
                    <p className="text-white/90">{getAccountType().description}</p>
                  </div>
                  {getAccountType().isStaff ? (
                    <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-full border border-white/30">
                      <span className="text-sm font-bold">STAFF</span>
                    </div>
                  ) : getAccountType().type === 'Business Account' ? (
                    <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-full border border-white/30">
                      <span className="text-sm font-bold">VERIFIED</span>
                    </div>
                  ) : null}
                </div>
                
                {/* Account Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold mb-1">Bid Approval</p>
                    <p className="text-xs text-white/80">
                      {getAccountType().type === 'Standard Account' ? 'Requires approval' : 'Instant approval'}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold mb-1">Support Level</p>
                    <p className="text-xs text-white/80">
                      {getAccountType().isStaff ? 'Internal Access' : 
                       getAccountType().type === 'Business Account' ? 'Priority' : 'Standard'}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold mb-1">Transaction Fees</p>
                    <p className="text-xs text-white/80">
                      {getAccountType().isStaff ? 'N/A' :
                       getAccountType().type === 'Business Account' ? 'Reduced rates' : 'Standard rates'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Tiers Comparison */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">{getAccountType().isStaff ? 'Staff Roles' : 'Account Tiers'}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{getAccountType().isStaff ? 'Different staff access levels' : 'Compare benefits across different account levels'}</p>
              </div>
              <div className="p-6">
                {getAccountType().isStaff ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Administrator */}
                    <div className={`rounded-xl border-2 p-6 ${
                      getAccountType().type === 'Administrator' 
                        ? 'border-[#FA7921] bg-orange-50/30' 
                        : 'border-gray-200'
                    }`}>
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">Administrator</h4>
                        <p className="text-xs text-gray-500 mt-1">System management</p>
                      </div>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Full system access</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">User management</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">System configuration</span>
                        </li>
                      </ul>
                    </div>

                    {/* Sales Representative */}
                    <div className={`rounded-xl border-2 p-6 ${
                      getAccountType().type === 'Sales Representative' 
                        ? 'border-[#FA7921] bg-orange-50/30' 
                        : 'border-gray-200'
                    }`}>
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">Sales Representative</h4>
                        <p className="text-xs text-gray-500 mt-1">Customer management</p>
                      </div>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Bid approval</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Customer claims</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Sales reports</span>
                        </li>
                      </ul>
                    </div>

                    {/* Support Agent */}
                    <div className={`rounded-xl border-2 p-6 ${
                      getAccountType().type === 'Support Agent' 
                        ? 'border-[#FA7921] bg-orange-50/30' 
                        : 'border-gray-200'
                    }`}>
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">Support Agent</h4>
                        <p className="text-xs text-gray-500 mt-1">Customer assistance</p>
                      </div>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Ticket management</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Customer chat</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Issue resolution</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Standard Account */}
                  <div className={`rounded-xl border-2 p-6 ${
                    getAccountType().type === 'Standard Account' 
                      ? 'border-[#FA7921] bg-orange-50/30' 
                      : 'border-gray-200'
                  }`}>
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-900">Standard</h4>
                      <p className="text-xs text-gray-500 mt-1">New buyers</p>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-600">Bid approval required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Basic support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Access to auctions</span>
                      </li>
                    </ul>
                  </div>

                  {/* Trusted Buyer */}
                  <div className={`rounded-xl border-2 p-6 ${
                    getAccountType().type === 'Trusted Buyer' 
                      ? 'border-[#FA7921] bg-orange-50/30' 
                      : 'border-gray-200'
                  }`}>
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-900">Trusted Buyer</h4>
                      <p className="text-xs text-gray-500 mt-1">Regular customers</p>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Instant bid approval</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Standard support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Purchase history</span>
                      </li>
                    </ul>
                  </div>

                  {/* Business Account */}
                  <div className={`rounded-xl border-2 p-6 ${
                    getAccountType().type === 'Business Account' 
                      ? 'border-[#FA7921] bg-orange-50/30' 
                      : 'border-gray-200'
                  }`}>
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-900">Business</h4>
                      <p className="text-xs text-gray-500 mt-1">Verified businesses</p>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Instant approval</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Priority support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Business tools</span>
                      </li>
                    </ul>
                  </div>
                </div>
                )}
              </div>
            </div>

            {/* Verification Request */}
            {(getAccountType().type === 'Standard Account' || getAccountType().type === 'Trusted Buyer') && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upgrade Your Account</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Verify your business to unlock instant bid approval, priority support, and exclusive dealer benefits.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => {
                          setTwoFAPurpose('upgrade')
                          setShow2FA(true)
                          setPendingUpgrade(true)
                        }}
                        variant="primary"
                      >
                        Request Verification
                      </Button>
                      <Button variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Statistics */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">Account Statistics</h3>
                <p className="text-xs text-gray-500 mt-0.5">Your platform engagement metrics</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">45</p>
                    <p className="text-sm text-gray-600 mt-1">Vehicles Viewed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">8</p>
                    <p className="text-sm text-gray-600 mt-1">Active Bids</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">23</p>
                    <p className="text-sm text-gray-600 mt-1">Favorite Items</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">15</p>
                    <p className="text-sm text-gray-600 mt-1">Days Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'company':
        return (
          <div className="space-y-8">
            {/* Account Type Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Account Type</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-blue-900">{getAccountType().type}</span>
                    {getAccountType().type === 'Business Account' && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-400 to-indigo-400 text-white text-xs font-bold rounded-full shadow-sm">
                        VERIFIED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{getAccountType().description}</p>
                  
                  {getAccountType().type === 'Standard Account' && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        <strong>Note:</strong> Your bids will require approval from your sales representative before being placed.
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {!companyData.hasCompany && (
                    <p className="text-xs text-gray-500 mb-2">Add business details to upgrade</p>
                  )}
                </div>
              </div>
            </div>

            {/* Company Toggle */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Business Account</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Register as a business to unlock additional features</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={companyData.hasCompany}
                      onChange={(e) => setCompanyData({ ...companyData, hasCompany: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA7921]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA7921]"></div>
                  </label>
                </div>
              </div>
              
              {companyData.hasCompany && (
                <form className="p-6 space-y-6">
                  {/* Company Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyData.companyName}
                        onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        placeholder="Enter company name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyData.companyRegistrationNumber}
                        onChange={(e) => setCompanyData({ ...companyData, companyRegistrationNumber: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        placeholder="Company registration number"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        VAT/Tax Number
                      </label>
                      <input
                        type="text"
                        value={companyData.vatNumber}
                        onChange={(e) => setCompanyData({ ...companyData, vatNumber: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        placeholder="VAT or tax number (optional)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={companyData.businessType}
                        onChange={(e) => setCompanyData({ ...companyData, businessType: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        required
                      >
                        <option value="">Select business type</option>
                        <option value="dealer">Auto Dealer</option>
                        <option value="importer">Vehicle Importer</option>
                        <option value="broker">Auto Broker</option>
                        <option value="rental">Car Rental Company</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Company Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={companyData.companyAddress}
                      onChange={(e) => setCompanyData({ ...companyData, companyAddress: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyData.city}
                        onChange={(e) => setCompanyData({ ...companyData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State/Province <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyData.state}
                        onChange={(e) => setCompanyData({ ...companyData, state: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyData.postalCode}
                        onChange={(e) => setCompanyData({ ...companyData, postalCode: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={companyData.country}
                        onChange={(e) => setCompanyData({ ...companyData, country: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        required
                      >
                        {countries.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Business Activity */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Established
                      </label>
                      <input
                        type="number"
                        value={companyData.yearEstablished}
                        onChange={(e) => setCompanyData({ ...companyData, yearEstablished: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                        placeholder="YYYY"
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Import Frequency
                      </label>
                      <select
                        value={companyData.importFrequency}
                        onChange={(e) => setCompanyData({ ...companyData, importFrequency: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                      >
                        <option value="">Select frequency</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                        <option value="occasional">Occasional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Volume
                      </label>
                      <select
                        value={companyData.averageMonthlyVolume}
                        onChange={(e) => setCompanyData({ ...companyData, averageMonthlyVolume: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                      >
                        <option value="">Select volume</option>
                        <option value="1-5">1-5 vehicles</option>
                        <option value="6-20">6-20 vehicles</option>
                        <option value="21-50">21-50 vehicles</option>
                        <option value="51-100">51-100 vehicles</option>
                        <option value="100+">100+ vehicles</option>
                      </select>
                    </div>
                  </div>

                  {/* Benefits Display */}
                  {companyData.importFrequency && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                      <h4 className="text-sm font-semibold text-green-900 mb-3">Business Account Benefits:</h4>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Instant bid approval - no waiting for staff confirmation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Priority customer support with dedicated account manager</span>
                        </li>
                        {(companyData.importFrequency === 'weekly' || companyData.importFrequency === 'monthly') && (
                          <>
                            <li className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="font-semibold">Business Account - Priority support available</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="font-semibold">Access to exclusive pre-auction listings</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="font-semibold">Extended payment terms (NET 30)</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <Button type="submit" variant="primary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Business Details
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setCompanyData({ ...companyData, hasCompany: false })}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
              
              {!companyData.hasCompany && (
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Register Your Business</h4>
                    <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                      Enable business account to get instant bid approval, priority support, and access to exclusive features.
                    </p>
                    <Button
                      onClick={() => setCompanyData({ ...companyData, hasCompany: true })}
                      variant="primary"
                    >
                      Add Business Details
                    </Button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )

      case 'security':
        return (
          <div className="space-y-8">
            {/* Change Password Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                <p className="text-xs text-gray-500 mt-0.5">Update your password regularly to keep your account secure</p>
              </div>
              <form className="p-6 space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.current ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.new ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.confirm ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Password Requirements:</p>
                  <ul className="space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-100' : 'bg-gray-200'}`}>
                          {req.met && (
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <span className={req.met ? 'text-green-700' : 'text-gray-600'}>{req.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <Button type="submit" variant="primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Update Password
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                    variant="secondary"
                  >
                    Reset Form
                  </Button>
                </div>
              </form>
            </div>

            {/* Two-step Verification */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Two-step Verification</h3>
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 ${twoFAEnabled ? 'bg-green-100' : 'bg-yellow-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <svg className={`w-6 h-6 ${twoFAEnabled ? 'text-green-600' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {twoFAEnabled ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  {twoFAEnabled ? (
                    <>
                      <p className="text-sm text-green-600 font-medium mb-1">Two-factor authentication is enabled</p>
                      <p className="text-sm text-gray-500">
                        Your account is protected with an additional layer of security. You&apos;ll need to enter a verification code when signing in.
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-xs text-gray-500">Methods enabled:</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">SMS</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Authenticator App</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-1">Two factor authentication is not enabled yet.</p>
                      <p className="text-sm text-gray-500">
                        Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
                        <span className="block mt-2 text-amber-600 font-medium">Required for account upgrades from Basic to Business tier.</span>
                      </p>
                    </>
                  )}
                </div>
              </div>
              {!twoFAEnabled ? (
                <Button 
                  onClick={() => {
                    setTwoFAPurpose('setup')
                    setShow2FA(true)
                  }}
                  variant="primary"
                >
                  Enable Two-Factor Authentication
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button variant="secondary" size="sm">
                    Manage Methods
                  </Button>
                  <Button 
                    onClick={() => setTwoFAEnabled(false)}
                    variant="destructive"
                    size="sm"
                  >
                    Disable 2FA
                  </Button>
                </div>
              )}
            </div>

            {/* Recent Devices */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Devices</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-sm font-medium text-gray-700 pb-3">Browser</th>
                      <th className="text-left text-sm font-medium text-gray-700 pb-3">Device</th>
                      <th className="text-left text-sm font-medium text-gray-700 pb-3">Location</th>
                      <th className="text-left text-sm font-medium text-gray-700 pb-3">Recent Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {devices.map((device) => (
                      <tr key={device.id} className="hover:bg-gray-50">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{device.browserIcon}</span>
                            <span className="text-sm text-gray-900">{device.browser}</span>
                            {device.isCurrentDevice && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{device.device}</td>
                        <td className="py-3 text-sm text-gray-600">{device.location}</td>
                        <td className="py-3 text-sm text-gray-600">{device.lastActivity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-8">
            {/* Email Notifications */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Bids</p>
                    <p className="text-xs text-gray-500">Get notified when someone places a bid on your listings</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications.newBids}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: {
                        ...notificationSettings.emailNotifications,
                        newBids: e.target.checked
                      }
                    })}
                    className="w-5 h-5 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Outbid Alerts</p>
                    <p className="text-xs text-gray-500">Get notified when someone outbids you</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications.outbid}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: {
                        ...notificationSettings.emailNotifications,
                        outbid: e.target.checked
                      }
                    })}
                    className="w-5 h-5 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Won Auctions</p>
                    <p className="text-xs text-gray-500">Get notified when you win an auction</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications.wonAuctions}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: {
                        ...notificationSettings.emailNotifications,
                        wonAuctions: e.target.checked
                      }
                    })}
                    className="w-5 h-5 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Newsletters</p>
                    <p className="text-xs text-gray-500">Receive our weekly newsletter with auction highlights</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications.newsletters}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: {
                        ...notificationSettings.emailNotifications,
                        newsletters: e.target.checked
                      }
                    })}
                    className="w-5 h-5 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                </label>
              </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Push Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Enable Push Notifications</p>
                    <p className="text-xs text-gray-500">Receive notifications in your browser</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.pushNotifications.enabled}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      pushNotifications: {
                        ...notificationSettings.pushNotifications,
                        enabled: e.target.checked
                      }
                    })}
                    className="w-5 h-5 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                </label>
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">SMS Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Enable SMS Notifications</p>
                    <p className="text-xs text-gray-500">Receive text messages for important updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.smsNotifications.enabled}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      smsNotifications: {
                        ...notificationSettings.smsNotifications,
                        enabled: e.target.checked
                      }
                    })}
                    className="w-5 h-5 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921]"
                  />
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary">
                Save Preferences
              </Button>
            </div>
          </div>
        )

      case 'billing':
        return (
          <div className="space-y-8">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                <Button variant="primary" size="sm">
                  Add Payment Method
                </Button>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {method.type === 'stripe' ? (
                          <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                          </svg>
                        ) : method.type === 'paypal' ? (
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.074.437-.01.057-.024.117-.035.176l-.035.132c-.03.111-.06.22-.09.33-.077.289-.158.583-.248.882-.087.291-.181.587-.285.885-.105.302-.218.607-.34.914a8.618 8.618 0 0 1-.44.916c-.166.318-.344.637-.533.953-.194.322-.402.644-.62.961-.223.322-.46.64-.71.952-.255.317-.525.628-.808.93a12.44 12.44 0 0 1-.904.9c-.32.282-.654.552-1.004.806a10.67 10.67 0 0 1-1.085.722 9.827 9.827 0 0 1-1.168.598c-.407.177-.83.333-1.267.465-.44.134-.897.242-1.367.323a13.266 13.266 0 0 1-1.437.171c-.495.036-1.003.049-1.52.035-.517-.015-1.043-.056-1.574-.125l-.027 5.358c-.005.37-.323.657-.69.657zm7.49-17.685c-3.102 0-3.874 1.894-4.31 3.854-.436 1.958-.795 5.038 1.471 5.038 3.027 0 4.61-1.548 5.047-3.507.437-1.96-.034-5.386-2.207-5.386z"/>
                          </svg>
                        ) : method.type === 'wise' ? (
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {method.type === 'stripe' ? `Stripe •••• ${method.last4}` : 
                           method.type === 'paypal' ? `PayPal (${method.email})` :
                           method.type === 'wise' ? `Wise (${method.email})` :
                           method.bankName}
                        </p>
                        {method.expiryDate && (
                          <p className="text-xs text-gray-500">Expires {method.expiryDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Default
                        </span>
                      )}
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Addresses - Amazon Style */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">Your Addresses</h3>
                <p className="text-xs text-gray-500 mt-0.5">Manage billing and shipping addresses</p>
              </div>
              
              <div className="p-6">
                {/* Amazon-style Address Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Default Address Card - Amazon Style */}
                  <div className="border-2 border-[#FA7921] rounded-lg overflow-hidden bg-orange-50/30">
                    <div className="bg-[#FA7921] px-4 py-2">
                      <span className="text-sm font-bold text-white">Default Address</span>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="font-semibold text-gray-900 mb-1">John Doe</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        123 Main Street, Suite 400<br/>
                        San Francisco, CA 94105<br/>
                        United States<br/>
                        Phone: +1 (555) 123-4567
                      </p>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex gap-3 text-sm">
                        <Button variant="link" size="sm">
                          Edit
                        </Button>
                        <span className="text-gray-300">|</span>
                        <Button variant="link" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Address Card - Amazon Style */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 bg-white">
                      <p className="font-semibold text-gray-900 mb-1">John Doe</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        456 Business Center, Floor 12<br/>
                        New York, NY 10001<br/>
                        United States<br/>
                        Phone: +1 (555) 987-6543
                      </p>
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex gap-3 text-sm mb-2">
                          <Button variant="link" size="sm">
                            Edit
                          </Button>
                          <span className="text-gray-300">|</span>
                          <Button variant="link" size="sm">
                            Remove
                          </Button>
                          <span className="text-gray-300">|</span>
                          <button className="text-[#FA7921] hover:text-[#FA7921]/80 hover:underline font-medium">
                            Set as Default
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Third Address Card */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 bg-white">
                      <p className="font-semibold text-gray-900 mb-1">John Doe</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        789 Warehouse District<br/>
                        Los Angeles, CA 90001<br/>
                        United States<br/>
                        Phone: +1 (555) 456-7890
                      </p>
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex gap-3 text-sm mb-2">
                          <Button variant="link" size="sm">
                            Edit
                          </Button>
                          <span className="text-gray-300">|</span>
                          <Button variant="link" size="sm">
                            Remove
                          </Button>
                          <span className="text-gray-300">|</span>
                          <button className="text-[#FA7921] hover:text-[#FA7921]/80 hover:underline font-medium">
                            Set as Default
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add New Address Card - Amazon Style */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#FA7921] hover:bg-orange-50/30 transition-all cursor-pointer group">
                    <button 
                      onClick={() => setIsAddressModalOpen(true)}
                      className="w-full h-full min-h-[200px] p-6 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#FA7921]/10 flex items-center justify-center mb-3 transition-colors">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 group-hover:text-[#FA7921] mb-1">Add address</p>
                      <p className="text-xs text-gray-500">Save a new address</p>
                    </button>
                  </div>
                </div>

                {/* Amazon-style notice */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Make sure your address is correct</p>
                      <p className="text-xs">Auction winnings will be shipped to your default address. Please ensure all details are accurate to avoid delivery issues.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FA7921] to-[#FF9A56] rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation with Icons */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8">
        <nav className="flex flex-wrap gap-2" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const getIcon = () => {
              switch(tab.id) {
                case 'account':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                case 'status':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                case 'company':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                case 'security':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                case 'notifications':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                case 'billing':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                default:
                  return null
              }
            }
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {getIcon()}
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">{renderTabContent()}</div>

      {/* 2FA Modal */}
      <TwoFactorAuth
        isOpen={show2FA}
        onClose={() => {
          setShow2FA(false)
          setPendingUpgrade(false)
        }}
        onVerify={handle2FAVerification}
        purpose={twoFAPurpose}
        phoneNumber={profileData.phoneNumber}
        email={profileData.email}
      />
      
      {/* Add Address Modal */}
      <AddAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={() => {
          // New address saved
          // Here you would typically save to backend/state
          setIsAddressModalOpen(false)
        }}
      />
    </div>
  )
}

export default function ProfileSettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileSettingsContent />
    </Suspense>
  )
}