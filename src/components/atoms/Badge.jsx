const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm',
  className = '' 
}) => {
  const variants = {
    default: 'bg-slate-600 text-slate-100',
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    error: 'bg-error/20 text-error border border-error/30',
    info: 'bg-info/20 text-info border border-info/30',
    online: 'bg-success text-white',
    offline: 'bg-slate-500 text-slate-100',
  }
  
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }
  
  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${variants[variant]} ${sizes[size]} ${className}
    `}>
      {children}
    </span>
  )
}

export default Badge