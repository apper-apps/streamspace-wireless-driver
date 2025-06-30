import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import DeviceSelector from '@/components/molecules/DeviceSelector'
import ApperIcon from '@/components/ApperIcon'

const MeetingSettings = ({ 
  currentSettings,
  onSettingsChange,
  onClose,
  className = '' 
}) => {
  const [settings, setSettings] = useState({
    camera: currentSettings.camera || '',
    microphone: currentSettings.microphone || '',
    speaker: currentSettings.speaker || '',
    ...currentSettings
  })
  
  const handleDeviceChange = (deviceType, deviceId) => {
    const newSettings = {
      ...settings,
      [deviceType]: deviceId
    }
    setSettings(newSettings)
    onSettingsChange(newSettings)
  }
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div className={`glass w-full max-w-md rounded-lg shadow-2xl ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600">
          <h3 className="text-xl font-display font-semibold text-slate-100">
            Meeting Settings
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ApperIcon name="X" size={16} />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Device Settings */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-slate-200">Devices</h4>
            
            <DeviceSelector
              type="camera"
              selectedDevice={settings.camera}
              onDeviceChange={(deviceId) => handleDeviceChange('camera', deviceId)}
            />
            
            <DeviceSelector
              type="microphone"
              selectedDevice={settings.microphone}
              onDeviceChange={(deviceId) => handleDeviceChange('microphone', deviceId)}
            />
            
            <DeviceSelector
              type="speaker"
              selectedDevice={settings.speaker}
              onDeviceChange={(deviceId) => handleDeviceChange('speaker', deviceId)}
            />
          </div>
          
          {/* Video Preview */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-slate-200">Camera Preview</h4>
            <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ApperIcon name="Video" size={48} className="text-slate-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-slate-600">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose}>
            Apply Settings
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default MeetingSettings