import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { cookies } from 'next/headers'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'MailTrace — Professional Email Analysis',
  description: 'Advanced IMAP-based email header analysis to detect ESP and receiving chain with enterprise-grade precision',
  keywords: ['email analysis', 'IMAP', 'ESP detection', 'email headers', 'receiving chain'],
  authors: [{ name: 'MailTrace Team' }],
  openGraph: {
    title: 'MailTrace — Professional Email Analysis',
    description: 'Advanced IMAP-based email header analysis to detect ESP and receiving chain',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get('theme')?.value
  const isDark = theme === 'dark'
  
  return (
    <html lang="en" className={`h-full ${isDark ? 'dark' : ''}`}>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-full antialiased`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
