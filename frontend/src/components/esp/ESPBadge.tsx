const ICONS: Record<string, string> = {
  gmail: '📧',
  outlook: '📨',
  'amazon ses': '🅰️',
  ses: '🅰️',
  zoho: '🅉',
  sendgrid: '🆂',
  mailgun: '🅼',
  postmark: '🅟',
}

export function ESPBadge({ esp }: { esp: string }) {
  const key = (esp || 'unknown').toLowerCase()
  const icon = ICONS[key] || '✉️'
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gradient-to-r from-white to-gray-50 px-3 py-1">
      <span className="text-lg leading-none">{icon}</span>
      <span className="text-sm font-medium capitalize">{esp || 'Unknown'}</span>
    </div>
  )
}
