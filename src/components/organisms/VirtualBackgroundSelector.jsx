import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import backgroundService from '@/services/api/backgroundService'
import { toast } from 'react-toastify'

const VirtualBackgroundSelector = ({ 
  currentBackground,
  onBackgroundChange,
  onClose,
  className = '' 
}) => {
  const [backgrounds, setBackgrounds] = useState([])
  const [selectedBackground, setSelectedBackground] = useState(currentBackground || 'none')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const previewStreamRef = useRef(null)

  useEffect(() => {
    loadBackgrounds()
    initializePreview()
    
    return () => {
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const loadBackgrounds = async () => {
    try {
      setLoading(true)
      const data = await backgroundService.getAll()
      setBackgrounds(data)
    } catch (err) {
      setError('Failed to load backgrounds')
      toast.error('Failed to load virtual backgrounds')
    } finally {
      setLoading(false)
    }
  }

  const initializePreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      previewStreamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      toast.error('Unable to access camera for preview')
    }
  }

  const handleBackgroundSelect = (backgroundId) => {
    setSelectedBackground(backgroundId)
  }

  const handleApply = () => {
    onBackgroundChange(selectedBackground)
    toast.success('Virtual background applied')
    onClose()
  }

  const handleUploadCustom = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('background', file)
      
      const newBackground = await backgroundService.uploadCustom(formData)
      setBackgrounds(prev => [...prev, newBackground])
      toast.success('Custom background uploaded')
    } catch (err) {
      toast.error('Failed to upload background')
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <div className="glass w-full max-w-4xl rounded-lg shadow-2xl p-8">
          <div className="flex items-center justify-center">
            <ApperIcon name="Loader2" size={32} className="animate-spin text-slate-400" />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div className={`glass w-full max-w-4xl rounded-lg shadow-2xl ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600">
          <h3 className="text-xl font-display font-semibold text-slate-100">
            Virtual Backgrounds
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ApperIcon name="X" size={16} />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Preview */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-slate-200">Preview</h4>
              <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ display: selectedBackground === 'none' ? 'none' : 'block' }}
                />
                <div className="absolute bottom-2 left-2">
                  <div className="glass px-2 py-1 rounded text-xs text-slate-200">
                    {selectedBackground === 'none' ? 'No Background' : 
                     selectedBackground === 'blur' ? 'Blur Effect' : 'Custom Background'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Options */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-slate-200">Backgrounds</h4>
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadCustom}
                    className="hidden"
                  />
                  <Button variant="secondary" size="sm" className="cursor-pointer">
                    <ApperIcon name="Upload" size={16} className="mr-2" />
                    Upload Custom
                  </Button>
                </label>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
                {/* No Background Option */}
                <div
                  className={`
                    relative aspect-video rounded-lg border-2 cursor-pointer transition-all
                    ${selectedBackground === 'none' 
                      ? 'border-primary ring-2 ring-primary/50' 
                      : 'border-slate-600 hover:border-slate-500'}
                  `}
                  onClick={() => handleBackgroundSelect('none')}
                >
                  <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center">
                    <ApperIcon name="VideoOff" size={24} className="text-slate-400" />
                  </div>
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="text-xs text-center text-slate-200 bg-black/50 rounded px-1">
                      None
                    </div>
                  </div>
                </div>
                
                {/* Background Options */}
                {backgrounds.map((background) => (
                  <div
                    key={background.Id}
                    className={`
                      relative aspect-video rounded-lg border-2 cursor-pointer transition-all
                      ${selectedBackground === background.Id 
                        ? 'border-primary ring-2 ring-primary/50' 
                        : 'border-slate-600 hover:border-slate-500'}
                    `}
                    onClick={() => handleBackgroundSelect(background.Id)}
                  >
                    {background.type === 'blur' ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <ApperIcon name="Sparkles" size={24} className="text-slate-200" />
                      </div>
                    ) : (
                      <img
                        src={background.url}
                        alt={background.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="text-xs text-center text-slate-200 bg-black/50 rounded px-1 truncate">
                        {background.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-slate-600">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply Background
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default VirtualBackgroundSelector