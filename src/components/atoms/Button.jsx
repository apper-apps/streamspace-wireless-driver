import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 focus:ring-primary shadow-lg hover:shadow-primary/25',
    success: 'bg-gradient-to-r from-success to-emerald-600 text-white hover:from-success/90 hover:to-emerald-600/90 focus:ring-success shadow-lg hover:shadow-success/25',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white hover:from-error/90 hover:to-red-600/90 focus:ring-error shadow-lg hover:shadow-error/25',
    secondary: 'bg-surface text-slate-100 hover:bg-slate-600 focus:ring-slate-500 border border-slate-600 hover:border-slate-500',
    ghost: 'text-slate-300 hover:text-white hover:bg-surface/50 focus:ring-slate-500',
    outline: 'border border-primary text-primary hover:bg-primary/10 focus:ring-primary',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  }
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button