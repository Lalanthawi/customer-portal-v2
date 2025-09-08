'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('collection')

  const sections = [
    { id: 'collection', title: 'Data Collection' },
    { id: 'usage', title: 'How We Use Data' },
    { id: 'sharing', title: 'Data Sharing' },
    { id: 'security', title: 'Data Security' },
    { id: 'rights', title: 'Your Rights' },
    { id: 'contact', title: 'Contact Us' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
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
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Privacy Topics</h3>
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

              {/* GDPR Badge */}
              <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">GDPR Compliant</span>
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

              {/* Introduction */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    At Zervtek, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, and safeguard your data.
                  </p>
                </div>
              </div>

              {/* Content Sections */}
              {activeSection === 'collection' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
                  <p className="text-gray-600 mb-4">
                    When you create an account or use our services, we collect:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Name and contact information (email, phone number, address)</li>
                    <li>Business information (company name, registration number)</li>
                    <li>Financial information (payment methods, transaction history)</li>
                    <li>Government-issued ID for verification purposes</li>
                    <li>Communication preferences</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
                  <p className="text-gray-600 mb-4">
                    When you use our platform, we automatically collect:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>IP address and device information</li>
                    <li>Browser type and operating system</li>
                    <li>Pages visited and features used</li>
                    <li>Time spent on the platform</li>
                    <li>Referring websites</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Cookies and Tracking</h3>
                  <p className="text-gray-600 mb-4">
                    We use cookies and similar technologies to enhance your experience. See our 
                    <Link href="/dashboard/cookies" className="text-[#FA7921] hover:underline mx-1">Cookie Policy</Link>
                    for more details.
                  </p>
                </div>
              )}

              {activeSection === 'usage' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Service Provision</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Process your vehicle purchases and bids</li>
                    <li>Manage your account and provide customer support</li>
                    <li>Facilitate shipping and delivery</li>
                    <li>Process payments and prevent fraud</li>
                    <li>Send transaction confirmations and updates</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Communication</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Send important service announcements</li>
                    <li>Notify you about auction results</li>
                    <li>Provide shipping and delivery updates</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Respond to your inquiries</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Improvement and Analysis</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Analyze platform usage to improve our services</li>
                    <li>Develop new features and functionalities</li>
                    <li>Conduct market research</li>
                    <li>Ensure platform security and prevent abuse</li>
                  </ul>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> We never sell your personal information to third parties for marketing purposes.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'sharing' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Service Providers</h3>
                  <p className="text-gray-600 mb-4">
                    We share information with trusted service providers who help us operate our platform:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Payment processors (Stripe, PayPal)</li>
                    <li>Shipping and logistics companies</li>
                    <li>Cloud storage providers</li>
                    <li>Email service providers</li>
                    <li>Analytics services</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Legal Requirements</h3>
                  <p className="text-gray-600 mb-4">
                    We may disclose your information when required by law or to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Comply with legal obligations</li>
                    <li>Respond to government requests</li>
                    <li>Enforce our terms and policies</li>
                    <li>Protect our rights and safety</li>
                    <li>Prevent fraud or illegal activities</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Business Transfers</h3>
                  <p className="text-gray-600 mb-4">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred to the 
                    acquiring entity. We will notify you of any such change.
                  </p>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Security Measures</h3>
                  <p className="text-gray-600 mb-4">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Encrypted storage of sensitive information</li>
                    <li>Regular security audits and assessments</li>
                    <li>Access controls and authentication</li>
                    <li>Employee training on data protection</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Data Retention</h3>
                  <p className="text-gray-600 mb-4">
                    We retain your information for as long as necessary to provide our services and comply with legal obligations. 
                    Account data is retained for 7 years after account closure for legal and tax purposes.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Data Breach Protocol</h3>
                  <p className="text-gray-600 mb-4">
                    In the unlikely event of a data breach, we will notify affected users within 72 hours and take immediate 
                    steps to secure the platform and mitigate any potential harm.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-green-800">Bank-Level Security</p>
                        <p className="text-sm text-green-700 mt-1">
                          Your data is protected with 256-bit encryption, the same standard used by major financial institutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'rights' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Access and Control</h3>
                  <p className="text-gray-600 mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Delete your account and data</li>
                    <li>Export your data in a portable format</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Restrict processing of your data</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How to Exercise Your Rights</h3>
                  <p className="text-gray-600 mb-4">
                    You can manage most of your privacy settings directly in your account dashboard. For other requests, 
                    contact our privacy team at privacy@zervtek.com.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Children's Privacy</h3>
                  <p className="text-gray-600 mb-4">
                    Our services are not intended for users under 18 years of age. We do not knowingly collect information 
                    from children.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">International Users</h3>
                  <p className="text-gray-600 mb-4">
                    If you are accessing our services from outside Japan, please note that your data may be transferred to 
                    and processed in Japan. By using our services, you consent to this transfer.
                  </p>
                </div>
              )}

              {activeSection === 'contact' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Team</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">privacy@zervtek.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-700">+81 3-1234-5678</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="text-gray-700">
                          <p>Zervtek Privacy Office</p>
                          <p>123 Business District</p>
                          <p>Minato-ku, Tokyo 106-0032</p>
                          <p>Japan</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Response Time</h3>
                  <p className="text-gray-600 mb-4">
                    We aim to respond to all privacy-related inquiries within 48 hours. For complex requests, we may need 
                    up to 30 days to fully address your concerns.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Complaints</h3>
                  <p className="text-gray-600 mb-4">
                    If you have concerns about how we handle your data, you have the right to lodge a complaint with your 
                    local data protection authority.
                  </p>
                </div>
              )}

              {/* Footer Actions */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/dashboard/settings/privacy"
                    className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-center"
                  >
                    Manage Privacy Settings
                  </Link>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}