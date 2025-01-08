import { Module } from '@nestjs/common'

import { PrismaService } from '@database/prisma.service'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'

import { Repository } from '@protocols/repository'
import { UserRepository } from '@database/repositories/user-repository'

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  providers: [
    PrismaService,
    UsersService,
    {
      provide: Repository,
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}
