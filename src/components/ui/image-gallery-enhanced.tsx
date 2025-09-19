'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { Button } from '@/src/components/ui/button'
import { Badge } from '@/src/components/ui/badge'
import { cn } from '@/src/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Download,
  Share2,
  Camera,
  Play,
  Pause,
  RotateCw,
  Loader2,
  EyeOff,
  Info
} from 'lucide-react'

interface ImageGalleryEnhancedProps {
  images: string[]
  alt?: string
  className?: string
}

export function ImageGalleryEnhanced({
  images,
  alt = 'Vehicle image',
  className
}: ImageGalleryEnhancedProps) {
  // Core states
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  
  // Enhanced states
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({})
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [showInfo, setShowInfo] = useState(false)
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Preload adjacent images
  useEffect(() => {
    const preloadImage = (index: number) => {
      if (images[index] && !loadingStates[index] && !imageErrors[index]) {
        const img = new window.Image()
        img.src = images[index]
        img.onload = () => {
          setLoadingStates(prev => ({ ...prev, [index]: false }))
        }
        img.onerror = () => {
          setImageErrors(prev => ({ ...prev, [index]: true }))
        }
      }
    }

    // Preload current, next, and previous images
    preloadImage(selectedIndex)
    preloadImage((selectedIndex + 1) % images.length)
    preloadImage((selectedIndex - 1 + images.length) % images.length)
  }, [selectedIndex, images, loadingStates, imageErrors])

  // Slideshow functionality
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      playIntervalRef.current = setInterval(() => {
        setSelectedIndex(prev => (prev + 1) % images.length)
      }, 3000)
    }
    
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current)
      }
    }
  }, [isPlaying, images.length])

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLightbox) return
      
      switch (e.key) {
        case 'ArrowLeft':
          navigatePrev()
          break
        case 'ArrowRight':
          navigateNext()
          break
        case 'Escape':
          setShowLightbox(false)
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
        case '_':
          handleZoomOut()
          break
        case ' ':
          e.preventDefault()
          setIsPlaying(prev => !prev)
          break
        case 'i':
          setShowInfo(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showLightbox, selectedIndex])

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!e.changedTouches[0]) return
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const diffX = touchStartX.current - touchEndX
    const diffY = touchStartY.current - touchEndY
    
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        navigateNext()
      } else {
        navigatePrev()
      }
    }
  }

  // Mouse drag for panning zoomed images
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const navigatePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
    setImagePosition({ x: 0, y: 0 })
  }, [images.length])

  const navigateNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length)
    setImagePosition({ x: 0, y: 0 })
  }, [images.length])

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 0.5)
      if (newZoom <= 1) {
        setImagePosition({ x: 0, y: 0 })
      }
      return newZoom
    })
  }

  const resetZoom = () => {
    setZoomLevel(1)
    setImagePosition({ x: 0, y: 0 })
  }

  const handleDownload = async () => {
    const image = images[selectedIndex]
    if (!image) return
    
    try {
      const response = await fetch(image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `vehicle-image-${selectedIndex + 1}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vehicle Image',
        text: `Check out this vehicle image`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      const notification = document.createElement('div')
      notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
      notification.textContent = '✓ Link copied to clipboard!'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }


  if (!images || images.length === 0) {
    return (
      <div className={cn("relative h-[500px] bg-gray-100 rounded-lg flex items-center justify-center", className)}>
        <div className="text-center">
          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Main Gallery Container - Clean white design matching site theme */}
      <div className={cn("bg-white rounded-xl border border-gray-200 overflow-hidden", className)}>
        {/* Header Bar - Clean and minimal */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900">
                {selectedIndex + 1} of {images.length} photos
              </span>
              {loadingStates[selectedIndex] && (
                <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Loading
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                size="sm"
                variant="outline"
                className="border-gray-200 hover:border-[#FA7921] hover:bg-orange-50"
                title={isPlaying ? "Pause slideshow" : "Start slideshow"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="ml-2 hidden sm:inline">Slideshow</span>
              </Button>
              <Button
                onClick={() => setShowLightbox(true)}
                size="sm"
                variant="outline"
                className="border-gray-200 hover:border-[#FA7921] hover:bg-orange-50"
                title="View fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Fullscreen</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Image Container */}
        <div
          ref={containerRef}
          className="relative bg-gray-50 aspect-[16/10] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {imageErrors[selectedIndex] ? (
            <div className="text-center">
              <EyeOff className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Failed to load image</p>
            </div>
          ) : (
            <>
              {loadingStates[selectedIndex] && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <Loader2 className="h-12 w-12 text-[#FA7921] animate-spin" />
                </div>
              )}
              <Image
                src={images[selectedIndex] || '/images/car-placeholder.jpg'}
                alt={`${alt} ${selectedIndex + 1}`}
                width={900}
                height={500}
                className="object-contain w-full h-full cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => setShowLightbox(true)}
                onLoadingComplete={() => setLoadingStates(prev => ({ ...prev, [selectedIndex]: false }))}
                onError={() => setImageErrors(prev => ({ ...prev, [selectedIndex]: true }))}
                priority
              />
            </>
          )}

          {/* Clean Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={navigatePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg hover:border-[#FA7921] hover:bg-orange-50 transition-all flex items-center justify-center group"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-[#FA7921]" />
              </button>
              <button
                onClick={navigateNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg hover:border-[#FA7921] hover:bg-orange-50 transition-all flex items-center justify-center group"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-[#FA7921]" />
              </button>
            </>
          )}

        </div>

        {/* Clean Thumbnail Grid */}
        {images.length > 1 && (
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all",
                    selectedIndex === index
                      ? "border-[#FA7921] shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  {imageErrors[index] ? (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    </div>
                  ) : (
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                  {selectedIndex === index && (
                    <div className="absolute inset-0 ring-2 ring-[#FA7921] ring-inset rounded-lg" />
                  )}
                </button>
              ))}
            </div>

            {/* Dots indicator for mobile */}
            <div className="flex justify-center gap-1.5 mt-3 sm:hidden">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    selectedIndex === index
                      ? "bg-[#FA7921] w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Lightbox Modal */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-0">
          <div className="relative w-full h-full min-h-[80vh]">
            {/* Lightbox Header */}
            <div className="absolute top-0 left-0 right-0 z-30 p-4 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0">
                    {selectedIndex + 1} / {images.length}
                  </Badge>
                  {showInfo && (
                    <Badge className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border-0">
                      Zoom: {Math.round(zoomLevel * 100)}% | Use scroll to zoom
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  <Button
                    onClick={handleZoomOut}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    disabled={zoomLevel <= 0.5}
                  >
                    <ZoomOut className="h-5 w-5" />
                  </Button>
                  <span className="text-white font-medium px-2 min-w-[60px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <Button
                    onClick={handleZoomIn}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    disabled={zoomLevel >= 4}
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={resetZoom}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    title="Reset zoom"
                  >
                    <RotateCw className="h-5 w-5" />
                  </Button>
                  
                  
                  {/* Action Controls */}
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button
                    onClick={() => setShowInfo(!showInfo)}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    title="Toggle info"
                  >
                    <Info className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleDownload}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    title="Download image"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleShare}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    title="Share"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={toggleFullscreen}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    title="Fullscreen"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => setShowLightbox(false)}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Lightbox Image */}
            <div 
              className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : (zoomLevel > 1 ? 'grab' : 'default') }}
            >
              <div 
                className="relative max-w-full max-h-full"
                style={{ 
                  transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s'
                }}
              >
                {imageErrors[selectedIndex] ? (
                  <div className="text-center p-12">
                    <EyeOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Failed to load image</p>
                  </div>
                ) : (
                  <>
                    {loadingStates[selectedIndex] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-16 w-16 text-white animate-spin" />
                      </div>
                    )}
                    <Image
                      src={images[selectedIndex] || '/images/car-placeholder.jpg'}
                      alt={`${alt} ${selectedIndex + 1}`}
                      width={1920}
                      height={1080}
                      className="object-contain select-none"
                      onLoadingComplete={() => setLoadingStates(prev => ({ ...prev, [selectedIndex]: false }))}
                      onError={() => setImageErrors(prev => ({ ...prev, [selectedIndex]: true }))}
                      draggable={false}
                      priority
                    />
                  </>
                )}
              </div>

              {/* Lightbox Navigation */}
              {images.length > 1 && !isDragging && (
                <>
                  <Button
                    onClick={navigatePrev}
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    onClick={navigateNext}
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </>
              )}
            </div>


            {/* Lightbox Thumbnails */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4">
              <div className="flex gap-2 justify-center overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedIndex(index)
                      resetZoom()
                    }}
                    className={cn(
                      "relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                      selectedIndex === index 
                        ? "border-[#FA7921] scale-110" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    {imageErrors[index] ? (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <EyeOff className="h-3 w-3 text-gray-500" />
                      </div>
                    ) : (
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyboard shortcuts hint */}
            {showInfo && (
              <div className="absolute bottom-20 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white/80 text-xs max-w-md">
                <div className="grid grid-cols-2 gap-2">
                  <div>← → Navigate</div>
                  <div>Space: Play/Pause</div>
                  <div>+/- Zoom</div>
                  <div>I: Info</div>
                  <div>ESC: Close</div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}