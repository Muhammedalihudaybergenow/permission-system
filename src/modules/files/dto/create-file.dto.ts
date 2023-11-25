import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    type: [String],
    format: 'binary',
    required: true,
  })
  files: Express.Multer.File[];
}
