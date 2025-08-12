'use client'

import { useState } from 'react'

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

export default function TranslationsPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'pending' | 'rejected'>('all')
  const [showUploadModal, setShowUploadModal] = useState(false)

  const filteredDocuments = translationDocuments.filter(doc =>
    filterStatus === 'all' || doc.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Document Translations</h1>
        <p className="text-sm text-gray-500 mt-1">Translate vehicle documents from Japanese to your preferred language</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{translationDocuments.length}</p>
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
              <p className="text-xs text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {translationDocuments.filter(d => d.status === 'completed').length}
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
              <p className="text-xs text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {translationDocuments.filter(d => d.status === 'in-progress').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ¥{translationDocuments.reduce((sum, d) => sum + d.price, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(['all', 'completed', 'in-progress', 'pending', 'rejected'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
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
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map(doc => (
          <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all">
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
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
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
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                  <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent">
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Source Language</label>
                    <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent">
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
                    <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FA7921] focus:border-transparent">
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
                  onClick={() => setShowUploadModal(false)}
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