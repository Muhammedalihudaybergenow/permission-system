import { Module } from '@nestjs/common';
import { ManagerFilesService } from './services/manager-files.service';
import { ManagerFilesController } from './controllers/manager-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/modules/files/entities';
import { MulterModule } from '@nestjs/platform-express';
import { ManagerFileRepository } from 'src/modules/files/repositories';
@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.registerAsync({
      useFactory: () => {
        return {
          storage: './uploads',
        };
      },
    }),
  ],
  controllers: [ManagerFilesController],
  providers: [ManagerFilesService, ManagerFileRepository],
})
export class FilesModule {}
