'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

// Types
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

interface TranslationDocument {
  id: number
  documentName: string
  documentType: string
  sourceLanguage: string
  targetLanguage: string
  status: 'completed' | 'in-progress' | 'pending' | 'rejected'
  uploadDate: string
  completionDate?: string
  translator?: string
  pages: number
  price: number
  downloadUrl?: string
  notes?: string
}

interface TranslationMessage {
  id: number
  sender: 'user' | 'translator' | 'system'
  senderName: string
  content: string
  timestamp: Date
  attachments?: { name: string; url: string }[]
}

// Inspection Reports Data
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

// Translation Documents Data
const translationDocuments: TranslationDocument[] = [
  {
    id: 1,
    documentName: 'Vehicle Registration - Toyota Camry',
    documentType: 'Registration Certificate',
    sourceLanguage: 'Japanese',
    targetLanguage: 'English',
    status: 'completed',
    uploadDate: '2024-01-10',
    completionDate: '2024-01-12',
    translator: 'Certified Translation Services',
    pages: 2,
    price: 5000,
    downloadUrl: '/translations/doc-001.pdf'
  },
  {
    id: 2,
    documentName: 'Auction Sheet - Honda CR-V',
    documentType: 'Auction Document',
    sourceLanguage: 'Japanese',
    targetLanguage: 'English',
    status: 'completed',
    uploadDate: '2024-01-12',
    completionDate: '2024-01-13',
    translator: 'Quick Translate Pro',
    pages: 3,
    price: 7500,
    downloadUrl: '/translations/doc-002.pdf'
  },
  {
    id: 3,
    documentName: 'Service History - Mazda MX-5',
    documentType: 'Service Records',
    sourceLanguage: 'Japanese',
    targetLanguage: 'English',
    status: 'in-progress',
    uploadDate: '2024-01-15',
    translator: 'Certified Translation Services',
    pages: 8,
    price: 12000,
    notes: 'Expected completion: 2024-01-17'
  },
  {
    id: 4,
    documentName: 'Export Certificate - Nissan Leaf',
    documentType: 'Export Document',
    sourceLanguage: 'Japanese',
    targetLanguage: 'English',
    status: 'pending',
    uploadDate: '2024-01-16',
    pages: 4,
    price: 8000,
    notes: 'Awaiting translator assignment'
  },
  {
    id: 5,
    documentName: 'Insurance Documents - BMW X3',
    documentType: 'Insurance',
    sourceLanguage: 'Japanese',
    targetLanguage: 'English',
    status: 'rejected',
    uploadDate: '2024-01-14',
    pages: 5,
    price: 0,
    notes: 'Document quality too poor for translation. Please upload clearer images.'
  }
]

const documentTypes = [
  'Registration Certificate',
  'Auction Document',
  'Service Records',
  'Export Document',
  'Insurance',
  'Owner Manual',
  'Inspection Report',
  'Purchase Agreement',
  'Other'
]

const languages = [
  { code: 'ja', name: 'Japanese' },
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ko', name: 'Korean' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ru', name: 'Russian' }
]

function DocumentsContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'inspections' | 'translations'>('inspections')
  const [selectedReport, setSelectedReport] = useState<InspectionReport | null>(null)
  const [filterStatusInspection, setFilterStatusInspection] = useState<'all' | 'passed' | 'failed' | 'pending'>('all')
  const [filterStatusTranslation, setFilterStatusTranslation] = useState<'all' | 'completed' | 'in-progress' | 'pending' | 'rejected'>('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [prefillVehicle, setPrefillVehicle] = useState<string>('')
  const [selectedTranslation, setSelectedTranslation] = useState<TranslationDocument | null>(null)
  const [translationMessages, setTranslationMessages] = useState<TranslationMessage[]>([])
  const [messageInput, setMessageInput] = useState('')

  useEffect(() => {
    // Check if we should open translations tab
    const tab = searchParams.get('tab')
    const vehicle = searchParams.get('vehicle')
    
    if (tab === 'translations') {
      setActiveTab('translations')
      
      // If vehicle is provided, open upload modal with prefilled data
      if (vehicle) {
        setPrefillVehicle(vehicle)
        setShowUploadModal(true)
      }
    }
  }, [searchParams])

  const filteredReports = inspectionReports.filter(report => 
    filterStatusInspection === 'all' || report.status === filterStatusInspection
  )

  const filteredDocuments = translationDocuments.filter(doc =>
    filterStatusTranslation === 'all' || doc.status === filterStatusTranslation
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      case 'failed':
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'Registration Certificate':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case 'Auction Document':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Vehicle Documents</h1>
        <p className="text-sm text-gray-500 mt-1">Manage inspection reports and document translations</p>
      </div>

      {/* Combined Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">
                {inspectionReports.length + translationDocuments.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-[#FA7921]/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#FA7921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Inspections</p>
              <p className="text-2xl font-bold text-gray-900">{inspectionReports.length}</p>
              <p className="text-xs text-green-600 font-medium mt-1">
                {inspectionReports.filter(r => r.status === 'passed').length} passed
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Translations</p>
              <p className="text-2xl font-bold text-gray-900">{translationDocuments.length}</p>
              <p className="text-xs text-blue-600 font-medium mt-1">
                {translationDocuments.filter(d => d.status === 'completed').length} completed
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Pending Actions</p>
              <p className="text-2xl font-bold text-yellow-600">
                {inspectionReports.filter(r => r.status === 'pending').length + 
                 translationDocuments.filter(d => d.status === 'pending').length}
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

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('inspections')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'inspections'
                  ? 'text-[#FA7921] bg-[#FA7921]/5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Vehicle Inspections
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === 'inspections' ? 'bg-[#FA7921] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {inspectionReports.length}
                </span>
              </div>
              {activeTab === 'inspections' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FA7921]" />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('translations')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'translations'
                  ? 'text-[#FA7921] bg-[#FA7921]/5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Document Translations
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === 'translations' ? 'bg-[#FA7921] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {translationDocuments.length}
                </span>
              </div>
              {activeTab === 'translations' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FA7921]" />
              )}
            </button>
          </div>
        </div>

        {/* Inspections Tab Content */}
        {activeTab === 'inspections' && (
          <div className="p-6">
            {/* Filter and Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {(['all', 'passed', 'failed', 'pending'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatusInspection(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterStatusInspection === status
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

            {/* Inspection Reports List */}
            <div className="space-y-4">
              {filteredReports.map(report => (
                <div
                  key={report.id}
                  className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
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
                              <div key={category.name} className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-200">
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
                              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">
                                Download Report
                              </button>
                            </>
                          )}
                          {report.status === 'pending' && (
                            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-all text-sm font-medium">
                              Check Status
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Translations Tab Content */}
        {activeTab === 'translations' && (
          <div className="p-6">
            {/* Filter and Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {(['all', 'completed', 'in-progress', 'pending', 'rejected'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatusTranslation(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterStatusTranslation === status
                        ? 'bg-[#FA7921] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-[#002233] text-white rounded-lg hover:bg-[#003344] transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Document
              </button>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              {filteredDocuments.map(doc => (
                <div key={doc.id} className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        doc.status === 'completed' ? 'bg-green-100 text-green-600' :
                        doc.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                        doc.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {getDocumentIcon(doc.documentType)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{doc.documentName}</h3>
                            <p className="text-sm text-gray-500">{doc.documentType}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                            {doc.status.toUpperCase().replace('-', ' ')}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Languages</p>
                            <p className="text-sm font-medium text-gray-900">
                              {doc.sourceLanguage} → {doc.targetLanguage}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Pages</p>
                            <p className="text-sm font-medium text-gray-900">{doc.pages}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Upload Date</p>
                            <p className="text-sm font-medium text-gray-900">{doc.uploadDate}</p>
                          </div>
                          {doc.completionDate && (
                            <div>
                              <p className="text-xs text-gray-500">Completed</p>
                              <p className="text-sm font-medium text-gray-900">{doc.completionDate}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-gray-500">Cost</p>
                            <p className="text-sm font-medium text-gray-900">
                              {doc.price > 0 ? `¥${doc.price.toLocaleString()}` : '-'}
                            </p>
                          </div>
                        </div>

                        {doc.translator && (
                          <p className="text-sm text-gray-600 mb-2">
                            Translator: <span className="font-medium">{doc.translator}</span>
                          </p>
                        )}

                        {doc.notes && (
                          <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                            <p className="text-sm text-gray-600">{doc.notes}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {doc.status === 'completed' && doc.downloadUrl && (
                            <button className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-all text-sm font-medium flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Download
                            </button>
                          )}
                          {doc.status === 'in-progress' && (
                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-medium">
                              Check Progress
                            </button>
                          )}
                          {doc.status === 'rejected' && (
                            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm font-medium">
                              Re-upload
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              setSelectedTranslation(doc)
                              // Set sample messages for the translation
                              setTranslationMessages([
                                {
                                  id: 1,
                                  sender: 'system',
                                  senderName: 'System',
                                  content: `Translation request created for "${doc.documentName}"`,
                                  timestamp: new Date(doc.uploadDate),
                                },
                                {
                                  id: 2,
                                  sender: 'translator',
                                  senderName: doc.translator || 'Translation Service',
                                  content: 'I\'ve received your document and will begin translation shortly. The document appears to be in good quality.',
                                  timestamp: new Date(doc.uploadDate),
                                },
                                {
                                  id: 3,
                                  sender: 'user',
                                  senderName: 'You',
                                  content: 'Thank you! Please ensure all technical terms are accurately translated.',
                                  timestamp: new Date(doc.uploadDate),
                                },
                                ...(doc.status === 'completed' ? [
                                  {
                                    id: 4,
                                    sender: 'translator' as const,
                                    senderName: doc.translator || 'Translation Service',
                                    content: 'Translation completed! The document has been reviewed and is ready for download.',
                                    timestamp: new Date(doc.completionDate!),
                                    attachments: [{ name: 'Translated_Document.pdf', url: doc.downloadUrl! }]
                                  }
                                ] : doc.status === 'in-progress' ? [
                                  {
                                    id: 4,
                                    sender: 'translator' as const,
                                    senderName: doc.translator || 'Translation Service',
                                    content: `Currently working on page ${Math.floor(doc.pages * 0.6)} of ${doc.pages}. Should be complete soon.`,
                                    timestamp: new Date(),
                                  }
                                ] : doc.status === 'rejected' ? [
                                  {
                                    id: 4,
                                    sender: 'translator' as const,
                                    senderName: 'Translation Service',
                                    content: doc.notes || 'Unable to process this document. Please upload a clearer version.',
                                    timestamp: new Date(doc.uploadDate),
                                  }
                                ] : [])
                              ])
                            }}
                            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Inspection Report Modal */}
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

      {/* Translation Chat Modal */}
      {selectedTranslation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full h-[80vh] flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedTranslation.documentName}</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">{selectedTranslation.documentType}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedTranslation.status)}`}>
                      {selectedTranslation.status.toUpperCase().replace('-', ' ')}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedTranslation.sourceLanguage} → {selectedTranslation.targetLanguage}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedTranslation(null)
                    setTranslationMessages([])
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Info Bar */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-500">Pages:</span>
                    <span className="ml-2 font-medium text-gray-900">{selectedTranslation.pages}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cost:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {selectedTranslation.price > 0 ? `¥${selectedTranslation.price.toLocaleString()}` : 'Pending'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Translator:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {selectedTranslation.translator || 'Not assigned'}
                    </span>
                  </div>
                </div>
                {selectedTranslation.status === 'completed' && selectedTranslation.downloadUrl && (
                  <button className="px-3 py-1.5 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-all text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {translationMessages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : ''}`}>
                    {message.sender !== 'user' && (
                      <p className="text-xs text-gray-500 mb-1">{message.senderName}</p>
                    )}
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-[#FA7921] text-white'
                        : message.sender === 'system'
                        ? 'bg-gray-100 text-gray-700 italic'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span className="text-xs text-gray-600">{attachment.name}</span>
                            <button className="text-xs text-[#FA7921] hover:underline">Download</button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-end gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && messageInput.trim()) {
                        const newMessage: TranslationMessage = {
                          id: translationMessages.length + 1,
                          sender: 'user',
                          senderName: 'You',
                          content: messageInput,
                          timestamp: new Date()
                        }
                        setTranslationMessages([...translationMessages, newMessage])
                        setMessageInput('')
                      }
                    }}
                    placeholder="Type a message about the translation..."
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => {
                    if (messageInput.trim()) {
                      const newMessage: TranslationMessage = {
                        id: translationMessages.length + 1,
                        sender: 'user',
                        senderName: 'You',
                        content: messageInput,
                        timestamp: new Date()
                      }
                      setTranslationMessages([...translationMessages, newMessage])
                      setMessageInput('')
                    }
                  }}
                  className="p-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Translation Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Upload Document for Translation</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {prefillVehicle && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Vehicle:</span> {prefillVehicle}
                    </p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                  <select 
                    defaultValue={prefillVehicle ? 'Auction Document' : ''}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  >
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Source Language</label>
                    <select 
                      defaultValue="ja"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
                    <select 
                      defaultValue="en"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FA7921] transition-colors cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions (Optional)</label>
                  <textarea
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                    rows={3}
                    placeholder="Any specific requirements or notes for the translator..."
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Estimated Pages:</span>
                    <span className="text-sm font-medium text-gray-900">-</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Estimated Cost:</span>
                    <span className="text-lg font-bold text-[#FA7921]">¥2,000 per page</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowUploadModal(false)
                    setPrefillVehicle('')
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#FA7921]/90 transition-all font-medium">
                  Submit for Translation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-96"><div className="text-gray-500">Loading...</div></div>}>
      <DocumentsContent />
    </Suspense>
  )
}