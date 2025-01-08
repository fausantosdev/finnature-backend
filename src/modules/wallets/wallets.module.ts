import { Module } from '@nestjs/common'

import { PrismaService } from '@database/prisma.service'

import { WalletsService } from './wallets.service'
import { WalletsController } from './wallets.controller'

import { Repository } from '@protocols/repository'
import { WalletRepository } from '@database/repositories/wallet-repository'

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
