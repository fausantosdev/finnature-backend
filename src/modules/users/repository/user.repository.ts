import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/user.entity'

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User>
  abstract read(where: object): Promise<User[]>
  abstract findOne(where: { id: string; email: string }): Promise<User | null>
  abstract update(where: object, data: UpdateUserDto): Promise<User>
  abstract delete(where: object): Promise<object | null>
}
