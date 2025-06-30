import { format } from 'date-fns'
import Avatar from '@/components/atoms/Avatar'

const ChatMessage = ({ message, isOwnMessage = false }) => {
  return (
    <div className={`flex space-x-3 ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <Avatar name={message.senderName} size="sm" />
      <div className={`flex-1 ${isOwnMessage ? 'text-right' : ''}`}>
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-slate-200">
            {isOwnMessage ? 'You' : message.senderName}
          </span>
          <span className="text-xs text-slate-400">
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
        </div>
        <div className={`
          inline-block px-3 py-2 rounded-lg text-sm max-w-xs lg:max-w-md
          ${isOwnMessage 
            ? 'bg-gradient-to-r from-primary to-secondary text-white' 
            : 'bg-surface text-slate-100'
          }
        `}>
          {message.content}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage