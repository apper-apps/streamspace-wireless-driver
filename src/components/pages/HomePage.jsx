import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { meetingService } from '@/services/api/meetingService'

const HomePage = () => {
  const navigate = useNavigate()
  const [joinCode, setJoinCode] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  
  const handleCreateMeeting = async () => {
    setIsCreating(true)
    try {
      const meeting = await meetingService.createMeeting()
      toast.success('Meeting room created successfully!')
      navigate(`/lobby/${meeting.roomCode}`)
    } catch (error) {
      toast.error('Failed to create meeting room')
    } finally {
      setIsCreating(false)
    }
  }
  
  const handleJoinMeeting = async (e) => {
    e.preventDefault()
    if (!joinCode.trim()) {
      toast.error('Please enter a meeting code')
      return
    }
    
    setIsJoining(true)
    try {
      const meeting = await meetingService.getMeetingByCode(joinCode.trim())
      if (meeting) {
        navigate(`/lobby/${joinCode.trim()}`)
      } else {
        toast.error('Meeting not found')
      }
    } catch (error) {
      toast.error('Failed to join meeting')
    } finally {
      setIsJoining(false)
    }
  }
  
  const recentMeetings = [
    { id: 1, name: 'Daily Standup', code: 'DSU-123', date: '2024-01-15' },
    { id: 2, name: 'Project Review', code: 'PRV-456', date: '2024-01-14' },
    { id: 3, name: 'Client Meeting', code: 'CLT-789', date: '2024-01-13' },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Connect
            </span>{' '}
            <span className="text-white">
              Without Limits
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Experience seamless video conferencing with crystal-clear quality, 
            powerful collaboration tools, and an interface designed for focus.
          </p>
        </motion.div>
        
        {/* Main Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Create Meeting */}
          <div className="glass p-8 rounded-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Plus" size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-2">
                Start New Meeting
              </h3>
              <p className="text-slate-400">
                Create an instant meeting room and invite others
              </p>
            </div>
            
            <Button
              variant="success"
              size="xl"
              onClick={handleCreateMeeting}
              disabled={isCreating}
              className="w-full"
            >
              {isCreating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <ApperIcon name="Loader" size={16} />
                  </motion.div>
                  Creating Room...
                </>
              ) : (
                <>
                  <ApperIcon name="Video" size={20} className="mr-2" />
                  New Meeting
                </>
              )}
            </Button>
          </div>
          
          {/* Join Meeting */}
          <div className="glass p-8 rounded-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="LogIn" size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-2">
                Join Meeting
              </h3>
              <p className="text-slate-400">
                Enter a meeting code to join an existing room
              </p>
            </div>
            
            <form onSubmit={handleJoinMeeting} className="space-y-4">
              <Input
                placeholder="Enter meeting code (e.g., ABC-123)"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="text-center text-lg"
              />
              <Button
                type="submit"
                variant="primary"
                size="xl"
                disabled={isJoining || !joinCode.trim()}
                className="w-full"
              >
                {isJoining ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <ApperIcon name="Loader" size={16} />
                    </motion.div>
                    Joining...
                  </>
                ) : (
                  <>
                    <ApperIcon name="ArrowRight" size={20} className="mr-2" />
                    Join Meeting
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
        
        {/* Recent Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-display font-semibold text-white mb-6">
            Recent Meetings
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentMeetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass p-6 rounded-xl hover:bg-surface/80 transition-all duration-200 cursor-pointer group"
                onClick={() => {
                  setJoinCode(meeting.code)
                  handleJoinMeeting({ preventDefault: () => {} })
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white group-hover:text-primary transition-colors">
                    {meeting.name}
                  </h3>
                  <ApperIcon 
                    name="ArrowUpRight" 
                    size={16} 
                    className="text-slate-400 group-hover:text-primary transition-colors"
                  />
                </div>
                <p className="text-sm text-slate-400 mb-2">{meeting.code}</p>
                <p className="text-xs text-slate-500">{meeting.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Zap" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-slate-400">
              Connect instantly with optimized WebRTC technology
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-success to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Shield" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white mb-2">
              Secure & Private
            </h3>
            <p className="text-slate-400">
              End-to-end encryption keeps your conversations private
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-info to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Users" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white mb-2">
              Team Collaboration
            </h3>
            <p className="text-slate-400">
              Screen sharing, chat, and seamless team interaction
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage