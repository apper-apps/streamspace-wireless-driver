import { useState, useEffect } from 'react'
import ApperIcon from '@/components/ApperIcon'

const DeviceSelector = ({ 
  type = 'camera', // 'camera', 'microphone', 'speaker'
  selectedDevice,
  onDeviceChange,
  className = ''
}) => {
  const [devices, setDevices] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const getDevices = async () => {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices()
        const filteredDevices = deviceList.filter(device => {
          switch (type) {
            case 'camera':
              return device.kind === 'videoinput'
            case 'microphone':
              return device.kind === 'audioinput'
            case 'speaker':
              return device.kind === 'audiooutput'
            default:
              return false
          }
        })
        setDevices(filteredDevices)
      } catch (error) {
        console.error('Error getting devices:', error)
      }
    }
    
    getDevices()
  }, [type])
  
  const getIcon = () => {
    switch (type) {
      case 'camera':
        return 'Video'
      case 'microphone':
        return 'Mic'
      case 'speaker':
        return 'Volume2'
      default:
        return 'Settings'
    }
  }
  
  const getLabel = () => {
    switch (type) {
      case 'camera':
        return 'Camera'
      case 'microphone':
        return 'Microphone'
      case 'speaker':
        return 'Speaker'
      default:
        return 'Device'
    }
  }
  
  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-slate-200 mb-2">
        {getLabel()}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-surface border border-slate-600 rounded-lg text-left text-slate-100 hover:border-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ApperIcon name={getIcon()} size={16} className="text-slate-400" />
              <span className="truncate">
                {selectedDevice 
                  ? devices.find(d => d.deviceId === selectedDevice)?.label || 'Unknown Device'
                  : `Select ${getLabel()}`
                }
              </span>
            </div>
            <ApperIcon 
              name="ChevronDown" 
              size={16} 
              className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-surface border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-auto">
            {devices.length === 0 ? (
              <div className="px-4 py-3 text-slate-400 text-sm">
                No {getLabel().toLowerCase()}s found
              </div>
            ) : (
              devices.map((device) => (
                <button
                  key={device.deviceId}
                  type="button"
                  onClick={() => {
                    onDeviceChange(device.deviceId)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-slate-600 transition-colors
                    ${selectedDevice === device.deviceId ? 'bg-primary/20 text-primary' : 'text-slate-100'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <ApperIcon name={getIcon()} size={16} />
                    <span className="truncate">{device.label || `${getLabel()} ${device.deviceId.slice(0, 8)}`}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DeviceSelector