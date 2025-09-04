"use client"
import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { MenuIcon } from '@/components/ui/Icons'

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <button
        className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-secondary-200 bg-white text-secondary-600 hover:bg-secondary-50 transition-colors duration-200 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-400 dark:hover:bg-secondary-700"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <MenuIcon className="w-5 h-5" />
      </button>
      
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div 
            className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl dark:bg-secondary-900 animate-slide-down" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                  <span className="text-sm font-bold">M</span>
                </div>
                <span className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">MailTrace</span>
              </div>
              <button 
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-100 text-secondary-600 hover:bg-secondary-200 transition-colors duration-200 dark:bg-secondary-800 dark:text-secondary-400 dark:hover:bg-secondary-700" 
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(100vh-80px)] overflow-y-auto">
              <Sidebar variant="mobile" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
