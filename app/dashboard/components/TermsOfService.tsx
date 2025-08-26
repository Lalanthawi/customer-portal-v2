'use client'

import { useState, useEffect } from 'react'

interface TermsOfServiceModalProps {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
}

export function TermsOfServiceModal({ isOpen, onAccept, onDecline }: TermsOfServiceModalProps) {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10
    if (isAtBottom) {
      setHasScrolled(true)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
          <p className="text-sm text-gray-600 mt-1">Please read and accept our terms to continue</p>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto px-6 py-4"
          onScroll={handleScroll}
        >
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mt-4">1. Introduction</h3>
            <p className="text-gray-700">
              Welcome to ZervTek Auto Auction Platform. By accessing and using our services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). 
              Please read these Terms carefully before using our platform.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">2. Auction Participation</h3>
            <p className="text-gray-700">
              <strong>2.1 Registration Requirements:</strong> To participate in auctions, you must:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Be at least 18 years old or the legal age in your jurisdiction</li>
              <li>Provide accurate and complete registration information</li>
              <li>Be verified by our sales team before placing bids</li>
              <li>Maintain the security of your account credentials</li>
            </ul>

            <p className="text-gray-700 mt-4">
              <strong>2.2 Bidding Rules:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>All bids are binding legal offers to purchase</li>
              <li>Bids cannot be retracted except with staff approval</li>
              <li>Winning bidders must complete payment within 48 hours</li>
              <li>Auction times are in Japan Standard Time (JST)</li>
              <li>Auctions typically last 1-3 minutes from start time</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">3. Vehicle Information</h3>
            <p className="text-gray-700">
              <strong>3.1 Condition Reports:</strong> While we strive to provide accurate information:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Vehicle conditions are based on auction house inspections</li>
              <li>USS auction photos may have restricted access</li>
              <li>Additional inspection services are available for ¥3,000</li>
              <li>Inspection requests must be made before 11:00 AM JST</li>
            </ul>

            <p className="text-gray-700 mt-4">
              <strong>3.2 No Warranty:</strong> All vehicles are sold &quot;AS IS&quot; without warranty. Buyers are responsible for 
              conducting their own due diligence before bidding.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">4. Payment Terms</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Payment must be completed within 48 hours of winning an auction</li>
              <li>Accepted payment methods: Bank Transfer, Stripe, PayPal, Wise</li>
              <li>A 3% auction fee is added to the winning bid amount</li>
              <li>All payments are processed in Japanese Yen (JPY)</li>
              <li>Shipping insurance is included in the shipping fee</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">5. Shipping and Export</h3>
            <p className="text-gray-700">
              <strong>5.1 Shipping Process:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Inland transport from auction house to port</li>
              <li>Export inspection and documentation</li>
              <li>Ocean freight to destination port</li>
              <li>Estimated shipping times vary by destination</li>
            </ul>

            <p className="text-gray-700 mt-4">
              <strong>5.2 Documentation:</strong> We provide all necessary export documentation including:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Export Certificate</li>
              <li>Bill of Lading</li>
              <li>Deregistration Certificate</li>
              <li>Translation services (if required)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">6. Account Types</h3>
            <p className="text-gray-700">
              Different account types have different privileges:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Standard Account:</strong> Bids require sales approval</li>
              <li><strong>Trusted Buyer:</strong> Instant bid approval for regular customers</li>
              <li><strong>Business Account:</strong> For registered businesses with streamlined bidding</li>
              <li><strong>Premier Dealer:</strong> Volume discounts and priority support</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">7. Prohibited Activities</h3>
            <p className="text-gray-700">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Provide false or misleading information</li>
              <li>Manipulate or interfere with auctions</li>
              <li>Use the platform for illegal activities</li>
              <li>Share account credentials with others</li>
              <li>Attempt to circumvent platform fees</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">8. Limitation of Liability</h3>
            <p className="text-gray-700">
              ZervTek acts as an intermediary platform and is not responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Vehicle condition discrepancies</li>
              <li>Shipping delays beyond our control</li>
              <li>Import regulations in destination countries</li>
              <li>Currency exchange rate fluctuations</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">9. Dispute Resolution</h3>
            <p className="text-gray-700">
              Any disputes arising from these Terms or use of our services shall be resolved through arbitration in accordance with Japanese law.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">10. Changes to Terms</h3>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the modified Terms.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6">11. Contact Information</h3>
            <p className="text-gray-700">
              For questions about these Terms, please contact:
            </p>
            <ul className="list-none pl-0 text-gray-700">
              <li>Email: legal@zervtek.com</li>
              <li>Phone: +81 80-1234-5678</li>
              <li>WhatsApp: +81 80-1234-5678</li>
            </ul>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          {/* Scroll reminder */}
          {!hasScrolled && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                Please scroll to the bottom to read all terms before accepting
              </p>
            </div>
          )}

          {/* Checkbox */}
          <label className="flex items-start gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              disabled={!hasScrolled}
              className="w-5 h-5 mt-0.5 text-[#FA7921] border-gray-300 rounded focus:ring-[#FA7921] disabled:opacity-50"
            />
            <span className={`text-sm ${!hasScrolled ? 'text-gray-400' : 'text-gray-700'}`}>
              I have read, understood, and agree to be bound by these Terms of Service. 
              I understand that all bids are binding and that I must complete payment within 48 hours if I win an auction.
            </span>
          </label>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Decline & Exit
            </button>
            <button
              onClick={onAccept}
              disabled={!hasScrolled || !isChecked}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                hasScrolled && isChecked
                  ? 'bg-[#FA7921] text-white hover:bg-[#FA7921]/90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook to check and manage TOS acceptance
export function useTOSAcceptance() {
  const [hasAcceptedTOS, setHasAcceptedTOS] = useState<boolean | null>(null)

  useEffect(() => {
    // Check localStorage for TOS acceptance
    const acceptance = localStorage.getItem('tos_accepted')
    const acceptanceDate = localStorage.getItem('tos_accepted_date')
    
    // Check if TOS was accepted and not too old (e.g., within last year)
    if (acceptance === 'true' && acceptanceDate) {
      const acceptedDate = new Date(acceptanceDate)
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      
      if (acceptedDate > oneYearAgo) {
        setHasAcceptedTOS(true)
      } else {
        // TOS acceptance expired, need to re-accept
        setHasAcceptedTOS(false)
      }
    } else {
      setHasAcceptedTOS(false)
    }
  }, [])

  const acceptTOS = () => {
    localStorage.setItem('tos_accepted', 'true')
    localStorage.setItem('tos_accepted_date', new Date().toISOString())
    setHasAcceptedTOS(true)
  }

  const resetTOS = () => {
    localStorage.removeItem('tos_accepted')
    localStorage.removeItem('tos_accepted_date')
    setHasAcceptedTOS(false)
  }

  return { hasAcceptedTOS, acceptTOS, resetTOS }
}