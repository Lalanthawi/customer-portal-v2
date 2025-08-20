export interface TimelineStage {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'pending'
  progress: number // 0-100
  tasksCompleted: number
  totalTasks: number
  completedDate?: Date
  completedBy?: string
  estimatedDate?: Date
  isExpandable: boolean
  details?: StageDetail[]
}

export interface StageDetail {
  id: string
  title: string
  status: 'completed' | 'pending'
  description?: string
  dueDate?: Date
  completedDate?: Date
  assignee?: string
  documents?: Document[]
}

export interface Document {
  id: string
  name: string
  type: string
  url?: string
  required: boolean
  uploaded: boolean
}