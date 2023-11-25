import { OmitType } from '@nestjs/swagger';
import { IsQueryIntArray } from 'src/helpers/decorators';
import { PaginationDto } from 'src/helpers/dtos';

export class QueryRolePaginationDto extends OmitType(PaginationDto, [
  'lang' as const,
]) {
  @IsQueryIntArray()
  permissionIds: number[];
}
