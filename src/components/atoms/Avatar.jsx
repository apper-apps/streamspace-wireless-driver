import ApperIcon from '@/components/ApperIcon'

const Avatar = ({ 
  name = '', 
  src, 
  size = 'md',
  online = false,
  className = '' 
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  }
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  return (
    <div className={`relative ${className}`}>
      <div className={`
        ${sizes[size]} rounded-full flex items-center justify-center
        bg-gradient-to-br from-primary to-secondary text-white font-medium
        overflow-hidden
      `}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : name ? (
          getInitials(name)
        ) : (
          <ApperIcon name="User" className="w-1/2 h-1/2" />
        )}
      </div>
      {online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-background rounded-full"></div>
      )}
    </div>
  )
}

export default Avatar