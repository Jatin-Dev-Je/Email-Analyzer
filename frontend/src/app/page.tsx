"use client"
import Link from 'next/link'
import useSWR from 'swr'
import { InfoCard } from '@/components/InfoCard'
import { Loader } from '@/components/Loader'
import { fetcher } from '@/lib/fetcher'
import { useToast } from '@/components/ui/ToastProvider'
import { AppShell } from '@/components/AppShell'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CopyButton } from '@/components/ui/CopyButton'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmailIcon, ServerIcon, ShieldIcon, ZapIcon, GlobeIcon } from '@/components/ui/Icons'

export default function Home() {
  const { data, isLoading } = useSWR('/api/email/config', fetcher)
  const { show } = useToast()

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text)
    show(`${label} copied to clipboard`, { variant: 'success' })
  }
  
  return (
    <AppShell>
      <div className="animate-fade-in">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">MailTrace</h1>
                <p className="text-primary-100">Professional Email Analysis</p>
              </div>
            </div>
            <h2 className="mb-4 text-2xl font-semibold">Analyze Email Headers with Precision</h2>
            <p className="mb-6 max-w-2xl text-lg text-primary-100">
              Send a test email to our address and we'll automatically detect the receiving chain and identify the sender's ESP (Email Service Provider) using advanced IMAP analysis.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-white/20 text-white border-white/30">IMAP-based</Badge>
              <Badge className="bg-white/20 text-white border-white/30">Real-time analysis</Badge>
              <Badge className="bg-white/20 text-white border-white/30">Enterprise-grade</Badge>
              <Badge className="bg-white/20 text-white border-white/30">Privacy-first</Badge>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-white/5"></div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {isLoading && (
            <div className="col-span-full flex justify-center py-12">
              <Loader label="Loading test email details..." />
            </div>
          )}
          
          <InfoCard 
            title="Test Email Address" 
            subtitle="Send your test email to this address"
            icon={<EmailIcon className="w-5 h-5" />}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                <code className="font-mono text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  {data?.emailAddress ?? 'Loading...'}
                </code>
                <CopyButton text={data?.emailAddress || ''} className="ml-3">
                  Copy
                </CopyButton>
              </div>
              <p className="text-xs text-secondary-600 dark:text-secondary-400">
                This is your unique test email address. All emails sent here will be automatically analyzed.
              </p>
            </div>
          </InfoCard>
          
          <InfoCard 
            title="Subject Line" 
            subtitle="Use this exact subject for identification"
            icon={<ServerIcon className="w-5 h-5" />}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                <code className="font-mono text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  {data?.subject ?? 'Loading...'}
                </code>
                <CopyButton text={data?.subject || ''} className="ml-3">
                  Copy
                </CopyButton>
              </div>
              <p className="text-xs text-secondary-600 dark:text-secondary-400">
                We use this subject line to identify and process your specific test email.
              </p>
            </div>
          </InfoCard>
        </div>

        {/* Call to Action */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-success-50 to-primary-50 p-6 dark:from-success-900/20 dark:to-primary-900/20">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                Ready to analyze your email?
              </h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Send your test email and click below to view the detailed analysis results.
              </p>
            </div>
            <Link 
              href="/results" 
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <span>View Results</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <DashboardStats />
      </div>
    </AppShell>
  )
}

function DashboardStats() {
  const { data, error, isLoading } = (require('swr') as typeof import('swr')).default('/api/stats', (url: string) => fetch(url).then(r=>r.json()))
  
  const stats = [
    {
      icon: <ZapIcon className="w-6 h-6" />,
      title: 'Processing Speed',
      value: isLoading ? <Skeleton className="h-6 w-16" /> : `~${Math.round((data?.avgProcessingMs ?? 1800)/100)/10}s`,
      description: 'Average analysis time',
      color: 'from-warning-500 to-warning-600',
      bgColor: 'bg-warning-50 dark:bg-warning-900/20'
    },
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: 'Privacy First',
      value: 'Headers Only',
      description: 'No content analysis',
      color: 'from-success-500 to-success-600',
      bgColor: 'bg-success-50 dark:bg-success-900/20'
    },
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: 'ESP Coverage',
      value: isLoading ? <Skeleton className="h-6 w-10" /> : `${data?.supportedEsps ?? 8}+`,
      description: 'Supported providers',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20'
    }
  ]

  return (
    <div className="mt-12">
      <h3 className="mb-6 text-xl font-semibold text-secondary-900 dark:text-secondary-100">
        System Performance
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg ${stat.bgColor}`}
          >
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/80 shadow-sm dark:bg-secondary-800/80">
                  {stat.icon}
                </div>
                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${stat.color}`}></div>
              </div>
              <h4 className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                {stat.title}
              </h4>
              <div className="mt-1 text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                {stat.value}
              </div>
              <p className="mt-2 text-xs text-secondary-500 dark:text-secondary-500">
                {stat.description}
              </p>
            </div>
            {/* Subtle gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}
