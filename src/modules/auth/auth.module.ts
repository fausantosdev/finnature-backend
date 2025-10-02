import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

import { UsersModule } from '@modules/users/users.module'
import { Crypt } from '@protocols/crypt'
import { CryptService } from '@utils/CryptService'

@Module({
  imports: [
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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: Crypt,
      useClass: CryptService,
    },
  ],
})
export class AuthModule {}
