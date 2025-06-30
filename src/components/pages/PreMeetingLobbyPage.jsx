import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import DeviceSelector from '@/components/molecules/DeviceSelector'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { meetingService } from '@/services/api/meetingService'

const PreMeetingLobbyPage = () => {
  const { roomCode } = useParams()
  const navigate = useNavigate()
  
  const [meeting, setMeeting] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  
  const [userSettings, setUserSettings] = useState({
    name: '',
    camera: '',
    microphone: '',
    videoEnabled: true,
    audioEnabled: true,
  })
  
  useEffect(() => {
    loadMeeting()
  }, [roomCode])
  
  const loadMeeting = async () => {
    setLoading(true)
    setError('')
    try {
      const meetingData = await meetingService.getMeetingByCode(roomCode)
      if (meetingData) {
        setMeeting(meetingData)
      } else {
        setError('Meeting not found')
      }
    } catch (err) {
      setError('Failed to load meeting')
    } finally {
      setLoading(false)
    }
  }
  
  const handleJoinMeeting = async () => {
    if (!userSettings.name.trim()) {
      toast.error('Please enter your name')
      return
    }
    
    setIsJoining(true)
    try {
      // Simulate joining process
      await new Promise(resolve => setTimeout(resolve, 2000))
      navigate(`/meeting/${roomCode}`, { 
        state: { userSettings } 
      })
    } catch (error) {
      toast.error('Failed to join meeting')
    } finally {
      setIsJoining(false)
    }
  }
  
  const toggleVideo = () => {
    setUserSettings(prev => ({
      ...prev,
      videoEnabled: !prev.videoEnabled
    }))
  }
  
  const toggleAudio = () => {
    setUserSettings(prev => ({
      ...prev,
      audioEnabled: !prev.audioEnabled
    }))
  }
  
  if (loading) return <Loading message="Loading meeting room..." />
  if (error) return <Error message={error} onRetry={loadMeeting} />
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Ready to join?
          </h1>
          <p className="text-slate-400">
            Room Code: <span className="text-primary font-mono font-medium">{roomCode}</span>
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {userSettings.videoEnabled ? (
                <>
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={32} className="text-white" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name="VideoOff" size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400">Camera is off</p>
                  </div>
                </div>
              )}
              
              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                <Button
                  variant={userSettings.videoEnabled ? 'secondary' : 'danger'}
                  size="md"
                  onClick={toggleVideo}
                  className="rounded-full p-3"
                >
                  <ApperIcon 
                    name={userSettings.videoEnabled ? 'Video' : 'VideoOff'} 
                    size={20}
                  />
                </Button>
                
                <Button
                  variant={userSettings.audioEnabled ? 'secondary' : 'danger'}
                  size="md"
                  onClick={toggleAudio}
                  className="rounded-full p-3"
                >
                  <ApperIcon 
                    name={userSettings.audioEnabled ? 'Mic' : 'MicOff'} 
                    size={20}
                  />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Settings Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-8 rounded-2xl space-y-6"
          >
            <div>
              <h2 className="text-xl font-display font-semibold text-white mb-6">
                Join Settings
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Your Name"
                  placeholder="Enter your name"
                  value={userSettings.name}
                  onChange={(e) => setUserSettings(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                />
                
                <DeviceSelector
                  type="camera"
                  selectedDevice={userSettings.camera}
                  onDeviceChange={(deviceId) => setUserSettings(prev => ({
                    ...prev,
                    camera: deviceId
                  }))}
                />
                
                <DeviceSelector
                  type="microphone"
                  selectedDevice={userSettings.microphone}
                  onDeviceChange={(deviceId) => setUserSettings(prev => ({
                    ...prev,
                    microphone: deviceId
                  }))}
                />
              </div>
            </div>
            
            {/* Meeting Info */}
            <div className="border-t border-slate-600 pt-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Meeting Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Room Code:</span>
                  <span className="text-white font-mono">{roomCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Participants:</span>
                  <span className="text-white">{meeting?.participants?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-success">Active</span>
                </div>
              </div>
            </div>
            
            {/* Join Button */}
            <Button
              variant="success"
              size="xl"
              onClick={handleJoinMeeting}
              disabled={isJoining || !userSettings.name.trim()}
              className="w-full"
            >
              {isJoining ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <ApperIcon name="Loader" size={20} />
                  </motion.div>
                  Joining Meeting...
                </>
              ) : (
                <>
                  <ApperIcon name="Video" size={20} className="mr-2" />
                  Join Meeting
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PreMeetingLobbyPage