import { Injectable } from '@nestjs/common'

type ChainItem = { name: string; ip?: string; timestamp?: string; details?: string }

@Injectable()
export class ParserService {
  async parse(raw: { headers: string; body?: string }) {
    const headersStr = raw.headers
    const subject = this.getHeader(headersStr, 'Subject') || ''
    const from = this.getHeader(headersStr, 'From') || ''
    const to = this.getHeader(headersStr, 'To') || ''
    const receivedAt = this.getHeader(headersStr, 'Date')
    const receivingChain = this.extractReceivingChain(headersStr)
    const esp = this.detectEsp(headersStr)
    return {
      subject,
      from,
      to,
      receivedAt: receivedAt ? new Date(receivedAt) : new Date(),
      rawHeaders: headersStr,
      receivingChain,
      esp,
    }
  }

  private getHeader(headers: string, name: string): string | undefined {
    const re = new RegExp(`^${name}:\\s*(.*)$`, 'gmi')
    const m = re.exec(headers)
    return m?.[1]?.trim()
  }

  private extractReceivingChain(headers: string): ChainItem[] {
    const lines = headers.split(/\r?\n/)
    const received: ChainItem[] = []
    for (const line of lines) {
      if (line.toLowerCase().startsWith('received:')) {
        const ip = (line.match(/\b(\d{1,3}(?:\.\d{1,3}){3})\b/) || [])[1]
        const by = (line.match(/by\s+([^;]+)/i) || [])[1]
        const from = (line.match(/from\s+([^;]+)/i) || [])[1]
        const date = (line.match(/;\s*(.*)$/) || [])[1]
        received.push({ name: `${from ? from.trim() : 'unknown'} ➜ ${by ? by.trim() : 'unknown'}`, ip, timestamp: date, details: line.slice(10).trim() })
      }
    }
    return received
  }

  private detectEsp(headers: string): string {
    const h = headers.toLowerCase()
    if (h.includes('x-ses-')) return 'Amazon SES'
    if (h.includes('amazonses.com')) return 'Amazon SES'
    if (h.includes('sendgrid.net') || h.includes('x-sg-')) return 'SendGrid'
    if (h.includes('mailgun.org') || h.includes('x-mailgun-')) return 'Mailgun'
    if (h.includes('postmarkapp.com') || h.includes('x-pm-')) return 'Postmark'
    if (h.includes('zoho.com') || h.includes('x-zoho-')) return 'Zoho'
    if (h.includes('outlook.com') || h.includes('hotmail.com') || h.includes('x-microsoft-antispam')) return 'Outlook'
    if (h.includes('gmail.com') || h.includes('google.com') || h.includes('x-gm-message-state')) return 'Gmail'
    return 'Unknown'
  }
}
