import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.setGlobalPrefix('')

  // Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('MailTrace API')
    .setDescription('Endpoints to ingest, parse and expose email analysis results')
    .setVersion('0.1.0')
    .addServer('/')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'MailTrace API Docs',
  })
  // JSON at /openapi-json
  app.getHttpAdapter().getInstance().get('/openapi-json', (_req: any, res: any) => res.json(document))
  const port = process.env.PORT || 8080
  await app.listen(port as number)
  // eslint-disable-next-line no-console
  console.log(`MailTrace backend running on :${port}`)
}

bootstrap()
