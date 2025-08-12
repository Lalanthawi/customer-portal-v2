'use client'

import { useState } from 'react'
import Image from 'next/image'

interface InspectionReport {
  id: number
  vehicleId: string
  vehicleName: string
  vehicleImage: string
  inspectionDate: string
  inspector: string
  overallScore: number
  status: 'passed' | 'failed' | 'pending'
  expiryDate: string
  reportUrl?: string
  categories: {
    name: string
    score: number
    issues: string[]
  }[]
}

const inspectionReports: InspectionReport[] = [
  {
    id: 1,
    vehicleId: 'TOY2023CAM',
    vehicleName: '2023 Toyota Camry Hybrid',
    vehicleImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    inspectionDate: '2024-01-15',
    inspector: 'Yamada Taro',
    overallScore: 92,
    status: 'passed',
    expiryDate: '2024-07-15',
    reportUrl: '/reports/inspection-001.pdf',
    categories: [
      { name: 'Engine', score: 95, issues: [] },
      { name: 'Transmission', score: 90, issues: ['Minor fluid leak detected'] },
      { name: 'Brakes', score: 88, issues: ['Front pads 40% worn'] },
      { name: 'Suspension', score: 93, issues: [] },
      { name: 'Electrical', score: 100, issues: [] },
      { name: 'Body', score: 85, issues: ['Minor scratch on rear bumper'] }
    ]
  },
  {
    id: 2,
    vehicleId: 'HON2022CRV',
    vehicleName: '2022 Honda CR-V',
    vehicleImage: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=400&h=300&fit=crop',
    inspectionDate: '2024-01-10',
    inspector: 'Suzuki Kenji',
    overallScore: 88,
    status: 'passed',
    expiryDate: '2024-07-10',
    reportUrl: '/reports/inspection-002.pdf',
    categories: [
      { name: 'Engine', score: 92, issues: [] },
      { name: 'Transmission', score: 95, issues: [] },
      { name: 'Brakes', score: 75, issues: ['Rear pads need replacement soon'] },
      { name: 'Suspension', score: 90, issues: [] },
      { name: 'Electrical', score: 88, issues: ['Battery 2 years old'] },
      { name: 'Body', score: 90, issues: [] }
    ]
  },
  {
    id: 3,
    vehicleId: 'MAZ2021MX5',
    vehicleName: '2021 Mazda MX-5',
    vehicleImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
    inspectionDate: '2024-01-20',
    inspector: 'Tanaka Hiroshi',
    overallScore: 78,
    status: 'failed',
    expiryDate: '2024-01-20',
    reportUrl: '/reports/inspection-003.pdf',
    categories: [
      { name: 'Engine', score: 85, issues: ['Oil leak detected'] },
      { name: 'Transmission', score: 80, issues: ['Clutch wear at 60%'] },
      { name: 'Brakes', score: 65, issues: ['All pads need replacement'] },
      { name: 'Suspension', score: 75, issues: ['Front shocks worn'] },
      { name: 'Electrical', score: 90, issues: [] },
      { name: 'Body', score: 73, issues: ['Multiple paint chips', 'Dent on door'] }
    ]
  },
  {
    id: 4,
    vehicleId: 'NIS2023LEAF',
    vehicleName: '2023 Nissan Leaf',
    vehicleImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    inspectionDate: '2024-01-25',
    inspector: 'Pending Assignment',
    overallScore: 0,
    status: 'pending',
    expiryDate: '-',
    categories: []
  }
]

export default function InspectionsPage() {
  const [selectedReport, setSelectedReport] = useState<InspectionReport | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'passed' | 'failed' | 'pending'>('all')

  const filteredReports = inspectionReports.filter(report => 
    filterStatus === 'all' || report.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-700 border-green-200'
      case 'failed': return 'bg-red-100 text-red-700 border-red-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Vehicle Inspections</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage vehicle inspection reports</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Inspections</p>
              <p className="text-2xl font-bold text-gray-900">{inspectionReports.length}</p>
            </div>
            <div className="w-10 h-10 bg-[#FA7921]/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Passed</p>
              <p className="text-2xl font-bold text-green-600">
                {inspectionReports.filter(r => r.status === 'passed').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Failed</p>
              <p className="text-2xl font-bold text-red-600">
                {inspectionReports.filter(r => r.status === 'failed').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {inspectionReports.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'passed', 'failed', 'pending'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-[#FA7921] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-[#002233] text-white rounded-lg hover:bg-[#003344] transition-all flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Request Inspection
          </button>
        </div>
      </div>

      {/* Inspection Reports List */}
      <div className="space-y-4">
        {filteredReports.map(report => (
          <div
            key={report.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="p-6">
              <div className="flex gap-6">
                {/* Vehicle Image */}
                <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={report.vehicleImage}
                    alt={report.vehicleName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Report Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{report.vehicleName}</h3>
                      <p className="text-sm text-gray-500">ID: {report.vehicleId}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Inspection Date</p>
                      <p className="text-sm font-medium text-gray-900">{report.inspectionDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Inspector</p>
                      <p className="text-sm font-medium text-gray-900">{report.inspector}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Overall Score</p>
                      <p className={`text-xl font-bold ${getScoreColor(report.overallScore)}`}>
                        {report.status === 'pending' ? '-' : `${report.overallScore}%`}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Valid Until</p>
                      <p className="text-sm font-medium text-gray-900">{report.expiryDate}</p>
                    </div>
                  </div>

                  {/* Category Scores */}
                  {report.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {report.categories.map(category => (
                        <div key={category.name} className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">
                          <span className="text-xs text-gray-600">{category.name}:</span>
                          <span className={`text-xs font-bold ${getScoreColor(category.score)}`}>
                            {category.score}%
                          </span>
                          {category.issues.length > 0 && (
                            <span className="w-5 h-5 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs">
                              !
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {report.status !== 'pending' && (
                      <>
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-all text-sm font-medium"
                        >
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium">
                          Download Report
                        </button>
                      </>
                    )}
                    {report.status === 'pending' && (
                      <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-all text-sm font-medium">
                        Check Status
                      </button>
                    )}
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">
                      Contact Inspector
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Inspection Report Details</h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{selectedReport.vehicleName}</h3>
                <p className="text-sm text-gray-500">Report ID: INS-{selectedReport.id.toString().padStart(6, '0')}</p>
              </div>

              {/* Category Details */}
              <div className="space-y-4">
                {selectedReport.categories.map(category => (
                  <div key={category.name} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              category.score >= 90 ? 'bg-green-500' :
                              category.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${category.score}%` }}
                          />
                        </div>
                        <span className={`font-bold ${getScoreColor(category.score)}`}>
                          {category.score}%
                        </span>
                      </div>
                    </div>
                    {category.issues.length > 0 && (
                      <div className="space-y-1">
                        {category.issues.map((issue, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-sm text-gray-600">{issue}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-all font-medium">
                  Download Full Report
                </button>
                <button className="flex-1 px-4 py-2 bg-[#002233] text-white rounded-lg hover:bg-[#003344] transition-all font-medium">
                  Request Re-inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}