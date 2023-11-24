import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ManagerPermissionsService } from 'src/modules/users/permissions/services';
import {
  CreatePermissionDto,
  QueryPermissionDto,
  UpdatePermissionDto,
} from 'src/modules/users/permissions/dto';
import { Permissions } from 'src/helpers/decorators';
import { ApiTags } from '@nestjs/swagger';
@Controller({
  path: 'manager/permissions',
  version: '1',
})
@ApiTags('Manager Permissions Controller')
export class ManagerPermissionsController {
  constructor(
    private readonly managerPermissionsService: ManagerPermissionsService,
  ) {}

  @Post()
  @Permissions('manager.users.permissions.create')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.managerPermissionsService.create(createPermissionDto);
  }

  @Get()
  @Permissions('manager.users.permissions.readall')
  findAll(@Query() query: QueryPermissionDto) {
    return this.managerPermissionsService.findAll(query);
  }

  @Get(':id')
  @Permissions('manager.users.permissions.readone')
  findOne(@Param('id') id: string) {
    return this.managerPermissionsService.findOne(+id);
  }

  @Patch(':id')
  @Permissions('manager.users.permissions.update')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.managerPermissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @Permissions('manager.users.permissions.remove')
  remove(@Param('id') id: string) {
    return this.managerPermissionsService.remove(+id);
  }
}
