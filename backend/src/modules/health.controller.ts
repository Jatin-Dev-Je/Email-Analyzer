import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('health')
@Controller()
export class HealthController {
  @Get('/health')
  @ApiOkResponse({ schema: { properties: { status: { type: 'string', example: 'ok' } } } })
  health() {
    return { status: 'ok' }
  }
}
