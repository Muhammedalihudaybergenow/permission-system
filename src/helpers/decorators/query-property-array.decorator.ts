import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export const IsQueryIntArray = () => {
  return applyDecorators(
    ApiProperty({
      type: [Number],
      format: 'form',
      required: false,
      nullable: false,
      example: '1,2,3',
    }),
    IsOptional(),
    IsArray(),
    Transform(({ value }) => value.split(',').map(Number)),
    IsInt({ each: true }),
  );
};
