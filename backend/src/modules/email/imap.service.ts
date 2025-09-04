import { Injectable } from '@nestjs/common'
import { ImapFlow } from 'imapflow'

@Injectable()
export class ImapService {
  private client?: ImapFlow

  async start(onMessage: (raw: { headers: string; body?: string }) => Promise<void>) {
    if (this.client) return
    const client = new ImapFlow({
      host: process.env.IMAP_HOST!,
      port: Number(process.env.IMAP_PORT || 993),
      secure: String(process.env.IMAP_SECURE || 'true') === 'true',
      auth: { user: process.env.IMAP_USER!, pass: process.env.IMAP_PASS! },
      logger: false,
    })
    this.client = client
    await client.connect()
    await client.mailboxOpen('INBOX')

    const testSubject = process.env.TEST_SUBJECT

    const handleMsg = async (msg: any) => {
      try {
        const source: Buffer | string | undefined = msg?.source
        const envelope: any = msg?.envelope
        if (!source) return
        if (testSubject && envelope?.subject && !String(envelope.subject).includes(testSubject)) return
        const text = typeof source === 'string' ? source : source.toString()
        const headers = text.split('\r\n\r\n')[0]
        await onMessage({ headers, body: undefined })
      } catch (_) {}
    }

    // fetch recent messages on start
    const lock = await client.getMailboxLock('INBOX')
    try {
      const mailbox: any = client.mailbox || {}
      const exists: number = mailbox.exists || 0
      const start = Math.max(1, exists - 20)
      for await (const msg of client.fetch(`${start}:*`, { envelope: true, source: true })) {
        await handleMsg(msg)
      }
    } finally {
      lock.release()
    }

    client.on('exists', async () => {
      const mailbox: any = client.mailbox || {}
      const exists: number | undefined = mailbox.exists
      if (!exists) return
      for await (const msg of client.fetch(`${exists}:${exists}`, { envelope: true, source: true })) {
        await handleMsg(msg)
      }
    })
  }
}
