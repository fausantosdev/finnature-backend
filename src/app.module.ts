import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UsersModule } from '@modules/users/users.module'
import { AuthModule } from '@modules/auth/auth.module'
import { WalletsModule } from './modules/wallets/wallets.module'
import { validate } from './config/env.validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    UsersModule,
    AuthModule,
    WalletsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
