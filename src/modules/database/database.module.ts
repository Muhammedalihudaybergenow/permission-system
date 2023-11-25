import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('TYPEORM_DATABASE_HOST'),
          password: config.get<string>('TYPEORM_DATABASE_PASSWORD'),
          database: config.get<string>('TYPEORM_DATABASE_NAME'),
          entities: ['dist/**/*.entity{.js,.ts}'],
          username: config.get<string>('TYPEORM_DATABASE_USERNAME'),
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
