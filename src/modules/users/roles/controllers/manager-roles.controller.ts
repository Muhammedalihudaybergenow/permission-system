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
import { ManagerRolesService } from 'src/modules/users/roles/services';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateRoleDto,
  UpdateRoleDto,
  QueryRolePaginationDto,
} from 'src/modules/users/roles/dto';
import { Permissions } from 'src/helpers/decorators';
@Controller({
  path: 'manager/roles',
  version: '1',
})
@ApiTags('Manager Roles Controller')
export class ManagerRolesController {
  constructor(private readonly managerRolesService: ManagerRolesService) {}

  @Post()
  @Permissions('manager.users.roles.create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.managerRolesService.create(createRoleDto);
  }

  @Get()
  @Permissions('manager.users.roles.readall')
  findAll(@Query() query: QueryRolePaginationDto) {
    return this.managerRolesService.findAll(query);
  }

  @Get(':id')
  @Permissions('manager.users.roles.readone')
  findOne(@Param('id') id: string) {
    return this.managerRolesService.findOne(+id);
  }

  @Patch(':id')
  @Permissions('manager.users.roles.update')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.managerRolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Permissions('manager.users.roles.remove')
  remove(@Param('id') id: string) {
    return this.managerRolesService.remove(+id);
  }
}
