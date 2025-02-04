import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { PrismaService } from '../prisma.service'
import { Repository } from '@protocols/repository'

@Injectable()
export class UserRepository implements Repository {
  constructor(private readonly prisma: PrismaService) {}

  public async create({
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })
  }

  public async read(where: Prisma.UserWhereInput): Promise<User[]> {
    return await this.prisma.user.findMany({ where })
  }

  public async findOne(
    where: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({ where })
  }

  public async update(
    where: Prisma.UserWhereUniqueInput,
    data: object
  ): Promise<User> {
    return this.prisma.user.update({
      where,
      data,
    })
  }

  public async delete(
    where: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return await this.prisma.user.delete({ where })
  }
}
