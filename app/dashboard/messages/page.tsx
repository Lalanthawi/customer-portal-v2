'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: Date
  isRead: boolean
  attachments?: {
    type: 'image' | 'document'
    url: string
    name: string
  }[]
}

interface Conversation {
  id: number
  participantName: string
  participantRole: string
  participantAvatar?: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline: boolean
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    id: 1,
    participantName: 'Tokyo Premium Motors',
    participantRole: 'Dealer',
    lastMessage: 'The Toyota Camry is ready for inspection',
    lastMessageTime: new Date('2024-01-16T10:30:00'),
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: 1,
        senderId: 'dealer',
        senderName: 'Tokyo Premium Motors',
        content: 'Hello! Thank you for your interest in the 2023 Toyota Camry.',
        timestamp: new Date('2024-01-16T09:00:00'),
        isRead: true
      },
      {
        id: 2,
        senderId: 'user',
        senderName: 'You',
        content: 'Hi! Can you provide more details about the vehicle condition?',
        timestamp: new Date('2024-01-16T09:15:00'),
        isRead: true
      },
      {
        id: 3,
        senderId: 'dealer',
        senderName: 'Tokyo Premium Motors',
        content: 'Of course! The vehicle is in excellent condition with only 15,000km on the odometer. It has a complete service history.',
        timestamp: new Date('2024-01-16T09:30:00'),
        isRead: true
      },
      {
        id: 4,
        senderId: 'dealer',
        senderName: 'Tokyo Premium Motors',
        content: 'I can send you the detailed inspection report if you\'d like.',
        timestamp: new Date('2024-01-16T09:31:00'),
        isRead: true,
        attachments: [
          { type: 'document', url: '/reports/camry-inspection.pdf', name: 'Inspection_Report.pdf' }
        ]
      },
      {
        id: 5,
        senderId: 'user',
        senderName: 'You',
        content: 'That would be great! Also, is the price negotiable?',
        timestamp: new Date('2024-01-16T10:00:00'),
        isRead: true
      },
      {
        id: 6,
        senderId: 'dealer',
        senderName: 'Tokyo Premium Motors',
        content: 'We have some flexibility on the price for serious buyers. What\'s your budget?',
        timestamp: new Date('2024-01-16T10:25:00'),
        isRead: false
      },
      {
        id: 7,
        senderId: 'dealer',
        senderName: 'Tokyo Premium Motors',
        content: 'The Toyota Camry is ready for inspection',
        timestamp: new Date('2024-01-16T10:30:00'),
        isRead: false
      }
    ]
  },
  {
    id: 2,
    participantName: 'Inspection Service Japan',
    participantRole: 'Inspector',
    lastMessage: 'Your inspection report is ready',
    lastMessageTime: new Date('2024-01-15T14:20:00'),
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 1,
        senderId: 'inspector',
        senderName: 'Inspection Service Japan',
        content: 'Good morning! We\'ve completed the inspection for the Honda CR-V.',
        timestamp: new Date('2024-01-15T14:00:00'),
        isRead: true
      },
      {
        id: 2,
        senderId: 'inspector',
        senderName: 'Inspection Service Japan',
        content: 'Your inspection report is ready. Overall score: 88%',
        timestamp: new Date('2024-01-15T14:20:00'),
        isRead: true,
        attachments: [
          { type: 'document', url: '/reports/crv-inspection.pdf', name: 'Honda_CRV_Report.pdf' }
        ]
      }
    ]
  },
  {
    id: 3,
    participantName: 'Shipping Coordinator',
    participantRole: 'Logistics',
    lastMessage: 'Container booking confirmed for next week',
    lastMessageTime: new Date('2024-01-14T16:45:00'),
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: 1,
        senderId: 'logistics',
        senderName: 'Shipping Coordinator',
        content: 'Container booking confirmed for next week',
        timestamp: new Date('2024-01-14T16:45:00'),
        isRead: false
      }
    ]
  },
  {
    id: 4,
    participantName: 'Customer Support',
    participantRole: 'Support',
    lastMessage: 'How can we help you today?',
    lastMessageTime: new Date('2024-01-13T11:00:00'),
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 1,
        senderId: 'support',
        senderName: 'Customer Support',
        content: 'How can we help you today?',
        timestamp: new Date('2024-01-13T11:00:00'),
        isRead: true
      }
    ]
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation])

  const sendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage: Message = {
      id: selectedConversation.messages.length + 1,
      senderId: 'user',
      senderName: 'You',
      content: messageInput,
      timestamp: new Date(),
      isRead: true
    }

    selectedConversation.messages.push(newMessage)
    setMessageInput('')
    scrollToBottom()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full h-[calc(100vh-180px)]">
      <div className="flex h-full gap-4">
        {/* Conversations List */}
        <div className="w-96 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conversation => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 ${
                  selectedConversation.id === conversation.id ? 'bg-[#FA7921]/5 border-l-4 border-l-[#FA7921]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {conversation.participantName.charAt(0)}
                      </span>
                    </div>
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {conversation.participantName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{conversation.participantRole}</p>
                    <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-[#FA7921] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">
                      {selectedConversation.participantName.charAt(0)}
                    </span>
                  </div>
                  {selectedConversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConversation.participantName}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.isOnline ? 'Online' : 'Offline'} • {selectedConversation.participantRole}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConversation.messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.senderId === 'user' ? 'order-2' : ''}`}>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.senderId === 'user'
                      ? 'bg-[#FA7921] text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((attachment, idx) => (
                        <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg ${
                          message.senderId === 'user' ? 'bg-[#FA7921]/10' : 'bg-gray-50'
                        }`}>
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span className="text-xs text-gray-600">{attachment.name}</span>
                          <button className="text-xs text-[#FA7921] hover:underline">Download</button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className={`text-xs mt-1 ${
                    message.senderId === 'user' ? 'text-right text-gray-500' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                    {message.senderId === 'user' && (
                      <span className="ml-2">
                        {message.isRead ? (
                          <svg className="inline w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="inline w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-end gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <div className="flex-1">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#FA7921] focus:border-transparent"
                  rows={1}
                />
              </div>
              <button
                onClick={sendMessage}
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
    </div>
  )
}