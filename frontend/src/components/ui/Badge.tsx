type BadgeProps = {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'secondary'
  size?: 'sm' | 'md'
}

export function Badge({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'sm'
}: BadgeProps) {
  const base = 'inline-flex items-center rounded-full font-medium transition-colors'
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  }[size]
  
  const variants = {
    default: 'border border-secondary-200 bg-secondary-100 text-secondary-700 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-300',
    primary: 'border border-primary-200 bg-primary-100 text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
    success: 'border border-success-200 bg-success-100 text-success-700 dark:border-success-800 dark:bg-success-900/30 dark:text-success-400',
    warning: 'border border-warning-200 bg-warning-100 text-warning-700 dark:border-warning-800 dark:bg-warning-900/30 dark:text-warning-400',
    error: 'border border-error-200 bg-error-100 text-error-700 dark:border-error-800 dark:bg-error-900/30 dark:text-error-400',
    secondary: 'border border-secondary-200 bg-secondary-50 text-secondary-600 dark:border-secondary-700 dark:bg-secondary-800/50 dark:text-secondary-400'
  }[variant]

  return (
    <span className={`${base} ${sizes} ${variants} ${className}`}>
      {children}
    </span>
  )
}
