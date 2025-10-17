import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { response } from 'src/common/helpers/response-helper'
import { AuthGuard } from 'src/guards/auth.guard'

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto)

    return response({
      data: result,
    })
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const result = await this.usersService.findAll()

    return response({
      data: result,
    })
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.usersService.findOne({ id })

    return response({
      data: result,
    })
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(id, updateUserDto)

    return response({
      data: result,
    })
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id)

    return response({
      data: result,
    })
  }
}
