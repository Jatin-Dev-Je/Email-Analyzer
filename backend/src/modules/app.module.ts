import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { EmailModule } from './email/email.module'
import { HealthController } from './health.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...(process.env.MONGODB_URI ? [MongooseModule.forRoot(process.env.MONGODB_URI)] : []),
    EmailModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
