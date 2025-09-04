import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Footer } from './Footer'
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext'

function AppShellContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()
  
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-secondary-50 to-white dark:from-secondary-900 dark:to-secondary-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className={`flex-1 py-8 px-4 sm:px-6 transition-all duration-300 ${
          isCollapsed ? 'md:ml-0' : 'md:ml-0'
        }`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppShellContent>{children}</AppShellContent>
    </SidebarProvider>
  )
}
