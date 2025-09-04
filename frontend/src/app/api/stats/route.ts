import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { apiClient, fallbackData, checkBackendHealth, createApiClient } from '@/lib/api'

export async function GET() {
  try {
  const cookieStore = cookies()
  const base = cookieStore.get('apiBase')?.value
  const client = base ? createApiClient(base) : apiClient
  const isBackendAvailable = await checkBackendHealth(base)
    
    if (!isBackendAvailable) {
      return NextResponse.json({
        ...fallbackData.stats,
        lastUpdated: new Date().toISOString(),
        note: 'Backend not available. Using fallback data.'
      })
    }

  const stats = await client.getStats()
    return NextResponse.json({
      ...stats,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json({
      ...fallbackData.stats,
      lastUpdated: new Date().toISOString(),
      error: error.message || 'Failed to fetch backend data',
      note: 'Backend connection failed. Using fallback data.'
    })
  }
}
