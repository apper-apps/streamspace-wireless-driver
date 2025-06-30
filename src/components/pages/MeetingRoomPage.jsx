import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import VideoGrid from '@/components/organisms/VideoGrid'
import MeetingControls from '@/components/molecules/MeetingControls'
import ChatPanel from '@/components/organisms/ChatPanel'
import ParticipantsPanel from '@/components/organisms/ParticipantsPanel'
import MeetingSettings from '@/components/organisms/MeetingSettings'
import Loading from '@/components/ui/Loading'
import { meetingService } from '@/services/api/meetingService'
import { participantService } from '@/services/api/participantService'
import { chatService } from '@/services/api/chatService'

const MeetingRoomPage = () => {
  const { roomCode } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const userSettings = location.state?.userSettings
  
  const [meeting, setMeeting] = useState(null)
  const [participants, setParticipants] = useState([])
  const [messages, setMessages] = useState([])
  const [currentUserId] = useState('user-' + Date.now())
  const [speakingParticipant, setSpeakingParticipant] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Control states
  const [isAudioEnabled, setIsAudioEnabled] = useState(userSettings?.audioEnabled || true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(userSettings?.videoEnabled || true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [layout, setLayout] = useState('grid') // 'grid' or 'speaker'
  
  // Panel states
  const [showChat, setShowChat] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  useEffect(() => {
    if (!userSettings) {
      navigate(`/lobby/${roomCode}`)
      return
    }
    
    initializeMeeting()
  }, [roomCode, userSettings])
  
  const initializeMeeting = async () => {
    setLoading(true)
    try {
      // Load meeting data
      const meetingData = await meetingService.getMeetingByCode(roomCode)
      setMeeting(meetingData)
      
      // Add current user as participant
      const newParticipant = {
        id: currentUserId,
        name: userSettings.name,
        videoEnabled: isVideoEnabled,
        audioEnabled: isAudioEnabled,
        isScreenSharing: false,
        connectionQuality: 'excellent'
      }
      
      const updatedParticipants = await participantService.addParticipant(meetingData.id, newParticipant)
      setParticipants(updatedParticipants)
      
      // Load existing messages
      const existingMessages = await chatService.getMessages(meetingData.id)
      setMessages(existingMessages)
      
      toast.success('Joined meeting successfully!')
      
      // Simulate speaking detection
      setTimeout(() => {
        const randomInterval = setInterval(() => {
          const activeSpeaker = Math.random() > 0.7 ? 
            updatedParticipants[Math.floor(Math.random() * updatedParticipants.length)]?.id : null
          setSpeakingParticipant(activeSpeaker)
        }, 3000)
        
        return () => clearInterval(randomInterval)
      }, 2000)
      
    } catch (error) {
      toast.error('Failed to join meeting')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }
  
  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled)
    toast.info(isAudioEnabled ? 'Microphone muted' : 'Microphone unmuted')
  }
  
  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled)
    toast.info(isVideoEnabled ? 'Camera turned off' : 'Camera turned on')
  }
  
  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    toast.info(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started')
  }
  
  const handleSendMessage = async (content) => {
    try {
      const newMessage = await chatService.sendMessage(meeting.id, {
        senderId: currentUserId,
        senderName: userSettings.name,
        content,
        timestamp: new Date().toISOString(),
        type: 'text'
      })
      setMessages(prev => [...prev, newMessage])
    } catch (error) {
      toast.error('Failed to send message')
    }
  }
  
  const handleRemoveParticipant = async (participantId) => {
    try {
      const updatedParticipants = await participantService.removeParticipant(meeting.id, participantId)
      setParticipants(updatedParticipants)
      toast.success('Participant removed')
    } catch (error) {
      toast.error('Failed to remove participant')
    }
  }
  
  const handleLeaveMeeting = () => {
    const confirmLeave = window.confirm('Are you sure you want to leave the meeting?')
    if (confirmLeave) {
      toast.info('Left meeting')
      navigate('/')
    }
  }
  
  const handleSettingsChange = (newSettings) => {
    // Update device settings
    console.log('Settings updated:', newSettings)
  }
  
  if (loading) {
    return <Loading message="Joining meeting..." />
  }
  
  return (
    <div className="h-screen bg-background overflow-hidden relative">
      {/* Meeting Header */}
      <div className="absolute top-4 left-4 glass px-4 py-2 rounded-lg z-10">
        <h2 className="text-sm font-medium text-white">
          Room: <span className="text-primary font-mono">{roomCode}</span>
        </h2>
      </div>
      
      {/* Layout Toggle */}
      <div className="absolute top-4 right-4 glass px-3 py-2 rounded-lg z-10 flex space-x-2">
        <button
          onClick={() => setLayout('grid')}
          className={`p-2 rounded ${layout === 'grid' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Grid
        </button>
        <button
          onClick={() => setLayout('speaker')}
          className={`p-2 rounded ${layout === 'speaker' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
        >
          Speaker
        </button>
      </div>
      
      {/* Video Grid */}
      <VideoGrid
        participants={participants}
        localUserId={currentUserId}
        speakingParticipant={speakingParticipant}
        layout={layout}
        className="h-full"
      />
      
      {/* Meeting Controls */}
      <MeetingControls
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        isScreenSharing={isScreenSharing}
        onToggleAudio={handleToggleAudio}
        onToggleVideo={handleToggleVideo}
        onToggleScreenShare={handleToggleScreenShare}
        onShowChat={() => setShowChat(true)}
        onShowParticipants={() => setShowParticipants(true)}
        onShowSettings={() => setShowSettings(true)}
        onLeaveMeeting={handleLeaveMeeting}
      />
      
      {/* Side Panels */}
      <AnimatePresence>
        {showChat && (
          <ChatPanel
            messages={messages}
            currentUserId={currentUserId}
            onSendMessage={handleSendMessage}
            onClose={() => setShowChat(false)}
          />
        )}
        
        {showParticipants && (
          <ParticipantsPanel
            participants={participants}
            hostId={meeting?.hostId}
            currentUserId={currentUserId}
            onRemoveParticipant={handleRemoveParticipant}
            onClose={() => setShowParticipants(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <MeetingSettings
            currentSettings={{
              camera: userSettings?.camera || '',
              microphone: userSettings?.microphone || '',
              speaker: ''
            }}
            onSettingsChange={handleSettingsChange}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default MeetingRoomPage