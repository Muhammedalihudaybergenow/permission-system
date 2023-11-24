import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsUnique } from 'src/helpers/decorators';

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUnique({ tableName: 'roles', column: 'slug' })
  slug: string;

  @ApiProperty({
    type: [Number],
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  permissionIds: number[];
}
