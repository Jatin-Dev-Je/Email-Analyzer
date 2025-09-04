"use client"
import { useState, useEffect } from 'react'
import { checkBackendHealth } from '@/lib/api'
import { Badge } from '@/components/ui/Badge'

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkConnection = async () => {
      setIsChecking(true)
      try {
        const connected = await checkBackendHealth()
        setIsConnected(connected)
      } catch (error) {
        setIsConnected(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkConnection()
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (isChecking) {
    return (
      <Badge variant="secondary" className="animate-pulse">
        <div className="w-2 h-2 bg-secondary-400 rounded-full mr-2"></div>
        Checking...
      </Badge>
    )
  }

  return (
    <Badge variant={isConnected ? 'success' : 'error'}>
      <div className={`w-2 h-2 rounded-full mr-2 ${
        isConnected ? 'bg-success-500' : 'bg-error-500'
      }`}></div>
      {isConnected ? 'Backend Connected' : 'Backend Offline'}
    </Badge>
  )
}
