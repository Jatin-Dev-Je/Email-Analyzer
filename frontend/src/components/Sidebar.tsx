"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarContext'
import { HomeIcon, ChartIcon, SettingsIcon, ChevronLeftIcon, StatusIcon } from '@/components/ui/Icons'
import type { Route } from 'next'

const groups: { label: string; items: { href: Route; label: string; icon: React.ComponentType<any>; description?: string }[] }[] = [
  {
    label: 'Analysis',
    items: [
      { href: '/' as Route, label: 'Dashboard', icon: HomeIcon, description: 'Overview & setup' },
      { href: '/results' as Route, label: 'Results', icon: ChartIcon, description: 'Email analysis' },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { href: '/settings' as Route, label: 'Settings', icon: SettingsIcon, description: 'System preferences' },
    ],
  },
]

export function Sidebar({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const pathname = usePathname()
  const { isCollapsed, toggleSidebar } = useSidebar()
  
  const wrapperClass = variant === 'desktop'
    ? `hidden md:block border-r border-secondary-200/50 bg-white/95 backdrop-blur-md dark:border-secondary-700/50 dark:bg-secondary-900/95 transition-all duration-300 ${
        isCollapsed ? 'md:w-16' : 'md:w-64'
      }`
    : 'block w-full bg-white dark:bg-secondary-900'

  return (
    <aside className={wrapperClass}>
      <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-secondary-200/50 dark:border-secondary-700/50">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                <span className="text-xs font-bold">M</span>
              </div>
              <span className="text-sm font-semibold text-secondary-900 dark:text-secondary-100">MailTrace</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-100 text-secondary-600 hover:bg-secondary-200 transition-colors duration-200 dark:bg-secondary-800 dark:text-secondary-400 dark:hover:bg-secondary-700"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeftIcon className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="p-4">
          <nav className="flex flex-col gap-2">
            {groups.map((group) => (
              <div key={group.label}>
                {!isCollapsed && (
                  <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
                    {group.label}
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href
                    const IconComponent = item.icon
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
                          active 
                            ? 'bg-primary-50 text-primary-700 shadow-sm dark:bg-primary-900/30 dark:text-primary-400' 
                            : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100'
                        }`}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
                          active 
                            ? 'bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-400' 
                            : 'bg-secondary-100 text-secondary-600 group-hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-400 dark:group-hover:bg-secondary-700'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        
                        {!isCollapsed && (
                          <>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-secondary-500 dark:text-secondary-500 truncate">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            {active && (
                              <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                            )}
                          </>
                        )}
                        
                        {/* Active indicator for collapsed state */}
                        {isCollapsed && active && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-primary-500"></div>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
          
          {/* Footer section */}
          <div className="mt-8 border-t border-secondary-200 pt-6 dark:border-secondary-700">
            {!isCollapsed ? (
              <div className="px-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-secondary-500 dark:text-secondary-400 mb-3">
                  System Status
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-success-50 px-3 py-2 dark:bg-success-900/20">
                  <StatusIcon className="w-2 h-2 text-success-500" />
                  <span className="text-xs font-medium text-success-700 dark:text-success-400">
                    All systems operational
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-100 dark:bg-success-900/30">
                  <StatusIcon className="w-3 h-3 text-success-500" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
