import { ShipmentTimeline, TimelineStage } from '@/src/types/api.types'

type ShipmentUpdateCallback = (timeline: ShipmentTimeline) => void

class ShipmentStore {
  private timelines: Map<string, ShipmentTimeline> = new Map()
  private subscribers: Map<string, Set<ShipmentUpdateCallback>> = new Map()
  private updateTimestamps: Map<string, number> = new Map()

  /**
   * Get timeline for a specific order
   */
  getTimeline(orderId: string): ShipmentTimeline | null {
    return this.timelines.get(orderId) || null
  }

  /**
   * Set/update timeline for a specific order
   */
  setTimeline(orderId: string, timeline: ShipmentTimeline): void {
    const existingTimeline = this.timelines.get(orderId)
    
    // Check if timeline has actually changed
    if (existingTimeline && existingTimeline.lastUpdated === timeline.lastUpdated) {
      return // No changes, skip update
    }

    this.timelines.set(orderId, timeline)
    this.updateTimestamps.set(orderId, Date.now())
    
    // Notify subscribers
    this.notifySubscribers(orderId, timeline)
  }

  /**
   * Update a specific stage in the timeline
   */
  updateStage(orderId: string, stageId: string, updates: Partial<TimelineStage>): void {
    const timeline = this.timelines.get(orderId)
    if (!timeline) return

    const stageIndex = timeline.stages.findIndex(s => s.id === stageId)
    if (stageIndex === -1) return

    // Update the stage
    const existingStage = timeline.stages[stageIndex]
    if (existingStage) {
      timeline.stages[stageIndex] = {
        ...existingStage,
        ...updates,
        id: existingStage.id, // Ensure required fields are preserved
        sequence: existingStage.sequence,
        title: existingStage.title,
        isVisible: existingStage.isVisible
      }
    }

    // Update timeline metadata
    timeline.lastUpdated = new Date().toISOString()
    
    // Update current stage if needed
    if (updates.status === 'in-progress') {
      timeline.currentStageId = stageId
    }

    this.setTimeline(orderId, timeline)
  }

  /**
   * Subscribe to timeline updates for a specific order
   */
  subscribe(orderId: string, callback: ShipmentUpdateCallback): () => void {
    if (!this.subscribers.has(orderId)) {
      this.subscribers.set(orderId, new Set())
    }
    
    this.subscribers.get(orderId)!.add(callback)
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(orderId)
      if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          this.subscribers.delete(orderId)
        }
      }
    }
  }

  /**
   * Notify all subscribers of a timeline update
   */
  private notifySubscribers(orderId: string, timeline: ShipmentTimeline): void {
    const callbacks = this.subscribers.get(orderId)
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(timeline)
        } catch (error) {
          console.error('Error in shipment timeline subscriber:', error)
        }
      })
    }
  }

  /**
   * Clear timeline data for a specific order
   */
  clearTimeline(orderId: string): void {
    this.timelines.delete(orderId)
    this.updateTimestamps.delete(orderId)
  }

  /**
   * Clear all timeline data
   */
  clearAll(): void {
    this.timelines.clear()
    this.updateTimestamps.clear()
  }

  /**
   * Get the last update timestamp for a timeline
   */
  getLastUpdateTime(orderId: string): number | null {
    return this.updateTimestamps.get(orderId) || null
  }

  /**
   * Check if timeline data is stale (older than specified duration)
   */
  isStale(orderId: string, maxAge: number = 60000): boolean {
    const lastUpdate = this.updateTimestamps.get(orderId)
    if (!lastUpdate) return true
    
    return Date.now() - lastUpdate > maxAge
  }

  /**
   * Get all cached order IDs
   */
  getCachedOrderIds(): string[] {
    return Array.from(this.timelines.keys())
  }

  /**
   * Calculate overall progress for a timeline
   */
  calculateProgress(orderId: string): number {
    const timeline = this.timelines.get(orderId)
    if (!timeline) return 0

    const visibleStages = timeline.stages.filter(s => s.isVisible)
    const totalStages = visibleStages.length
    
    if (totalStages === 0) return 0

    const completedStages = visibleStages.filter(s => s.status === 'completed').length
    const inProgressStage = visibleStages.find(s => s.status === 'in-progress')
    const inProgressValue = inProgressStage ? inProgressStage.progress / 100 : 0

    return Math.round(((completedStages + inProgressValue) / totalStages) * 100)
  }

  /**
   * Get current active stage
   */
  getCurrentStage(orderId: string): TimelineStage | null {
    const timeline = this.timelines.get(orderId)
    if (!timeline) return null

    // First check for current stage ID
    const currentStage = timeline.stages.find(s => s.id === timeline.currentStageId)
    if (currentStage) return currentStage

    // Fallback to in-progress stage
    const inProgressStage = timeline.stages.find(s => s.status === 'in-progress')
    if (inProgressStage) return inProgressStage

    // Fallback to last completed stage
    const completedStages = timeline.stages
      .filter(s => s.status === 'completed')
      .sort((a, b) => b.sequence - a.sequence)
    
    return completedStages[0] || null
  }

  /**
   * Get next pending stage
   */
  getNextStage(orderId: string): TimelineStage | null {
    const timeline = this.timelines.get(orderId)
    if (!timeline) return null

    const currentStage = this.getCurrentStage(orderId)
    if (!currentStage) return null

    // Find the next stage by sequence
    const nextStages = timeline.stages
      .filter(s => s.sequence > currentStage.sequence && s.isVisible)
      .sort((a, b) => a.sequence - b.sequence)
    
    return nextStages[0] || null
  }

  /**
   * Check if a stage can be updated (business logic)
   */
  canUpdateStage(orderId: string, stageId: string): boolean {
    const timeline = this.timelines.get(orderId)
    if (!timeline) return false

    const stage = timeline.stages.find(s => s.id === stageId)
    if (!stage) return false

    // Can't update completed stages
    if (stage.status === 'completed') return false

    // Can only update current or next stage
    const currentStage = this.getCurrentStage(orderId)
    const nextStage = this.getNextStage(orderId)
    
    return stage.id === currentStage?.id || stage.id === nextStage?.id
  }
}

// Export singleton instance
export const shipmentStore = new ShipmentStore()