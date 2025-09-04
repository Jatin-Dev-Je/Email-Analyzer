import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const store = cookies()
  const apiBase = store.get('apiBase')?.value || process.env.NEXT_PUBLIC_API_BASE || ''
  const theme = store.get('theme')?.value || 'light'
  return NextResponse.json({ apiBase, theme })
}

export async function POST(req: Request) {
  const { apiBase, theme } = await req.json().catch(() => ({}))
  const res = NextResponse.json({ ok: true })
  if (typeof apiBase === 'string') res.cookies.set('apiBase', apiBase, { httpOnly: false, path: '/' })
  if (theme === 'light' || theme === 'dark') res.cookies.set('theme', theme, { httpOnly: false, path: '/' })
  return res
}
