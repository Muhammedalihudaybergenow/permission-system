import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagerUsersService } from 'src/modules/users/services';
import { CreateUserDto, UpdateUserDto } from 'src/modules/users/dto';
import { Permissions } from 'src/helpers/decorators';
import { ApiTags } from '@nestjs/swagger';
@Controller({
  path: 'manager/users',
  version: '1',
})
@ApiTags('Manager Users Controller')
export class ManagerUsersController {
  constructor(private readonly usersService: ManagerUsersService) {}

  @Post()
  @Permissions('manager.users.users.create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Permissions('manager.users.users.readAll')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Permissions('manager.users.users.readone')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Permissions('manager.users.users.update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
