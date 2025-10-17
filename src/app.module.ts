import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UsersModule } from '@modules/users/users.module'
import { AuthModule } from '@modules/auth/auth.module'
import { WalletsModule } from './modules/wallets/wallets.module'
import { validate } from './config/env.validation'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    WalletsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
