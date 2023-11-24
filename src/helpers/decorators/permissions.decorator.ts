import { ConstantHelper } from 'src/helpers/common';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  PermissionGuard,
} from 'src/modules/authentications/guards';

export const Permissions = (...permissions: string[]) => {
  return applyDecorators(
    SetMetadata(ConstantHelper.getPermissionKey(), permissions),
    UseGuards(JwtAuthGuard, PermissionGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
