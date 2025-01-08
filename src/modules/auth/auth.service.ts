import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { compare } from '@utils/crypt'

import { SignInDto } from './dto/sign-in.dto'
import { UserDto } from '@modules/users/dto/user.dto'
import { UsersService } from '@modules/users/users.service'
import { AuthResponseDto } from './dto/auth-response.dto'

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get(
      'JWT_EXPIRATION_TIME'
    )
  }

  async signIn(signIn: SignInDto): Promise<AuthResponseDto> {
    const { email, password } = signIn

    const userExists = (await this.userService.findOne({ email })) as UserDto

    if (!userExists || !compare(password, userExists.password_hash))
      throw new UnauthorizedException('Invalid credentials')

    const payload = {
      sub: userExists.id,
      email: userExists.email,
    }

    const token = this.jwtService.sign(payload)

    return { token, expires_in: this.jwtExpirationTimeInSeconds }
  }
}
