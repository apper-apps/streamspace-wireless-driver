import { motion, AnimatePresence } from 'framer-motion'
import VideoTile from '@/components/molecules/VideoTile'

const VideoGrid = ({ 
  participants, 
  localUserId, 
  speakingParticipant,
  layout = 'grid', // 'grid' or 'speaker'
  className = '' 
}) => {
  const getGridClasses = () => {
    const count = participants.length
    if (count === 1) return 'grid-cols-1'
    if (count === 2) return 'grid-cols-1 lg:grid-cols-2'
    if (count <= 4) return 'grid-cols-1 md:grid-cols-2'
    if (count <= 6) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    if (count <= 9) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }
  
  if (layout === 'speaker' && speakingParticipant) {
    const speaker = participants.find(p => p.id === speakingParticipant)
    const others = participants.filter(p => p.id !== speakingParticipant)
    
    return (
      <div className={`flex flex-col h-full ${className}`}>
        {/* Main Speaker */}
        <div className="flex-1 p-4">
          <VideoTile
            participant={speaker}
            isLocalUser={speaker.id === localUserId}
            isSpeaking={true}
            className="w-full h-full"
          />
        </div>
        
        {/* Other Participants */}
        {others.length > 0 && (
          <div className="h-32 border-t border-slate-700">
            <div className="flex space-x-2 p-2 overflow-x-auto">
              <AnimatePresence>
                {others.map((participant) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-shrink-0 w-24 h-24"
                  >
                    <VideoTile
                      participant={participant}
                      isLocalUser={participant.id === localUserId}
                      isSpeaking={false}
                      className="w-full h-full"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  // Grid Layout
  return (
    <div className={`grid ${getGridClasses()} gap-4 p-4 h-full ${className}`}>
      <AnimatePresence>
        {participants.map((participant) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            layout
          >
            <VideoTile
              participant={participant}
              isLocalUser={participant.id === localUserId}
              isSpeaking={participant.id === speakingParticipant}
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default VideoGrid