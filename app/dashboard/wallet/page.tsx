'use client'

import { useState } from 'react'
import Link from 'next/link'

type Transaction = {
  id: string
  type: 'deposit' | 'withdrawal' | 'purchase' | 'refund'
  amount: number
  description: string
  date: Date
  status: 'completed' | 'pending' | 'failed'
  reference: string
}

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'balance' | 'history'>('balance')
  
  // Mock wallet data
  const balance = 2500000
  const pendingBalance = 500000
  const availableBalance = balance - pendingBalance
  
  // Mock transaction history
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      amount: 1000000,
      description: 'Bank Transfer Deposit',
      date: new Date('2024-01-08'),
      status: 'completed',
      reference: 'TXN-2024-001'
    },
    {
      id: '2',
      type: 'purchase',
      amount: -750000,
      description: 'Vehicle Purchase - Toyota Camry',
      date: new Date('2024-01-07'),
      status: 'completed',
      reference: 'VEH-2024-089'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 2000000,
      description: 'Credit Card Deposit',
      date: new Date('2024-01-06'),
      status: 'completed',
      reference: 'TXN-2024-002'
    },
    {
      id: '4',
      type: 'refund',
      amount: 250000,
      description: 'Auction Refund - Cancelled Bid',
      date: new Date('2024-01-05'),
      status: 'completed',
      reference: 'REF-2024-015'
    },
    {
      id: '5',
      type: 'purchase',
      amount: -1500000,
      description: 'Vehicle Purchase - Honda Accord',
      date: new Date('2024-01-04'),
      status: 'completed',
      reference: 'VEH-2024-087'
    },
    {
      id: '6',
      type: 'withdrawal',
      amount: -500000,
      description: 'Bank Transfer Withdrawal',
      date: new Date('2024-01-03'),
      status: 'pending',
      reference: 'WTH-2024-003'
    },
    {
      id: '7',
      type: 'deposit',
      amount: 3000000,
      description: 'Wire Transfer Deposit',
      date: new Date('2024-01-02'),
      status: 'completed',
      reference: 'TXN-2024-003'
    }
  ]
  
  // Format currency
  const formatJPY = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    }).format(value)
  }
  
  // Get transaction icon
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        )
      case 'withdrawal':
        return (
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </div>
        )
      case 'purchase':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        )
      case 'refund':
        return (
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </div>
        )
    }
  }
  
  // Get status badge
  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Completed
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
            Pending
          </span>
        )
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            Failed
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your funds and transactions</p>
            </div>
            <Link
              href="/dashboard/deposit"
              className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Deposit Funds
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Balance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Balance</h3>
              <div className="w-10 h-10 bg-[#FA7921]/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatJPY(balance)}</p>
            <p className="text-xs text-gray-500 mt-2">Updated just now</p>
          </div>

          {/* Available Balance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Available Balance</h3>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatJPY(availableBalance)}</p>
            <p className="text-xs text-gray-500 mt-2">Ready to use</p>
          </div>

          {/* Pending Balance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Pending Balance</h3>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatJPY(pendingBalance)}</p>
            <p className="text-xs text-gray-500 mt-2">Processing</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('balance')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'balance'
                    ? 'text-[#FA7921] border-[#FA7921]'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                Balance Overview
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'text-[#FA7921] border-[#FA7921]'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                Transaction History
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'balance' && (
              <div>
                {/* Quick Actions */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Link
                    href="/dashboard/deposit"
                    className="p-4 border border-gray-200 rounded-lg hover:border-[#FA7921] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Add Funds</p>
                        <p className="text-xs text-gray-500">Deposit money</p>
                      </div>
                    </div>
                  </Link>


                  <button className="p-4 border border-gray-200 rounded-lg hover:border-[#FA7921] transition-colors group text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Statement</p>
                        <p className="text-xs text-gray-500">Download report</p>
                      </div>
                    </div>
                  </button>

                  <button className="p-4 border border-gray-200 rounded-lg hover:border-[#FA7921] transition-colors group text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Settings</p>
                        <p className="text-xs text-gray-500">Manage wallet</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Recent Transactions Summary */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">
                            {transaction.date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{formatJPY(Math.abs(transaction.amount))}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setActiveTab('history')}
                  className="mt-4 text-sm text-[#FA7921] hover:text-[#FA7921]/80 font-medium"
                >
                  View all transactions →
                </button>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent">
                    <option value="">All Types</option>
                    <option value="deposit">Deposits</option>
                    <option value="withdrawal">Withdrawals</option>
                    <option value="purchase">Purchases</option>
                    <option value="refund">Refunds</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent">
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <input
                    type="date"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                    placeholder="From date"
                  />
                  <input
                    type="date"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                    placeholder="To date"
                  />
                </div>

                {/* Transaction List */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {getTransactionIcon(transaction.type)}
                              <div>
                                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                                <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-600">
                              {transaction.date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-xs text-gray-500">
                              {transaction.date.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm font-mono text-gray-600">{transaction.reference}</p>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(transaction.status)}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <p className={`text-sm font-semibold ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}{formatJPY(Math.abs(transaction.amount))}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-600">
                    Showing 1 to {transactions.length} of {transactions.length} results
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-[#FA7921] text-white rounded-lg text-sm">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 py-6 border-t border-gray-200">
          <div className="flex justify-center gap-6">
            <Link href="/dashboard/terms" className="text-sm text-gray-600 hover:text-[#FA7921] transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/dashboard/privacy" className="text-sm text-gray-600 hover:text-[#FA7921] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/dashboard/cookies" className="text-sm text-gray-600 hover:text-[#FA7921] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}