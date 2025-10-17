import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { response } from 'src/common/helpers/response-helper'
import { AuthGuard } from 'src/guards/auth.guard'

import { SignInDto } from './dto/sign-in.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signIn: SignInDto) {
    const { token } = await this.authService.signIn(signIn)

    return response({
      data: token,
    })
  }

  @UseGuards(AuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() request: any) {
    const [, token] = request.headers.authorization.split(' ')

    const { token: newToken } = await this.authService.refreshToken(token)

    return response({
      data: newToken,
    })
  }
}
