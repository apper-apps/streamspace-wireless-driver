import Avatar from '@/components/atoms/Avatar'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const ParticipantListItem = ({ 
  participant, 
  isHost = false, 
  isCurrentUser = false,
  onRemove 
}) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-surface/50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <Avatar 
          name={participant.name}
          online={true}
          size="sm"
        />
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-100">
              {participant.name}
              {isCurrentUser && ' (You)'}
            </span>
            {isHost && (
              <Badge variant="success" size="xs">
                Host
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <ApperIcon 
              name={participant.audioEnabled ? 'Mic' : 'MicOff'} 
              size={12}
              className={participant.audioEnabled ? 'text-success' : 'text-error'}
            />
            <ApperIcon 
              name={participant.videoEnabled ? 'Video' : 'VideoOff'} 
              size={12}
              className={participant.videoEnabled ? 'text-success' : 'text-error'}
            />
            <Badge 
              variant={
                participant.connectionQuality === 'excellent' ? 'success' :
                participant.connectionQuality === 'good' ? 'info' :
                participant.connectionQuality === 'poor' ? 'warning' : 'error'
              }
              size="xs"
            >
              {participant.connectionQuality}
            </Badge>
          </div>
        </div>
      </div>
      
      {isHost && !isCurrentUser && onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(participant.id)}
          className="text-error hover:text-error hover:bg-error/10"
        >
          <ApperIcon name="UserX" size={16} />
        </Button>
      )}
    </div>
  )
}

export default ParticipantListItem