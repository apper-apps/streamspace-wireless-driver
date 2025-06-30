import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading the content.", 
  onRetry,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="w-16 h-16 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name="AlertCircle" size={32} className="text-white" />
      </motion.div>
      
      <h3 className="text-xl font-display font-semibold text-slate-100 mb-2">
        {title}
      </h3>
      
      <p className="text-slate-400 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error