import { Injectable } from '@nestjs/common'
import { Prisma, Account } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { Repository } from '@protocols/repository'

@Injectable()
export class AccountRepository implements Repository {
  constructor(private readonly prisma: PrismaService) {}

  public async create({ user }: Prisma.AccountCreateInput): Promise<Account> {
    return await this.prisma.account.create({
      data: {
        user,
      },
    })
  }

  public async read(where: Prisma.AccountWhereInput): Promise<Account[]> {
    return await this.prisma.account.findMany({ where })
  }

  public async findOne(
    where: Prisma.AccountWhereUniqueInput
  ): Promise<Account | null> {
    return await this.prisma.account.findUnique({ where })
  }

  public async update(
    where: Prisma.AccountWhereUniqueInput,
    data: object
  ): Promise<Account> {
    return this.prisma.account.update({
      where,
      data,
    })
  }

  public async delete(
    where: Prisma.AccountWhereUniqueInput
  ): Promise<Account | null> {
    return await this.prisma.account.delete({ where })
  }
}
