import Link from 'next/link'
import { MobileSidebar } from './MobileSidebar'
import { ConnectionStatus } from './ConnectionStatus'

export function Header() {
  
  return (
    <header className="sticky top-0 z-20 border-b border-secondary-200/50 bg-white/90 backdrop-blur-md dark:border-secondary-700/50 dark:bg-secondary-900/90">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <MobileSidebar />
          
          <Link href="/" className="group flex items-center gap-3 font-bold tracking-tight transition-all duration-200 hover:scale-105">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <span className="text-sm font-bold">M</span>
            </div>
            <span className="text-xl text-gradient">MailTrace</span>
          </Link>
        </div>
        
        <nav className="hidden items-center gap-1 sm:flex">
          <Link 
            href="/" 
            className="rounded-lg px-4 py-2 text-sm font-medium text-secondary-600 transition-all duration-200 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100"
          >
            Dashboard
          </Link>
          <Link 
            href="/results" 
            className="rounded-lg px-4 py-2 text-sm font-medium text-secondary-600 transition-all duration-200 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100"
          >
            Results
          </Link>
          <Link 
            href="/settings" 
            className="rounded-lg px-4 py-2 text-sm font-medium text-secondary-600 transition-all duration-200 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100"
          >
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ConnectionStatus />
          
          <a 
            href="https://github.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="hidden items-center gap-2 rounded-lg border border-secondary-200 px-3 py-2 text-sm font-medium text-secondary-600 transition-all duration-200 hover:bg-secondary-50 hover:text-secondary-900 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100 sm:flex"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          
          <button
            onClick={() => {
              const root = document.documentElement
              const nowDark = !root.classList.contains('dark')
              root.classList.toggle('dark', nowDark)
              // persist in cookie via API
              fetch('/api/prefs', { method: 'POST', body: JSON.stringify({ theme: nowDark ? 'dark' : 'light' }) })
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-secondary-200 bg-white text-secondary-600 transition-all duration-200 hover:bg-secondary-50 hover:text-secondary-900 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-secondary-100"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
