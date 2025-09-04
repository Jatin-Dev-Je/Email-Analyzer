"use client"
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type Toast = { id: number; title?: string; message: string; variant?: 'default' | 'success' | 'error' }

const ToastContext = createContext<{
  toasts: Toast[]
  show: (msg: string, options?: { title?: string; variant?: Toast['variant']; timeoutMs?: number }) => void
  dismiss: (id: number) => void
} | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const show = useCallback((message: string, options?: { title?: string; variant?: Toast['variant']; timeoutMs?: number }) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    const toast: Toast = { id, message, title: options?.title, variant: options?.variant || 'default' }
    setToasts((prev) => [...prev, toast])
    const timeout = options?.timeoutMs ?? 2500
    if (timeout > 0) setTimeout(() => dismiss(id), timeout)
  }, [dismiss])

  const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss])
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={`rounded-lg border px-4 py-3 shadow-card backdrop-blur ${
            t.variant === 'success' ? 'border-green-200 bg-green-50/80' : t.variant === 'error' ? 'border-red-200 bg-red-50/80' : 'border-gray-200 bg-white/80'
          }`}>
            {t.title && <div className="text-sm font-semibold">{t.title}</div>}
            <div className="text-sm text-gray-700">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
