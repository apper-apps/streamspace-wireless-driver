import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ChatMessage from '@/components/molecules/ChatMessage'
import ApperIcon from '@/components/ApperIcon'

const ChatPanel = ({ 
  messages, 
  currentUserId, 
  onSendMessage, 
  onClose,
  className = '' 
}) => {
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(scrollToBottom, [messages])
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim())
      setNewMessage('')
    }
  }
  
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className={`
        glass fixed right-4 top-4 bottom-20 w-80 rounded-lg shadow-2xl
        flex flex-col ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-600">
        <h3 className="text-lg font-display font-semibold text-slate-100">
          Chat
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ApperIcon name="X" size={16} />
        </Button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ChatMessage
                message={message}
                isOwnMessage={message.senderId === currentUserId}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-600">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            <ApperIcon name="Send" size={16} />
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default ChatPanel