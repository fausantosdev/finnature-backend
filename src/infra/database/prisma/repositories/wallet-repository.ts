import { Injectable } from '@nestjs/common'
import { Prisma, Wallet } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { Repository } from '@protocols/repository'

@Injectable()
export class WalletRepository implements Repository {
  constructor(private readonly prisma: PrismaService) {}

  public async create({
    account,
    description,
  }: Prisma.WalletCreateInput): Promise<Wallet> {
    return await this.prisma.wallet.create({
      data: {
        account,
        description,
      },
    })
  }

  public async read(where: Prisma.WalletWhereInput): Promise<Wallet[]> {
    return await this.prisma.wallet.findMany({ where })
  }

  public async findOne(
    where: Prisma.WalletWhereUniqueInput
  ): Promise<Wallet | null> {
    return await this.prisma.wallet.findUnique({ where })
  }

  public async update(
    where: Prisma.WalletWhereUniqueInput,
    data: object
  ): Promise<Wallet> {
    return this.prisma.wallet.update({
      where,
      data,
    })
  }

  public async delete(
    where: Prisma.WalletWhereUniqueInput
  ): Promise<Wallet | null> {
    return await this.prisma.wallet.delete({ where })
  }
}
