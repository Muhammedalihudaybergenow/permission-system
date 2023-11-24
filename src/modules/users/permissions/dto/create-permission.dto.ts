import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUnique } from 'src/helpers/decorators';

export class CreatePermissionDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUnique({ tableName: 'permissions', column: 'slug' })
  slug: string;

  @ApiProperty({
    type: [Number],
    required: true,
    nullable: false,
  })
  @IsOptional()
  @IsInt({
    each: true,
  })
  roleIds: number[];
}
