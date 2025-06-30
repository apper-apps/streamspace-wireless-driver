import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Header = () => {
  const location = useLocation()
  const isInMeeting = location.pathname.includes('/meeting/')
  
  // Don't show header in meeting room
  if (isInMeeting) return null
  
  const navItems = [
    { to: '/', label: 'Home', icon: 'Home' },
    { to: '/settings', label: 'Settings', icon: 'Settings' },
  ]
  
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass border-b border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Video" size={20} className="text-white" />
            </div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              StreamSpace
            </span>
          </NavLink>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-slate-300 hover:text-white hover:bg-surface/50'
                  }`
                }
              >
                <ApperIcon name={item.icon} size={16} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header