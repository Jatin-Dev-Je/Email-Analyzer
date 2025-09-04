"use client"
import { useEffect, useState } from 'react'
import { AppShell } from '@/components/AppShell'
import { useToast } from '@/components/ui/ToastProvider'
import { Card, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const { show } = useToast()
  const [apiBase, setApiBase] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // fetch stored settings
    fetch('/api/prefs').then(r => r.json()).then((j) => {
      if (j.apiBase) setApiBase(j.apiBase)
      if (j.theme) setTheme(j.theme)
    }).catch(() => {})
  }, [])

  function save() {
    fetch('/api/prefs', { method: 'POST', body: JSON.stringify({ apiBase, theme }) })
      .then((r) => r.ok ? r.json() : Promise.reject(r))
      .then(() => {
        show('Settings saved', { variant: 'success' })
        // apply theme
        const root = document.documentElement
        if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark')
      })
      .catch(() => show('Failed to save settings', { variant: 'error' }))
  }

  return (
    <AppShell>
      <section className="grid gap-6">
        <Card>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-2 text-sm text-gray-600">Configure backend API and theme.</p>
        </Card>

        <Card>
          <CardHeader title="Backend" subtitle="Used by the app to fetch /email/config and /email/latest." />
          <label className="mt-3 block text-sm">Backend Base URL</label>
          <Input value={apiBase} onChange={(e) => setApiBase(e.target.value)} placeholder="https://your-backend.example.com" />
        </Card>

        <Card>
          <CardHeader title="Appearance" subtitle="Choose your preferred theme." />
          <div className="mt-3 flex gap-3">
            <Button variant={theme==='light'?'primary':'secondary'} onClick={() => setTheme('light')}>Light</Button>
            <Button variant={theme==='dark'?'primary':'secondary'} onClick={() => setTheme('dark')}>Dark</Button>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button onClick={save}>Save Changes</Button>
        </div>
      </section>
    </AppShell>
  )
}
