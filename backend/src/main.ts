import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Configurable CORS (use CORS_ORIGINS=comma,separated,origins)
  const corsOrigins = process.env.CORS_ORIGINS
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (corsOrigins && corsOrigins.length > 0) {
    app.enableCors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true)
        if (corsOrigins.includes(origin)) return callback(null, true)
        return callback(new Error('Not allowed by CORS'), false)
      },
      credentials: true,
    })
  } else {
    // Fallback: allow all (suitable for dev, tighten in prod by setting CORS_ORIGINS)
    app.enableCors({ origin: true, credentials: true })
  }
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
