import { ApiProperty } from '@nestjs/swagger'

export class EmailConfigDto {
  @ApiProperty({ example: 'your-generated@domain.example' })
  emailAddress!: string

  @ApiProperty({ example: 'MailTrace Test — 12345' })
  subject!: string
}
