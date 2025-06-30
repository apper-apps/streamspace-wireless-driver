import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const MeetingControls = ({
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onShowChat,
  onShowParticipants,
  onShowSettings,
  onLeaveMeeting,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`
        glass fixed bottom-6 left-1/2 transform -translate-x-1/2
        flex items-center space-x-3 px-6 py-4 rounded-2xl shadow-2xl
        ${className}
      `}
    >
      {/* Audio Toggle */}
      <Button
        variant={isAudioEnabled ? 'secondary' : 'danger'}
        size="lg"
        onClick={onToggleAudio}
        className="rounded-full p-3"
      >
        <ApperIcon 
          name={isAudioEnabled ? 'Mic' : 'MicOff'} 
          size={20}
        />
      </Button>
      
      {/* Video Toggle */}
      <Button
        variant={isVideoEnabled ? 'secondary' : 'danger'}
        size="lg"
        onClick={onToggleVideo}
        className="rounded-full p-3"
      >
        <ApperIcon 
          name={isVideoEnabled ? 'Video' : 'VideoOff'} 
          size={20}
        />
      </Button>
      
      {/* Screen Share Toggle */}
      <Button
        variant={isScreenSharing ? 'success' : 'secondary'}
        size="lg"
        onClick={onToggleScreenShare}
        className="rounded-full p-3"
      >
        <ApperIcon 
          name={isScreenSharing ? 'MonitorStop' : 'Monitor'} 
          size={20}
        />
      </Button>
      
      {/* Divider */}
      <div className="w-px h-8 bg-slate-600" />
      
      {/* Chat */}
      <Button
        variant="ghost"
        size="lg"
        onClick={onShowChat}
        className="rounded-full p-3"
      >
        <ApperIcon name="MessageSquare" size={20} />
      </Button>
      
      {/* Participants */}
      <Button
        variant="ghost"
        size="lg"
        onClick={onShowParticipants}
        className="rounded-full p-3"
      >
        <ApperIcon name="Users" size={20} />
      </Button>
      
      {/* Settings */}
      <Button
        variant="ghost"
        size="lg"
        onClick={onShowSettings}
        className="rounded-full p-3"
      >
        <ApperIcon name="Settings" size={20} />
      </Button>
      
      {/* Divider */}
      <div className="w-px h-8 bg-slate-600" />
      
      {/* Leave Meeting */}
      <Button
        variant="danger"
        size="lg"
        onClick={onLeaveMeeting}
        className="rounded-full p-3"
      >
        <ApperIcon name="PhoneOff" size={20} />
      </Button>
    </motion.div>
  )
}

export default MeetingControls