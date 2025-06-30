import { motion } from 'framer-motion'

const Loading = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-12 h-12 border-4 border-slate-600 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary rounded-full border-r-transparent animate-spin"></div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-slate-300 text-center"
      >
        {message}
      </motion.p>
      
      {/* Skeleton Content */}
      <div className="w-full max-w-md mt-8 space-y-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading