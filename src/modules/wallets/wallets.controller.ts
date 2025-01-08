import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'

import { WalletsService } from './wallets.service'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { UpdateWalletDto } from './dto/update-wallet.dto'

import { AuthGuard } from 'src/guards/auth/auth.guard'
import { Request } from 'express'

@UseGuards(AuthGuard)
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto, @Req() request: Request) {
    const { description } = createWalletDto

    const user = request['user']

    return this.walletsService.create({ user_id: user.sub, description })
  }

  @Get()
  findAll() {
    return this.walletsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id)
  }
}
