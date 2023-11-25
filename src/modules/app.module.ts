import { Module } from '@nestjs/common';
import { AuthenticationsModule } from './authentications/authentications.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    AuthenticationsModule,
    UsersModule,
    RedisModule,
    ConfigurationModule,
    DatabaseModule,
    FilesModule,
  ],
})
export class AppModule {}
