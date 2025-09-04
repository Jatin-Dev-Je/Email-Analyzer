"use client"
import { useState } from 'react'
import { Button } from './Button'
import { useToast } from './ToastProvider'

export function CopyButton({ 
  text, 
  label = 'Copied!', 
  children,
  className = '',
  size = 'sm'
}: { 
  text: string
  label?: string
  children?: React.ReactNode
  className?: string
  size?: 'sm' | 'md'
}) {
  const { show } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!text) return
    
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      show(label, { variant: 'success' })
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      show('Failed to copy', { variant: 'error' })
    }
  }

  return (
    <Button
      onClick={handleCopy}
      variant="secondary"
      size={size}
      className={`transition-all duration-200 ${copied ? 'bg-success-100 text-success-700 border-success-200' : ''} ${className}`}
    >
      {copied ? (
        <>
          <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {children ?? 'Copy'}
        </>
      )}
    </Button>
  )
}
