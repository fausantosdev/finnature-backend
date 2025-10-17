import { BadRequestException, HttpException, Injectable } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { Repository } from '@protocols/repository'
import { Crypt } from '@protocols/crypt'

import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: Repository,
    private readonly cryptService: Crypt
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, date_of_birth, email, password_hash } = createUserDto

    const emailAlreadyExists = await this.userRepository.findOne({ email })

    if (emailAlreadyExists)
      throw new HttpException('Email already registered', 400)

    const user = await this.userRepository.create({
      name,
      date_of_birth,
      email,
      password_hash: await this.cryptService.hash(password_hash, 8),
    })

    return user
  }

  async findAll() {
    const users = await this.userRepository.read({})

    return users
  }

  async findOne(where: { id?: string; email?: string }) {
    const user = await this.userRepository.findOne(where)

    return user
  }

  async update(id: string, data: UpdateUserDto): Promise<object> {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('No data provided for update')
    }

    const updated = await this.userRepository.update({ id }, data)

    return updated
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ id })

    if (!user) throw new HttpException('User not found', 400)

    const deleted = (await this.userRepository.delete({ id })) as User

    return !!deleted
  }
}
