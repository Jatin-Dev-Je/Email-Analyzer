import { Module } from '@nestjs/common'
import { EmailController, StatsController } from './email.controller'
import { EmailService } from './email.service'
import { EmailLogSchema } from './schemas/email-log.schema'
import { ImapService } from './imap.service'
import { ParserService } from './parser.service'
import { InMemoryEmailLogModel } from './inmemory.model'

@Module({
  imports: [],
  controllers: [EmailController, StatsController],
  providers: [
    EmailService,
    ImapService,
    ParserService,
    {
      provide: 'EMAIL_LOG_MODEL',
      useFactory: async () => {
        if (process.env.MONGODB_URI) {
          const mongoose = (await import('mongoose')).default
          const schema = EmailLogSchema
          const conn = await mongoose.createConnection(process.env.MONGODB_URI).asPromise()
          return conn.model('EmailLog', schema)
        }
        return InMemoryEmailLogModel
      },
    },
  ],
})
export class EmailModule {}
