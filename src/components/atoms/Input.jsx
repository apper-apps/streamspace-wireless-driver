const Input = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-200">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 bg-surface border border-slate-600 rounded-lg 
          text-slate-100 placeholder-slate-400
          focus:ring-2 focus:ring-primary focus:border-transparent
          transition-all duration-200
          ${error ? 'border-error focus:ring-error' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default Input