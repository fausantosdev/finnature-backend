import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { SignInDto } from './dto/sign-in.dto'
import { UserDto } from '@modules/users/dto/user.dto'
import { UsersService } from '@modules/users/users.service'
import { AuthResponseDto } from './dto/auth-response.dto'
import { Crypt } from '@protocols/crypt'

@Injectable()
export class AuthService {
  private jwtOptions: JwtSignOptions

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cryptService: Crypt
  ) {
    this.jwtOptions = {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      secret: this.configService.get('JWT_SECRET'),
    }
  }

  async signIn(signIn: SignInDto): Promise<AuthResponseDto> {
    const { email, password } = signIn

    const userExists = (await this.userService.findOne({ email })) as UserDto

    if (
      !userExists ||
      !(await this.cryptService.compare(password, userExists.password_hash))
    )
      throw new UnauthorizedException('Invalid credentials')

    const payload = {
      sub: userExists.id,
      email: userExists.email,
    }

    const token = await this.jwtService.signAsync(payload, this.jwtOptions)

    return { token, expires_in: this.jwtOptions.expiresIn }
  }

  async refreshToken(token: string): Promise<AuthResponseDto> {
    const decodedToken = await this.jwtService.decode(token)

    const { sub } = decodedToken as { sub: string; email: string }

    const user = (await this.userService.findOne({ id: sub })) as UserDto

    if (!user) throw new UnauthorizedException()

    const payload = {
      sub: user.id,
      email: user.email,
    }

    const newToken = await this.jwtService.signAsync(payload, this.jwtOptions)

    return { token: newToken, expires_in: this.jwtOptions.expiresIn }
  }
}
