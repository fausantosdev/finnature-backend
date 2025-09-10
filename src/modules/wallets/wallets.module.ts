import { Module } from '@nestjs/common'

import { PrismaService } from '@infra/database/prisma/prisma.service'

import { WalletsService } from './wallets.service'
import { WalletsController } from './wallets.controller'

import { Repository } from '@protocols/repository'
import { WalletRepository } from '@infra/database/prisma/repositories/wallet-repository'

@Module({
  controllers: [WalletsController],
  providers: [
    PrismaService,
    WalletsService,
    {
      provide: Repository,
      useClass: WalletRepository,
    },
  ],
})
export class WalletsModule {}
