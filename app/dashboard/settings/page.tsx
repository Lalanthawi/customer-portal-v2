'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  
  // Settings states
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Zervtek Auctions',
    timezone: 'Asia/Tokyo',
    dateFormat: 'DD/MM/YYYY',
    currency: 'JPY',
    language: 'English',
    theme: 'light'
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showBidHistory: true,
    allowMessages: true,
    shareStatistics: false,
    marketingEmails: true
  })

  const [auctionSettings, setAuctionSettings] = useState({
    autoBidEnabled: false,
    maxAutoBidAmount: '',
    bidIncrement: '50000',
    instantNotifications: true,
    watchlistLimit: '50',
    defaultBidDuration: '7'
  })

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'auctions', label: 'Auction Preferences' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'advanced', label: 'Advanced' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-8">
            {/* General Settings - Matching Profile Form Design */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                <p className="text-xs text-gray-500 mt-0.5">Configure your basic preferences</p>
              </div>
              <form className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all"
                      placeholder="Enter display name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all appearance-none"
                    >
                      <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                      <option value="America/New_York">America/New York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Format
                    </label>
                    <select
                      value={generalSettings.dateFormat}
                      onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all appearance-none"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={generalSettings.currency}
                      onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all appearance-none"
                    >
                      <option value="JPY">Japanese Yen (¥)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={generalSettings.language}
                    onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all appearance-none"
                  >
                    <option value="English">English</option>
                    <option value="Japanese">日本語</option>
                    <option value="Spanish">Español</option>
                    <option value="French">Français</option>
                    <option value="German">Deutsch</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Theme Preference Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
                <p className="text-xs text-gray-500 mt-0.5">Customize how Zervtek looks for you</p>
              </div>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Theme Preference
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'light', label: 'Light', icon: 'sun', bg: 'bg-white' },
                    { value: 'dark', label: 'Dark', icon: 'moon', bg: 'bg-gray-800' },
                    { value: 'auto', label: 'Auto', icon: 'auto', bg: 'bg-gradient-to-r from-white to-gray-800' }
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => setGeneralSettings({...generalSettings, theme: theme.value})}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        generalSettings.theme === theme.value 
                          ? 'border-[#FA7921] shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`h-20 rounded-lg ${theme.bg} mb-3`}></div>
                      <div className="text-center">
                        <div className="flex justify-center mb-1">
                          {theme.icon === 'sun' ? (
                            <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                          ) : theme.icon === 'moon' ? (
                            <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                          ) : (
                            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm font-medium">{theme.label}</p>
                      </div>
                      {generalSettings.theme === theme.value && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#FA7921] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-8">
            {/* Privacy Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
                <p className="text-xs text-gray-500 mt-0.5">Control your privacy and data sharing</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Profile Visibility</p>
                    <p className="text-xs text-gray-500 mt-0.5">Control who can see your profile</p>
                  </div>
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="registered">Registered Users</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Show Bid History</p>
                    <p className="text-xs text-gray-500 mt-0.5">Allow others to see your bidding history</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.showBidHistory}
                      onChange={(e) => setPrivacySettings({...privacySettings, showBidHistory: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA7921]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA7921]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Allow Direct Messages</p>
                    <p className="text-xs text-gray-500 mt-0.5">Let other users send you messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.allowMessages}
                      onChange={(e) => setPrivacySettings({...privacySettings, allowMessages: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA7921]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA7921]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Marketing Communications</p>
                    <p className="text-xs text-gray-500 mt-0.5">Receive promotional emails and offers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacySettings.marketingEmails}
                      onChange={(e) => setPrivacySettings({...privacySettings, marketingEmails: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA7921]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA7921]"></div>
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="px-6 py-3 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Data Management - Same style as Delete Account in Profile */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Management</h3>
                    <p className="text-sm text-gray-700 mb-4">Download or delete your personal data</p>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 bg-white/70 backdrop-blur rounded-xl hover:bg-white transition-colors flex items-center justify-between group border border-blue-100">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Download Your Data</p>
                            <p className="text-xs text-gray-500">Get a copy of all your information</p>
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'auctions':
        return (
          <div className="space-y-8">
            {/* Auto-Bid Settings */}
            <div className="bg-gradient-to-br from-[#FA7921]/5 via-[#FF9A56]/5 to-yellow-50 rounded-2xl border border-[#FA7921]/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FA7921] to-[#FF9A56] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatic Bidding</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        auctionSettings.autoBidEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-1.5 ${
                          auctionSettings.autoBidEnabled ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        {auctionSettings.autoBidEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Automatically place bids on your behalf up to a maximum amount you set.
                    </p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={auctionSettings.autoBidEnabled}
                        onChange={(e) => setAuctionSettings({...auctionSettings, autoBidEnabled: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA7921]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA7921]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Auction Preferences */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">Auction Preferences</h3>
                <p className="text-xs text-gray-500 mt-0.5">Customize your bidding experience</p>
              </div>
              <form className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Bid Increment
                    </label>
                    <select
                      value={auctionSettings.bidIncrement}
                      onChange={(e) => setAuctionSettings({...auctionSettings, bidIncrement: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all appearance-none"
                    >
                      <option value="10000">¥10,000</option>
                      <option value="25000">¥25,000</option>
                      <option value="50000">¥50,000</option>
                      <option value="100000">¥100,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Watchlist Limit
                    </label>
                    <select
                      value={auctionSettings.watchlistLimit}
                      onChange={(e) => setAuctionSettings({...auctionSettings, watchlistLimit: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FA7921] focus:border-transparent focus:bg-white transition-all appearance-none"
                    >
                      <option value="25">25 items</option>
                      <option value="50">50 items</option>
                      <option value="100">100 items</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Instant Notifications</p>
                    <p className="text-xs text-gray-500 mt-0.5">Get notified immediately when outbid</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={auctionSettings.instantNotifications}
                      onChange={(e) => setAuctionSettings({...auctionSettings, instantNotifications: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA7921]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA7921]"></div>
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#FA7921] to-[#FF9A56] text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )

      case 'integrations':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">API & Integrations</h3>
                <p className="text-xs text-gray-500 mt-0.5">Connect third-party services and manage API access</p>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {[
                    { name: 'Google Analytics', connected: true, icon: 'chart' },
                    { name: 'Stripe Payments', connected: true, icon: 'payment' },
                    { name: 'Email Service', connected: false, icon: 'email' },
                    { name: 'SMS Gateway', connected: false, icon: 'sms' }
                  ].map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg">
                          {service.icon === 'chart' ? (
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          ) : service.icon === 'payment' ? (
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          ) : service.icon === 'email' ? (
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{service.name}</p>
                          <p className="text-xs text-gray-500">
                            {service.connected ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        service.connected
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-[#FA7921] text-white hover:bg-[#FA7921]/90'
                      }`}>
                        {service.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'advanced':
        return (
          <div className="space-y-8">
            {/* Advanced Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
                <p className="text-xs text-gray-500 mt-0.5">Configure advanced system settings</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Developer Mode</p>
                      <p className="text-xs text-gray-500 mt-0.5">Enable developer tools and debug information</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA7921]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA7921]"></div>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Beta Features</p>
                      <p className="text-xs text-gray-500 mt-0.5">Try out new features before they&apos;re released</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA7921]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FA7921]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Export/Import Settings */}
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 rounded-2xl border border-purple-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Backup & Restore</h3>
                    <p className="text-sm text-gray-700 mb-4">Export or import your settings configuration</p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white/70 backdrop-blur border border-purple-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-white transition-colors">
                        Export Settings
                      </button>
                      <button className="px-4 py-2 bg-white/70 backdrop-blur border border-purple-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-white transition-colors">
                        Import Settings
                      </button>
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
      {/* Page Header - Exactly matching Profile Page */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FA7921] to-[#FF9A56] rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500">Manage your application preferences</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Exactly matching Profile Page */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8">
        <nav className="flex flex-wrap gap-2" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const getIcon = () => {
              switch(tab.id) {
                case 'general':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                case 'privacy':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                case 'auctions':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                case 'integrations':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                case 'advanced':
                  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
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
    </div>
  )
}