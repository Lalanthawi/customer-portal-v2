'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Download,
  Printer,
  Mail,
  CheckCircle,
  CreditCard,
  FileText,
  Car,
  Package
} from 'lucide-react'
import { PageHeader } from '@/src/components/ui/page-header'

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
  type: 'vehicle' | 'service' | 'fee'
}

interface InvoiceData {
  id: string
  invoiceNumber: string
  status: 'paid' | 'pending' | 'overdue' | 'cancelled'
  issueDate: string
  dueDate: string
  paidDate?: string
  customer: {
    name: string
    email: string
    address: string
    phone: string
    customerId: string
  }
  vehicle?: {
    id: string
    make: string
    model: string
    year: number
    vin: string
    auctionId: string
    images: string[]
  }
  items: InvoiceItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  paymentMethod?: string
  transactionId?: string
  notes?: string
}

export default function InvoicePage() {
  const params = useParams()
  const invoiceId = params['id'] as string
  const [invoice, setInvoice] = useState<InvoiceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching invoice data
    const fetchInvoice = () => {
      // Mock invoice data
      const mockInvoice: InvoiceData = {
        id: invoiceId,
        invoiceNumber: `INV-${invoiceId.toUpperCase()}`,
        status: 'paid',
        issueDate: '2024-01-15',
        dueDate: '2024-01-30',
        paidDate: '2024-01-20',
        customer: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          address: '123 Main Street, Tokyo, Japan 100-0001',
          phone: '+81 3-1234-5678',
          customerId: 'CUST-001'
        },
        vehicle: {
          id: 'VEH-001',
          make: 'Toyota',
          model: 'Crown Hybrid',
          year: 2023,
          vin: 'JT2BF22K1Y0123456',
          auctionId: 'AUC-2024-0892',
          images: ['/images/singlecar/car1.jpg']
        },
        items: [
          {
            id: '1',
            description: '2023 Toyota Crown Hybrid - Winning Bid',
            quantity: 1,
            unitPrice: 3500000,
            amount: 3500000,
            type: 'vehicle'
          },
          {
            id: '2',
            description: 'Vehicle Inspection Service',
            quantity: 1,
            unitPrice: 3000,
            amount: 3000,
            type: 'service'
          },
          {
            id: '3',
            description: 'Translation Service - Auction Sheet',
            quantity: 1,
            unitPrice: 0,
            amount: 0,
            type: 'service'
          },
          {
            id: '4',
            description: 'Auction House Fee',
            quantity: 1,
            unitPrice: 50000,
            amount: 50000,
            type: 'fee'
          },
          {
            id: '5',
            description: 'Export Documentation',
            quantity: 1,
            unitPrice: 15000,
            amount: 15000,
            type: 'fee'
          }
        ],
        subtotal: 3568000,
        tax: 356800,
        shipping: 85000,
        discount: 50000,
        total: 3959800,
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-2024-001234',
        notes: 'Vehicle passed all inspections. Ready for shipment.'
      }

      setInvoice(mockInvoice)
      setLoading(false)
    }

    setTimeout(fetchInvoice, 500)
  }, [invoiceId])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Simulate PDF download
    console.log('Downloading invoice PDF...')
  }

  const handleEmail = () => {
    // Simulate email sending
    console.log('Sending invoice via email...')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FA7921] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading invoice...</p>
        </div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Invoice Not Found</h2>
          <p className="text-gray-600 mb-4">The invoice you're looking for doesn't exist.</p>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#e56b1c] transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header with Actions */}
      <div className="flex items-center justify-between">
        <PageHeader
          title={`Invoice ${invoice.invoiceNumber}`}
          subtitle={`Issued on ${formatDate(invoice.issueDate)}`}
          backHref="/dashboard"
        />
        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={handleEmail}
            className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Send via Email"
          >
            <Mail className="w-5 h-5" />
          </button>
          <button
            onClick={handlePrint}
            className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Print Invoice"
          >
            <Printer className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[#FA7921] text-white rounded-lg hover:bg-[#e56b1c] transition-colors"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Invoice Header */}
        <div className="p-8 border-b border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-[#FA7921] mb-4">INVOICE</h2>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium text-gray-600">Invoice Number:</span>
                  <span className="text-gray-900">{invoice.invoiceNumber}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-gray-600">Issue Date:</span>
                  <span className="text-gray-900">{formatDate(invoice.issueDate)}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-gray-600">Due Date:</span>
                  <span className="text-gray-900">{formatDate(invoice.dueDate)}</span>
                </div>
                {invoice.paidDate && (
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-600">Paid Date:</span>
                    <span className="text-gray-900">{formatDate(invoice.paidDate)}</span>
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                    {invoice.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-1">CarOmoto Japan</h3>
                <p className="text-sm text-gray-600">
                  456 Business Avenue<br />
                  Minato-ku, Tokyo 105-0001<br />
                  Japan<br />
                  Tel: +81 3-9876-5432<br />
                  Email: billing@caromoto.jp
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-1">Bill To:</h4>
                <p className="text-sm text-gray-600">
                  {invoice.customer.name}<br />
                  {invoice.customer.address}<br />
                  {invoice.customer.phone}<br />
                  {invoice.customer.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        {invoice.vehicle && (
          <div className="p-8 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Car className="w-5 h-5" />
              Vehicle Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                {invoice.vehicle.images[0] && (
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={invoice.vehicle.images[0]}
                      alt={`${invoice.vehicle.make} ${invoice.vehicle.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-gray-900">
                    {invoice.vehicle.year} {invoice.vehicle.make} {invoice.vehicle.model}
                  </p>
                  <p className="text-gray-600">VIN: {invoice.vehicle.vin}</p>
                  <p className="text-gray-600">Auction ID: {invoice.vehicle.auctionId}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Items */}
        <div className="p-8">
          <h3 className="font-semibold text-gray-900 mb-4">Invoice Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Description</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Qty</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Unit Price</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3 px-2 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        {item.type === 'vehicle' && <Car className="w-4 h-4 text-gray-400" />}
                        {item.type === 'service' && <Package className="w-4 h-4 text-gray-400" />}
                        {item.type === 'fee' && <CreditCard className="w-4 h-4 text-gray-400" />}
                        {item.description}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-900 text-center">{item.quantity}</td>
                    <td className="py-3 px-2 text-sm text-gray-900 text-right">
                      {item.unitPrice === 0 ? 'FREE' : formatCurrency(item.unitPrice)}
                    </td>
                    <td className="py-3 px-2 text-sm font-medium text-gray-900 text-right">
                      {item.amount === 0 ? 'FREE' : formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Summary */}
          <div className="mt-8 flex justify-end">
            <div className="w-full md:w-80 space-y-2">
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="text-gray-900">{formatCurrency(invoice.tax)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">{formatCurrency(invoice.shipping)}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-{formatCurrency(invoice.discount)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between py-2">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-[#FA7921]">{formatCurrency(invoice.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {invoice.status === 'paid' && invoice.paymentMethod && (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-900 mb-1">Payment Confirmed</p>
                  <p className="text-green-700">
                    Paid via {invoice.paymentMethod} on {invoice.paidDate && formatDate(invoice.paidDate)}
                  </p>
                  {invoice.transactionId && (
                    <p className="text-green-600 text-xs mt-1">
                      Transaction ID: {invoice.transactionId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Thank you for your business. For questions about this invoice, please contact billing@caromoto.jp
          </p>
        </div>
      </div>
    </div>
  )
}