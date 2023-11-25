import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store'
import { RedisClientOptions } from 'redis';
@Module({
    imports:[
        CacheModule.registerAsync({
            imports: [ConfigModule],
            isGlobal: true,
            useFactory:async (config:ConfigService):Promise<RedisClientOptions>=>{
                return {
                    url: `redis:/default:default@${config.get('REDIS_HOST')}:${config.get<number>('REDIS_PORT')}`
                }
            },
            inject: [ConfigService]
        })
    ]
})
export class RedisModule {}
