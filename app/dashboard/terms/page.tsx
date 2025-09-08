'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('general')

  const sections = [
    { id: 'general', title: 'General Terms' },
    { id: 'account', title: 'Account Terms' },
    { id: 'payment', title: 'Payment Terms' },
    { id: 'shipping', title: 'Shipping & Delivery' },
    { id: 'liability', title: 'Liability' },
    { id: 'disputes', title: 'Disputes' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
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
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Table of Contents</h3>
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
              {activeSection === 'general' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">General Terms</h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      By using Zervtek's services, you agree to these terms. Please read them carefully.
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1.1 Acceptance of Terms</h3>
                  <p className="text-gray-600 mb-4">
                    By accessing and using Zervtek's online vehicle auction platform, you acknowledge that you have read, 
                    understood, and agree to be bound by these Terms of Service and all applicable laws and regulations.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1.2 Service Description</h3>
                  <p className="text-gray-600 mb-4">
                    Zervtek provides an online platform for purchasing vehicles through auctions, direct sales, and export services. 
                    We facilitate transactions between buyers and sellers but are not responsible for the condition or quality of vehicles.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1.3 Eligibility</h3>
                  <p className="text-gray-600 mb-4">
                    You must be at least 18 years old and have the legal capacity to enter into contracts to use our services. 
                    Business accounts must provide valid business registration documents.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1.4 Modifications to Terms</h3>
                  <p className="text-gray-600 mb-4">
                    We reserve the right to modify these terms at any time. We will notify users of significant changes via email 
                    or through the platform. Continued use after modifications constitutes acceptance of the new terms.
                  </p>
                </div>
              )}

              {activeSection === 'account' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Terms</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2.1 Account Registration</h3>
                  <p className="text-gray-600 mb-4">
                    To access certain features, you must create an account. You agree to provide accurate, current, and complete 
                    information during registration and to update such information to keep it accurate.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2.2 Account Security</h3>
                  <p className="text-gray-600 mb-4">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities 
                    that occur under your account. Notify us immediately of any unauthorized use.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2.3 Account Suspension</h3>
                  <p className="text-gray-600 mb-4">
                    We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, 
                    or pose a risk to other users or our platform.
                  </p>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> Multiple failed payment attempts or chargebacks may result in account suspension.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'payment' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3.1 Payment Methods</h3>
                  <p className="text-gray-600 mb-4">
                    We accept various payment methods including credit cards, bank transfers, and approved digital payment platforms. 
                    All payments must be made in Japanese Yen (JPY) unless otherwise specified.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3.2 Auction Deposits</h3>
                  <p className="text-gray-600 mb-4">
                    Participation in certain auctions may require a refundable deposit. Deposits are returned within 7 business days 
                    if you do not win the auction, minus any applicable fees.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3.3 Payment Timeline</h3>
                  <p className="text-gray-600 mb-4">
                    Full payment for won auctions must be received within 48 hours of auction end. Failure to pay may result in 
                    forfeiture of deposit and account suspension.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3.4 Fees and Charges</h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Auction commission: 5% of winning bid</li>
                    <li>Document processing: ¥15,000 per vehicle</li>
                    <li>Inspection services: ¥3,000 - ¥10,000 depending on scope</li>
                    <li>Translation services: ¥1,500 per document</li>
                  </ul>
                </div>
              )}

              {activeSection === 'shipping' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping & Delivery</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4.1 Shipping Arrangements</h3>
                  <p className="text-gray-600 mb-4">
                    We coordinate shipping through verified partners. Shipping times vary based on destination and vessel availability. 
                    Estimated delivery dates are not guaranteed.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4.2 Risk of Loss</h3>
                  <p className="text-gray-600 mb-4">
                    Risk of loss transfers to the buyer once the vehicle is loaded onto the shipping vessel. We strongly recommend 
                    purchasing marine insurance for international shipments.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4.3 Customs and Import</h3>
                  <p className="text-gray-600 mb-4">
                    Buyers are responsible for all customs duties, taxes, and import regulations in their country. We provide 
                    necessary export documentation but cannot guarantee customs clearance.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-green-800">
                      <strong>Tip:</strong> Check your country's import regulations before bidding to avoid complications.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'liability' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Liability</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5.1 Limited Liability</h3>
                  <p className="text-gray-600 mb-4">
                    Zervtek's liability is limited to the amount of fees paid by you for the specific transaction. We are not liable 
                    for indirect, incidental, or consequential damages.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5.2 Vehicle Condition</h3>
                  <p className="text-gray-600 mb-4">
                    Vehicles are sold "as is" based on auction house inspections. While we provide inspection reports when available, 
                    buyers acknowledge that used vehicles may have defects not noted in reports.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5.3 Third-Party Services</h3>
                  <p className="text-gray-600 mb-4">
                    We are not responsible for services provided by third parties including shipping companies, inspection services, 
                    or financial institutions.
                  </p>
                </div>
              )}

              {activeSection === 'disputes' && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Disputes</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">6.1 Dispute Resolution</h3>
                  <p className="text-gray-600 mb-4">
                    Any disputes should first be reported to our customer service team. We will attempt to mediate and resolve 
                    disputes within 30 days.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">6.2 Arbitration</h3>
                  <p className="text-gray-600 mb-4">
                    If disputes cannot be resolved through mediation, they shall be settled through binding arbitration in accordance 
                    with Japanese Commercial Arbitration Association rules.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">6.3 Governing Law</h3>
                  <p className="text-gray-600 mb-4">
                    These terms are governed by the laws of Japan. Any legal action must be brought in the courts of Tokyo, Japan.
                  </p>
                </div>
              )}

              {/* Contact Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Questions about our terms?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have any questions about these Terms of Service, please contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/dashboard/support"
                      className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors text-center"
                    >
                      Contact Support
                    </Link>
                    <a
                      href="mailto:legal@zervtek.com"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
                    >
                      Email Legal Team
                    </a>
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