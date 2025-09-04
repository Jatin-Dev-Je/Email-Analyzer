import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type EmailLogDocument = HydratedDocument<EmailLog>

@Schema({ timestamps: true })
export class EmailLog {
  @Prop() subject: string
  @Prop() from: string
  @Prop() to: string
  @Prop() rawHeaders: string
  @Prop({ type: Array, default: [] }) receivingChain: Array<{ name: string; ip?: string; timestamp?: string; details?: string }>
  @Prop() esp: string
  @Prop() receivedAt: Date
}

export const EmailLogSchema = SchemaFactory.createForClass(EmailLog)
