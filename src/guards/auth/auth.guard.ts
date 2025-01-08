import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(request)

    if (!token)
      throw new UnauthorizedException('You do not have authorization [3]')

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      })

      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (!request.headers.authorization)
      throw new UnauthorizedException('You do not have authorization [1]')

    const [type, token] = request.headers.authorization.split(' ') ?? []

    if (token === undefined)
      throw new UnauthorizedException('You do not have authorization [2]')

    return type === 'Bearer' ? token : undefined
  }
}
