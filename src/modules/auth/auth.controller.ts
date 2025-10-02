import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { response } from 'src/common/helpers/response-helper'
import { Request } from 'express'
import { AuthGuard } from 'src/guards/auth.guard'

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
  async refreshToken(request: Request) {
    const user = request
    console.log(user)
    /*const { token, expires_in } = await this.authService.refreshToken(user)
    return response({
      data: { token, expires_in },
    })*/
  }
}
