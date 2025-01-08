import { HttpException, Injectable } from '@nestjs/common'
import { hash } from '@utils/crypt'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { Repository } from '@protocols/repository'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: Repository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto

    const emailAlreadyExists = await this.userRepository.findOne({ email })

    if (emailAlreadyExists)
      throw new HttpException('Email already registered', 400)

    const user = await this.userRepository.create({
      name,
      email,
      password_hash: await hash(password, 8),
    })

    return user
  }

  async findAll() {
    const users = await this.userRepository.read({})

    return users
  }

  async findOne(where: object) {
    const user = await this.userRepository.findOne(where)

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updated = await this.userRepository.update({ id }, updateUserDto)

    return updated
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ id })

    if (!user) throw new HttpException('User not found', 400)

    const deleted = (await this.userRepository.delete({ id })) as UserDto

    return !!deleted
  }
}
