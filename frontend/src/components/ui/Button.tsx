import { ComponentProps } from 'react'

type Props = ComponentProps<'button'> & { 
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  children,
  disabled,
  ...props 
}: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  }[size]
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md hover:shadow-lg hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500',
    secondary: 'border border-secondary-200 bg-white text-secondary-700 shadow-sm hover:shadow-md hover:bg-secondary-50 focus:ring-secondary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-200 dark:hover:bg-secondary-700',
    ghost: 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 focus:ring-secondary-500 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100',
    danger: 'bg-gradient-to-r from-error-600 to-error-700 text-white shadow-md hover:shadow-lg hover:from-error-700 hover:to-error-800 focus:ring-error-500',
    success: 'bg-gradient-to-r from-success-600 to-success-700 text-white shadow-md hover:shadow-lg hover:from-success-700 hover:to-success-800 focus:ring-success-500',
    warning: 'bg-gradient-to-r from-warning-600 to-warning-700 text-white shadow-md hover:shadow-lg hover:from-warning-700 hover:to-warning-800 focus:ring-warning-500',
  }[variant]

  return (
    <button 
      className={`${base} ${sizes} ${variants} ${className}`} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}
