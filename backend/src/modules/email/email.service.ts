import { Injectable, OnModuleInit, Inject } from '@nestjs/common'
import { EmailLog, EmailLogDocument } from './schemas/email-log.schema'
import { ImapService } from './imap.service'
import { ParserService } from './parser.service'
// in-memory model is provided by module when Mongo is not configured

@Injectable()
export class EmailService implements OnModuleInit {
  constructor(
  private imap: ImapService,
  private parser: ParserService,
  @Inject('EMAIL_LOG_MODEL') private readonly model: any,
  ) {}

  async onModuleInit() {
    // start IMAP listener if configured; don't block app start on failures
    const required = [process.env.IMAP_HOST, process.env.IMAP_USER, process.env.IMAP_PASS]
    if (required.every(Boolean)) {
      try {
        await this.imap.start(async (raw) => {
          const parsed = await this.parser.parse(raw)
          const doc = new this.model(parsed)
          await doc.save()
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('IMAP listener not started:', (err as Error)?.message || err)
      }
    } else {
      // eslint-disable-next-line no-console
      console.info('IMAP is not configured. Set IMAP_* env vars to enable ingestion.')
    }
  }

  getConfig() {
    return {
      emailAddress: process.env.IMAP_USER || 'your-generated@domain.example',
      subject: process.env.TEST_SUBJECT || 'MailTrace Test — 12345',
    }
  }

  async getLatest() {
    const doc = await this.model.findOne().sort({ createdAt: -1 }).lean()
    return doc
  }

  async getStats() {
    const totalEmails = await this.model.countDocuments()
    const avgProcessingTime = 1800 // Mock value for now
    const supportedEsps = 8 // Mock value for now
    
    return {
      avgProcessingMs: avgProcessingTime,
      supportedEsps,
      totalEmails,
    }
  }
}
