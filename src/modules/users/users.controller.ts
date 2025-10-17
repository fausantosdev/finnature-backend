import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
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

  @Get('me')
  @UseGuards(AuthGuard)
  async profile(@Request() request: Express.Request) {
    const { sub } = request.user

    const result = await this.usersService.findOne({ id: sub })

    return response({
      data: result,
    })
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    const result = await this.usersService.findAll()

    return response({
      data: result,
    })
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const result = await this.usersService.findOne({ id })

    return response({
      data: result,
    })
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(id, updateUserDto)

    return response({
      data: result,
    })
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id)

    return response({
      data: result,
    })
  }
}
