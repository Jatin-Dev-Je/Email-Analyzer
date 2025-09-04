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
        ...fallbackData.emailConfig,
        note: 'Backend not available. Using fallback data. Make sure the backend is running on the configured port.'
      })
    }

  const config = await client.getEmailConfig()
    return NextResponse.json(config)
  } catch (error: any) {
    console.error('Failed to fetch email config:', error)
    return NextResponse.json({
      ...fallbackData.emailConfig,
      error: error.message || 'Failed to fetch backend data',
      note: 'Backend connection failed. Using fallback data.'
    })
  }
}
