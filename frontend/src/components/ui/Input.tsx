import { ComponentProps, forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(({ className = '', ...props }, ref) => (
  <input ref={ref} className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none ${className}`} {...props} />
))
Input.displayName = 'Input'
