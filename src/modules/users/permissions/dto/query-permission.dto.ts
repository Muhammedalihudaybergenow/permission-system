import { OmitType } from '@nestjs/swagger';
import { IsQueryIntArray } from 'src/helpers/decorators';
import { PaginationDto } from 'src/helpers/dtos';

export class QueryPermissionDto extends OmitType(PaginationDto, [
  'lang' as const,
]) {
  @IsQueryIntArray()
  roleIds: number[];
}
