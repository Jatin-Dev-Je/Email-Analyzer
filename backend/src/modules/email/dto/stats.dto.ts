import { ApiProperty } from '@nestjs/swagger'

export class StatsDto {
  @ApiProperty({ example: 1800 })
  avgProcessingMs!: number

  @ApiProperty({ example: 8 })
  supportedEsps!: number

  @ApiProperty({ example: 12 })
  totalEmails!: number
}
