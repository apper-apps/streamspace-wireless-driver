import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ParticipantListItem from '@/components/molecules/ParticipantListItem'
import ApperIcon from '@/components/ApperIcon'

const ParticipantsPanel = ({ 
  participants, 
  hostId, 
  currentUserId, 
  onRemoveParticipant, 
  onClose,
  className = '' 
}) => {
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
          Participants ({participants.length})
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ApperIcon name="X" size={16} />
        </Button>
      </div>
      
      {/* Participants List */}
      <div className="flex-1 overflow-y-auto">
        {participants.map((participant) => (
          <ParticipantListItem
            key={participant.id}
            participant={participant}
            isHost={participant.id === hostId}
            isCurrentUser={participant.id === currentUserId}
            onRemove={currentUserId === hostId ? onRemoveParticipant : null}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default ParticipantsPanel