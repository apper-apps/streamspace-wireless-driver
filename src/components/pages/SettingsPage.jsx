import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import DeviceSelector from '@/components/molecules/DeviceSelector'
import ApperIcon from '@/components/ApperIcon'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    displayName: 'John Doe',
    camera: '',
    microphone: '',
    speaker: '',
    videoQuality: 'hd',
    autoJoinAudio: true,
    autoJoinVideo: true,
    notifications: true,
    theme: 'dark'
  })
  
  const [hasChanges, setHasChanges] = useState(false)
  
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
    setHasChanges(true)
  }
  
  const handleSaveSettings = () => {
    // Save settings to localStorage or API
    localStorage.setItem('streamspace-settings', JSON.stringify(settings))
    toast.success('Settings saved successfully!')
    setHasChanges(false)
  }
  
  const handleResetSettings = () => {
    const confirmReset = window.confirm('Are you sure you want to reset all settings to default?')
    if (confirmReset) {
      setSettings({
        displayName: 'John Doe',
        camera: '',
        microphone: '',
        speaker: '',
        videoQuality: 'hd',
        autoJoinAudio: true,
        autoJoinVideo: true,
        notifications: true,
        theme: 'dark'
      })
      setHasChanges(true)
      toast.info('Settings reset to default')
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Settings
          </h1>
          <p className="text-slate-400">
            Configure your video conferencing preferences
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass p-6 rounded-2xl"
            >
              <h2 className="text-xl font-display font-semibold text-white mb-6">
                Personal Settings
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Display Name"
                  value={settings.displayName}
                  onChange={(e) => handleSettingChange('displayName', e.target.value)}
                  placeholder="Enter your display name"
                />
              </div>
            </motion.div>
            
            {/* Device Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass p-6 rounded-2xl"
            >
              <h2 className="text-xl font-display font-semibold text-white mb-6">
                Device Settings
              </h2>
              
              <div className="space-y-4">
                <DeviceSelector
                  type="camera"
                  selectedDevice={settings.camera}
                  onDeviceChange={(deviceId) => handleSettingChange('camera', deviceId)}
                />
                
                <DeviceSelector
                  type="microphone"
                  selectedDevice={settings.microphone}
                  onDeviceChange={(deviceId) => handleSettingChange('microphone', deviceId)}
                />
                
                <DeviceSelector
                  type="speaker"
                  selectedDevice={settings.speaker}
                  onDeviceChange={(deviceId) => handleSettingChange('speaker', deviceId)}
                />
              </div>
            </motion.div>
            
            {/* Video Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-6 rounded-2xl"
            >
              <h2 className="text-xl font-display font-semibold text-white mb-6">
                Video Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Video Quality
                  </label>
                  <select
                    value={settings.videoQuality}
                    onChange={(e) => handleSettingChange('videoQuality', e.target.value)}
                    className="w-full px-4 py-3 bg-surface border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  >
                    <option value="sd">SD (480p)</option>
                    <option value="hd">HD (720p)</option>
                    <option value="fhd">Full HD (1080p)</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-slate-200">
                      Auto-join with audio
                    </label>
                    <p className="text-xs text-slate-400">
                      Automatically unmute when joining meetings
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoJoinAudio', !settings.autoJoinAudio)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoJoinAudio ? 'bg-primary' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoJoinAudio ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-slate-200">
                      Auto-join with video
                    </label>
                    <p className="text-xs text-slate-400">
                      Automatically turn on camera when joining meetings
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoJoinVideo', !settings.autoJoinVideo)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoJoinVideo ? 'bg-primary' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoJoinVideo ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-6 rounded-2xl"
            >
              <h2 className="text-xl font-display font-semibold text-white mb-6">
                Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-slate-200">
                      Enable notifications
                    </label>
                    <p className="text-xs text-slate-400">
                      Receive notifications for meeting events
                    </p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('notifications', !settings.notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications ? 'bg-primary' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Video Preview & Actions */}
          <div className="space-y-6">
            {/* Video Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass p-6 rounded-2xl"
            >
              <h3 className="text-lg font-display font-semibold text-white mb-4">
                Camera Preview
              </h3>
              
              <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden mb-4">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <ApperIcon name="User" size={24} className="text-white" />
                  </div>
                </div>
              </div>
              
              <Button variant="secondary" size="sm" className="w-full">
                <ApperIcon name="RotateCcw" size={16} className="mr-2" />
                Test Camera
              </Button>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleSaveSettings}
                disabled={!hasChanges}
                className="w-full"
              >
                <ApperIcon name="Save" size={16} className="mr-2" />
                Save Settings
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={handleResetSettings}
                className="w-full"
              >
                <ApperIcon name="RotateCcw" size={16} className="mr-2" />
                Reset to Default
              </Button>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass p-4 rounded-xl"
            >
              <h4 className="text-sm font-medium text-slate-200 mb-3">
                Connection Status
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Network Quality:</span>
                  <span className="text-success">Excellent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Video Quality:</span>
                  <span className="text-white">{settings.videoQuality.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Audio Device:</span>
                  <span className="text-white">Ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage