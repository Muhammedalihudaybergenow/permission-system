import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { ManagerFilesService } from 'src/modules/files/services';
import { DateHelpers, ImageHelper } from 'src/helpers/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Permissions } from 'src/helpers/decorators';
import { UserEntity } from 'src/modules/users/entities';
import { CreateFileDto, QueryFilePaginationDto } from 'src/modules/files/dto';

@Controller({
  path: 'manager/files',
  version: '1',
})
@ApiTags('Manager Files Controller')
export class ManagerFilesController {
  constructor(private readonly managerFileService: ManagerFilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 100, {
      storage: diskStorage({
        destination: `./uploads/${DateHelpers.getFileDate()}`,
        filename: ImageHelper.editFileName,
      }),
    }),
  )
  @Permissions('manager.users.files.create')
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user: UserEntity,
    @Body() createFileDto: CreateFileDto,
  ) {
    return this.managerFileService.create(files, user);
  }

  @Get()
  @Permissions('manager.users.files.readall')
  findAll(@Query() query: QueryFilePaginationDto) {
    return this.managerFileService.findAll(query);
  }

  @Get(':id')
  @Permissions('manager.users.files.readone')
  findOne(@Param('id') id: string) {
    return this.managerFileService.findOne(+id);
  }

  @Delete(':id')
  @Permissions('manager.users.files.remove')
  remove(@Param('id') id: string) {
    return this.managerFileService.remove(+id);
  }
}
