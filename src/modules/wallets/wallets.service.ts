import { Injectable } from '@nestjs/common'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { UpdateWalletDto } from './dto/update-wallet.dto'
import { Repository } from '@protocols/repository'

@Injectable()
export class WalletsService {
  constructor(private readonly walletRepository: Repository) {}

  async create(createWalletDto: CreateWalletDto) {
    const { user_id, description } = createWalletDto

    const wallet = await this.walletRepository.create({
      user: user_id,
      description,
    })

    return wallet
  }

  async findAll() {
    const users = await this.walletRepository.read({})

    return users
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`
  }
}
