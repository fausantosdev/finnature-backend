import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { response } from 'src/common/helpers/response-helper'

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
}
