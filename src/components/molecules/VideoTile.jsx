import { motion } from 'framer-motion'
import Avatar from '@/components/atoms/Avatar'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const VideoTile = ({ 
  participant, 
  isLocalUser = false, 
  isSpeaking = false,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`
        relative rounded-lg overflow-hidden bg-slate-800 shadow-xl
        ${isSpeaking ? 'speaking-indicator ring-2 ring-success' : ''}
        ${className}
      `}
    >
      {/* Video Element */}
      <div className="relative w-full h-full min-h-[200px]">
        {participant.videoEnabled ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted={isLocalUser}
            playsInline
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-700">
            <Avatar 
              name={participant.name}
              size="xl"
              online={true}
            />
          </div>
        )}
        
        {/* Gradient Overlay for Better Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Participant Info */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
          <Badge variant={participant.audioEnabled ? 'success' : 'error'}>
            <ApperIcon 
              name={participant.audioEnabled ? 'Mic' : 'MicOff'} 
              size={12} 
              className="mr-1" 
            />
            {participant.name}
            {isLocalUser && ' (You)'}
          </Badge>
        </div>
        
        {/* Connection Quality Indicator */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant={
              participant.connectionQuality === 'excellent' ? 'success' :
              participant.connectionQuality === 'good' ? 'info' :
              participant.connectionQuality === 'poor' ? 'warning' : 'error'
            }
          >
            <ApperIcon 
              name={
                participant.connectionQuality === 'excellent' ? 'Wifi' :
                participant.connectionQuality === 'good' ? 'Wifi' :
                participant.connectionQuality === 'poor' ? 'WifiOff' : 'WifiOff'
              } 
              size={12} 
            />
          </Badge>
        </div>
        
        {/* Screen Sharing Indicator */}
        {participant.isScreenSharing && (
          <div className="absolute top-3 left-3">
            <Badge variant="info">
              <ApperIcon name="Monitor" size={12} className="mr-1" />
              Sharing Screen
            </Badge>
          </div>
        )}
        
        {/* Speaking Indicator */}
        {isSpeaking && (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-success"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

export default VideoTile