import { ApiProperty } from '@nestjs/swagger'

class ChainHopDto {
  @ApiProperty({ example: 'mx.google.com' })
  name!: string

  @ApiProperty({ example: '74.125.200.27', required: false })
  ip?: string

  @ApiProperty({ example: '2025-09-04T13:45:00Z', required: false })
  timestamp?: string

  @ApiProperty({ example: 'by mx.example.com with ESMTPS id abc123', required: false })
  details?: string
}

export class EmailAnalysisDto {
  @ApiProperty({ type: [ChainHopDto], default: [] })
  receivingChain!: ChainHopDto[]

  @ApiProperty({ example: 'Gmail' })
  esp!: string

  @ApiProperty({ example: 'Test subject' })
  subject!: string

  @ApiProperty({ example: 'Alice <alice@example.com>' })
  from!: string

  @ApiProperty({ example: 'Bob <bob@example.com>' })
  to!: string

  @ApiProperty({ example: '2025-09-04T13:45:00.000Z', nullable: true })
  receivedAt!: Date | null

  @ApiProperty({ example: 'Received: from ...', required: false })
  rawHeaders?: string
}
