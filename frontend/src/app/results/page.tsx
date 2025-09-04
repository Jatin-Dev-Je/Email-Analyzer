"use client"
import useSWR from 'swr'
import { Timeline } from '@/components/Timeline'
import { ESPBadge } from '@/components/esp/ESPBadge'
import { Loader } from '@/components/Loader'
import { fetcher } from '@/lib/fetcher'
import { AppShell } from '@/components/AppShell'
import { Tabs } from '@/components/ui/Tabs'
import { EmptyState } from '@/components/ui/EmptyState'
import { ServerIcon, EmailIcon, FileTextIcon } from '@/components/ui/Icons'

export default function ResultsPage() {
  const { data, error, isLoading, mutate } = useSWR('/api/email/latest', fetcher, { refreshInterval: 0 })

  return (
    <AppShell>
      <div className="animate-fade-in">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">Analysis Results</h1>
            <p className="mt-2 text-secondary-600 dark:text-secondary-400">
              Detailed breakdown of your email's journey and sender information
            </p>
          </div>
          <button 
            onClick={() => mutate()} 
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader label="Fetching latest analyzed email..." />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-error-200 bg-error-50 p-6 dark:border-error-800 dark:bg-error-900/20">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error-100 dark:bg-error-800">
                <svg className="h-4 w-4 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-error-800 dark:text-error-200">Failed to load results</h3>
                <p className="text-sm text-error-700 dark:text-error-300">
                  Ensure backend is running and CORS is configured properly.
                </p>
              </div>
            </div>
          </div>
        )}

        {data && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Analysis Panel */}
            <div className="lg:col-span-2">
              <div className="card-modern p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    <ServerIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">Receiving Chain</h2>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      The path your email took to reach our servers
                    </p>
                  </div>
                </div>
                
                <Tabs tabs={[
                  { 
                    label: 'Timeline View', 
                    content: (
                      <div className="mt-4">
                        <Timeline items={data?.receivingChain ?? []} />
                      </div>
                    )
                  },
                  { 
                    label: 'Table View', 
                    content: (
                      data?.receivingChain?.length ? (
                        <div className="mt-4 overflow-hidden rounded-lg border border-secondary-200 dark:border-secondary-700">
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                              <thead className="bg-secondary-50 dark:bg-secondary-800">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-secondary-700 dark:text-secondary-300">Hop</th>
                                  <th className="px-4 py-3 text-left font-semibold text-secondary-700 dark:text-secondary-300">Server</th>
                                  <th className="px-4 py-3 text-left font-semibold text-secondary-700 dark:text-secondary-300">IP Address</th>
                                  <th className="px-4 py-3 text-left font-semibold text-secondary-700 dark:text-secondary-300">Timestamp</th>
                                  <th className="px-4 py-3 text-left font-semibold text-secondary-700 dark:text-secondary-300">Details</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                                {data.receivingChain.map((r: any, i: number) => (
                                  <tr key={i} className="hover:bg-secondary-50 dark:hover:bg-secondary-800/50">
                                    <td className="px-4 py-3">
                                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                                        {i+1}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-secondary-900 dark:text-secondary-100">{r.name}</td>
                                    <td className="px-4 py-3 font-mono text-sm text-secondary-600 dark:text-secondary-400">{r.ip || '-'}</td>
                                    <td className="px-4 py-3 text-secondary-600 dark:text-secondary-400">{r.timestamp || '-'}</td>
                                    <td className="px-4 py-3 text-secondary-600 dark:text-secondary-400">{r.details || '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <EmptyState title="No chain data available" description="Send a test email to populate the receiving chain." />
                        </div>
                      )
                    )
                  },
                  { 
                    label: 'Raw Headers', 
                    content: (
                      data?.rawHeaders ? (
                        <div className="mt-4 overflow-hidden rounded-lg border border-secondary-200 dark:border-secondary-700">
                          <div className="bg-secondary-50 px-4 py-2 dark:bg-secondary-800">
                            <h4 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">Email Headers</h4>
                          </div>
                          <pre className="max-h-[400px] overflow-auto bg-secondary-900 p-4 text-xs text-secondary-100">
                            <code>{data.rawHeaders}</code>
                          </pre>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <EmptyState title="No raw headers available" description="Send a test email and ensure backend returns raw headers." />
                        </div>
                      )
                    )
                  },
                ]} />
              </div>
            </div>

            {/* ESP Information Panel */}
            <div className="space-y-6">
              {/* ESP Badge */}
              <div className="card-modern p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
                    <EmailIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">Email Service Provider</h2>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Detected sender platform
                    </p>
                  </div>
                </div>
                <ESPBadge esp={data?.esp ?? 'Unknown'} />
              </div>

              {/* Email Details */}
              <div className="card-modern p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400">
                    <FileTextIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">Email Details</h2>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Message information
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                    <div className="text-xs font-semibold uppercase tracking-wider text-secondary-500 dark:text-secondary-400 mb-1">
                      Subject
                    </div>
                    <div className="font-medium text-secondary-900 dark:text-secondary-100">
                      {data?.subject ?? 'No subject'}
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                    <div className="text-xs font-semibold uppercase tracking-wider text-secondary-500 dark:text-secondary-400 mb-1">
                      From
                    </div>
                    <div className="font-mono text-sm text-secondary-900 dark:text-secondary-100">
                      {data?.from ?? 'Unknown sender'}
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                    <div className="text-xs font-semibold uppercase tracking-wider text-secondary-500 dark:text-secondary-400 mb-1">
                      To
                    </div>
                    <div className="font-mono text-sm text-secondary-900 dark:text-secondary-100">
                      {data?.to ?? 'Unknown recipient'}
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-secondary-50 p-4 dark:bg-secondary-800/50">
                    <div className="text-xs font-semibold uppercase tracking-wider text-secondary-500 dark:text-secondary-400 mb-1">
                      Received At
                    </div>
                    <div className="text-sm text-secondary-900 dark:text-secondary-100">
                      {data?.receivedAt ? new Date(data.receivedAt).toLocaleString() : 'Unknown time'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
