import { Module } from '@nestjs/common'

import { PrismaService } from '@infra/database/prisma/prisma.service'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'

import { Repository } from '@protocols/repository'
import { UserRepository } from '@infra/database/prisma/repositories/user-repository'

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
