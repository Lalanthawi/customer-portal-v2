'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CookiesPage() {
  const [activeSection, setActiveSection] = useState('what')
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
  })

  const sections = [
    { id: 'what', title: 'What Are Cookies' },
    { id: 'types', title: 'Types of Cookies' },
    { id: 'usage', title: 'How We Use Cookies' },
    { id: 'third', title: 'Third-Party Cookies' },
    { id: 'manage', title: 'Manage Cookies' },
  ]

  const cookieTypes = [
    {
      name: 'Necessary Cookies',
      key: 'necessary',
      description: 'Essential for the website to function properly. Cannot be disabled.',
      examples: ['Session management', 'Security tokens', 'Load balancing'],
      required: true,
    },
    {
      name: 'Functional Cookies',
      key: 'functional',
      description: 'Remember your preferences and enhance functionality.',
      examples: ['Language preferences', 'Currency settings', 'Recently viewed vehicles'],
      required: false,
    },
    {
      name: 'Analytics Cookies',
      key: 'analytics',
      description: 'Help us understand how visitors use our website.',
      examples: ['Page views', 'User journey tracking', 'Performance monitoring'],
      required: false,
    },
    {
      name: 'Marketing Cookies',
      key: 'marketing',
      description: 'Used to deliver relevant advertisements.',
      examples: ['Ad targeting', 'Campaign effectiveness', 'Retargeting'],
      required: false,
    },
  ]

  const handlePreferenceChange = (key: string, value: boolean) => {
    if (key !== 'necessary') {
      setCookiePreferences(prev => ({ ...prev, [key]: value }))
    }
  }

  const savePreferences = () => {
    // In production, this would save to backend/cookies
    alert('Cookie preferences saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cookie Policy</h1>
              <p className="text-sm text-gray-600 mt-1">Last updated: January 1, 2024</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Cookie Topics</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      activeSection === section.id
                        ? 'bg-[#FA7921] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>

              {/* Cookie Status */}
              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-2">Current Status</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Necessary</span>
                      <span className="text-green-600 font-medium">✓ On</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Functional</span>
                      <span className={cookiePreferences.functional ? "text-green-600" : "text-gray-500"}>
                        {cookiePreferences.functional ? '✓ On' : '✗ Off'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Analytics</span>
                      <span className={cookiePreferences.analytics ? "text-green-600" : "text-gray-500"}>
                        {cookiePreferences.analytics ? '✓ On' : '✗ Off'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Marketing</span>
                      <span className={cookiePreferences.marketing ? "text-green-600" : "text-gray-500"}>
                        {cookiePreferences.marketing ? '✓ On' : '✗ Off'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {/* Mobile Section Selector */}
              <div className="lg:hidden mb-6">
                <select
                  value={activeSection}
                  onChange={(e) => setActiveSection(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                >
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content Sections */}
              {activeSection === 'what' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      Cookies are small text files that websites place on your device to remember information about you 
                      and your preferences. They help us provide you with a better, faster, and safer experience.
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How Cookies Work</h3>
                  <p className="text-gray-600 mb-4">
                    When you visit our website, we may place cookies on your browser or read cookies that are already there. 
                    Cookies allow us to recognize you when you return and remember your preferences.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Why We Use Cookies</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Keep you signed in to your account</li>
                    <li>Remember your preferences and settings</li>
                    <li>Improve website performance and speed</li>
                    <li>Understand how you use our platform</li>
                    <li>Provide relevant content and features</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Cookie Lifespan</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Session Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Temporary cookies that are deleted when you close your browser. Used for maintaining your session.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Persistent Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Remain on your device for a set period. Used to remember your preferences across visits.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'types' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>

                  <div className="space-y-6">
                    {cookieTypes.map((type) => (
                      <div key={type.key} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                            {type.required && (
                              <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                Always Active
                              </span>
                            )}
                          </div>
                          <div className="flex items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={cookiePreferences[type.key as keyof typeof cookiePreferences]}
                                onChange={(e) => handlePreferenceChange(type.key, e.target.checked)}
                                disabled={type.required}
                                className="sr-only peer"
                              />
                              <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FA7921]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${type.required ? 'peer-checked:bg-gray-400' : 'peer-checked:bg-[#FA7921]'}`}></div>
                            </label>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{type.description}</p>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Examples:</p>
                          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                            {type.examples.map((example, idx) => (
                              <li key={idx}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={savePreferences}
                      className="px-6 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors"
                    >
                      Save Cookie Preferences
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'usage' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Authentication & Security</h3>
                  <p className="text-gray-600 mb-4">
                    We use cookies to verify your account and determine when you're logged in. This allows us to keep your 
                    account secure and provide you with access to your personalized dashboard.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Preferences & Settings</h3>
                  <p className="text-gray-600 mb-4">
                    Cookies remember your preferences such as language, currency, and display settings, so you don't have to 
                    set them every time you visit.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Analytics & Performance</h3>
                  <p className="text-gray-600 mb-4">
                    We use analytics cookies to understand how you interact with our platform. This helps us identify issues, 
                    improve features, and enhance your experience.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Data We Collect Through Cookies:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                      <li>Pages visited and features used</li>
                      <li>Time spent on different sections</li>
                      <li>Click patterns and navigation paths</li>
                      <li>Error messages encountered</li>
                      <li>Browser and device information</li>
                      <li>Referring websites</li>
                    </ul>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Marketing & Advertising</h3>
                  <p className="text-gray-600 mb-4">
                    With your consent, we use marketing cookies to show you relevant advertisements and measure the effectiveness 
                    of our marketing campaigns.
                  </p>
                </div>
              )}

              {activeSection === 'third' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>

                  <p className="text-gray-600 mb-6">
                    Some cookies on our website are placed by third-party services that appear on our pages. We do not control 
                    these cookies, and you should refer to the third party's privacy policy for more information.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Third-Party Services We Use</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Google Analytics</h4>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Analytics</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Helps us understand how visitors use our website and improve user experience.
                      </p>
                      <a href="https://policies.google.com/privacy" className="text-sm text-[#FA7921] hover:underline">
                        Privacy Policy →
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Stripe</h4>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Payment</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Processes payments securely and prevents fraud.
                      </p>
                      <a href="https://stripe.com/privacy" className="text-sm text-[#FA7921] hover:underline">
                        Privacy Policy →
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Cloudflare</h4>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Security</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Provides security and performance optimization for our website.
                      </p>
                      <a href="https://www.cloudflare.com/privacypolicy/" className="text-sm text-[#FA7921] hover:underline">
                        Privacy Policy →
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Intercom</h4>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Support</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Provides customer support chat functionality.
                      </p>
                      <a href="https://www.intercom.com/legal/privacy" className="text-sm text-[#FA7921] hover:underline">
                        Privacy Policy →
                      </a>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Blocking third-party cookies may affect the functionality of certain features 
                      on our website, such as payment processing and customer support chat.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'manage' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Manage Cookies</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Browser Settings</h3>
                  <p className="text-gray-600 mb-4">
                    Most web browsers allow you to control cookies through their settings. You can set your browser to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Notify you when cookies are being set</li>
                    <li>Block all cookies</li>
                    <li>Block third-party cookies only</li>
                    <li>Delete cookies when you close your browser</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Browser-Specific Instructions</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <a href="https://support.google.com/chrome/answer/95647" className="block p-4 border border-gray-200 rounded-lg hover:border-[#FA7921] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">🌐</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Chrome</p>
                          <p className="text-sm text-gray-600">Manage cookies in Chrome</p>
                        </div>
                      </div>
                    </a>

                    <a href="https://support.mozilla.org/en-US/kb/cookies" className="block p-4 border border-gray-200 rounded-lg hover:border-[#FA7921] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">🦊</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Firefox</p>
                          <p className="text-sm text-gray-600">Manage cookies in Firefox</p>
                        </div>
                      </div>
                    </a>

                    <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="block p-4 border border-gray-200 rounded-lg hover:border-[#FA7921] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">🧭</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Safari</p>
                          <p className="text-sm text-gray-600">Manage cookies in Safari</p>
                        </div>
                      </div>
                    </a>

                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="block p-4 border border-gray-200 rounded-lg hover:border-[#FA7921] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">🌊</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Edge</p>
                          <p className="text-sm text-gray-600">Manage cookies in Edge</p>
                        </div>
                      </div>
                    </a>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Opt-Out Options</h3>
                  <p className="text-gray-600 mb-4">
                    You can opt out of specific cookie categories using the preferences panel above. You can also use these 
                    industry opt-out tools:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>
                      <a href="https://optout.networkadvertising.org/" className="text-[#FA7921] hover:underline">
                        Network Advertising Initiative Opt-Out
                      </a>
                    </li>
                    <li>
                      <a href="https://optout.aboutads.info/" className="text-[#FA7921] hover:underline">
                        Digital Advertising Alliance Opt-Out
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youronlinechoices.com/" className="text-[#FA7921] hover:underline">
                        European Interactive Digital Advertising Alliance
                      </a>
                    </li>
                  </ul>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800">
                      <strong>Warning:</strong> Disabling cookies may affect your ability to use certain features of our 
                      website, including signing in to your account and completing transactions.
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Questions about cookies?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have any questions about our use of cookies, please contact our privacy team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="mailto:privacy@zervtek.com"
                      className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-center"
                    >
                      Email Privacy Team
                    </a>
                    <Link
                      href="/dashboard/privacy"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
                    >
                      View Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}