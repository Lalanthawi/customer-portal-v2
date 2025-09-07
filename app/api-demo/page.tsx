'use client'

import { useState } from 'react'
import { useVehicle, useVehicles } from '@/hooks/api/useVehicles'
import { useVehicleBids, usePlaceBid } from '@/hooks/api/useBids'
import { useVehicleInspection, useRequestInspection } from '@/hooks/api/useInspections'
import { useVehicleTranslation, useRequestTranslation } from '@/hooks/api/useTranslations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VehicleListSkeleton, BidHistorySkeleton, InspectionSkeleton } from '@/components/loading-skeleton'
import { AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react'

export default function ApiDemoPage() {
  const [selectedVehicleId] = useState('1')
  
  // Fetch vehicles with React Query
  const { data: vehiclesData, isLoading: vehiclesLoading, error: vehiclesError } = useVehicles()
  
  // Fetch specific vehicle
  const { data: vehicle, isLoading: vehicleLoading } = useVehicle(selectedVehicleId)
  
  // Fetch bids for the vehicle
  const { data: bids, isLoading: bidsLoading } = useVehicleBids(selectedVehicleId)
  
  // Fetch inspection status
  const { data: inspection, isLoading: inspectionLoading } = useVehicleInspection(selectedVehicleId)
  
  // Fetch translation status
  const { data: translation } = useVehicleTranslation(selectedVehicleId)
  
  // Mutations
  const placeBidMutation = usePlaceBid()
  const requestInspectionMutation = useRequestInspection()
  const requestTranslationMutation = useRequestTranslation()
  
  const handlePlaceBid = () => {
    placeBidMutation.mutate({
      vehicleId: selectedVehicleId,
      amount: (vehicle?.pricing.currentBid || 0) + 5000,
      message: 'Test bid from API demo'
    })
  }
  
  const handleRequestInspection = () => {
    requestInspectionMutation.mutate({
      vehicleId: selectedVehicleId,
      priority: 'normal'
    })
  }
  
  const handleRequestTranslation = () => {
    requestTranslationMutation.mutate({
      vehicleId: selectedVehicleId,
      targetLanguage: 'en'
    })
  }
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">API Integration Demo</h1>
      
      {/* Vehicles List */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicles (React Query)</CardTitle>
        </CardHeader>
        <CardContent>
          {vehiclesLoading ? (
            <VehicleListSkeleton count={3} />
          ) : vehiclesError ? (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>Error loading vehicles</span>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Found {vehiclesData?.data.length || 0} vehicles
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vehiclesData?.data.slice(0, 3).map((v) => (
                  <div key={v.id} className="border rounded p-3">
                    <h3 className="font-semibold">{v.make} {v.model}</h3>
                    <p className="text-sm text-gray-600">Year: {v.year}</p>
                    <p className="text-sm text-gray-600">Current Bid: ¥{v.pricing.currentBid.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Selected Vehicle Details */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Vehicle Details</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicleLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : vehicle ? (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{vehicle.make} {vehicle.model}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Chassis: {vehicle.chassisNumber}</div>
                <div>Year: {vehicle.year}</div>
                <div>Mileage: {vehicle.mileage.toLocaleString()} km</div>
                <div>Transmission: {vehicle.transmission}</div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
      
      {/* Bid History and Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bid History</CardTitle>
          </CardHeader>
          <CardContent>
            {bidsLoading ? (
              <BidHistorySkeleton />
            ) : (
              <div className="space-y-3">
                {bids?.slice(0, 3).map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <p className="font-medium">{bid.userName}</p>
                      <p className="text-sm text-gray-600">¥{bid.amount.toLocaleString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      bid.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                      bid.status === 'outbid' ? 'bg-gray-100 text-gray-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bid.status}
                    </span>
                  </div>
                ))}
                <Button 
                  onClick={handlePlaceBid}
                  disabled={placeBidMutation.isPending}
                  className="w-full"
                >
                  {placeBidMutation.isPending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Placing Bid...
                    </>
                  ) : (
                    'Place Test Bid (+¥5,000)'
                  )}
                </Button>
                {placeBidMutation.isSuccess && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Bid placed successfully!
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Inspection and Translation */}
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Inspection Status */}
            <div className="border rounded p-3">
              <h4 className="font-medium mb-2">Inspection</h4>
              {inspectionLoading ? (
                <InspectionSkeleton />
              ) : inspection ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {inspection.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-600" />
                    )}
                    <span className="text-sm capitalize">{inspection.status}</span>
                  </div>
                  {inspection.report && (
                    <p className="text-sm text-gray-600">{inspection.report}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">No inspection requested</p>
                  <Button 
                    size="sm" 
                    onClick={handleRequestInspection}
                    disabled={requestInspectionMutation.isPending}
                  >
                    {requestInspectionMutation.isPending ? 'Requesting...' : 'Request Inspection'}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Translation Status */}
            <div className="border rounded p-3">
              <h4 className="font-medium mb-2">Translation</h4>
              {translation ? (
                <div className="flex items-center gap-2">
                  {translation.status === 'translated' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-600" />
                  )}
                  <span className="text-sm capitalize">{translation.status}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">No translation requested</p>
                  <Button 
                    size="sm" 
                    onClick={handleRequestTranslation}
                    disabled={requestTranslationMutation.isPending}
                  >
                    {requestTranslationMutation.isPending ? 'Requesting...' : 'Request Translation'}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* API Configuration Info */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm font-mono">
            <div>Mode: {process.env['NEXT_PUBLIC_USE_MOCK_DATA'] === 'false' ? 'Real API' : 'Mock Data'}</div>
            <div>Base URL: {process.env['NEXT_PUBLIC_API_BASE_URL'] || 'http://localhost:3000/api'}</div>
            <p className="text-xs text-gray-600 mt-2">
              To switch to real API, set NEXT_PUBLIC_USE_MOCK_DATA=false in .env.local
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}