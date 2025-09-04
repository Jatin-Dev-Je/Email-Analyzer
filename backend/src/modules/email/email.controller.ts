import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { EmailConfigDto } from './dto/email-config.dto'
import { EmailAnalysisDto } from './dto/email-analysis.dto'
import { StatsDto } from './dto/stats.dto'
import { EmailService } from './email.service'

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('config')
  @ApiOperation({ summary: 'Get target email address and test subject' })
  @ApiOkResponse({ type: EmailConfigDto })
  getConfig(): EmailConfigDto {
    return this.emailService.getConfig()
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get latest analyzed email' })
  @ApiOkResponse({ type: EmailAnalysisDto })
  async latest(): Promise<EmailAnalysisDto> {
    const doc = await this.emailService.getLatest()
    return doc ?? {
      receivingChain: [],
      esp: 'Unknown',
      subject: '',
      from: '',
      to: '',
      receivedAt: null,
    }
  }
}

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  @ApiOperation({ summary: 'Get service statistics' })
  @ApiOkResponse({ type: StatsDto })
  async getStats(): Promise<StatsDto> {
    return this.emailService.getStats()
  }
}