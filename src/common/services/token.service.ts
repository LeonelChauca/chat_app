import { Injectable } from '@nestjs/common';
import { jwtConfiguration } from '../constants/jwt.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createTokens(sub: number, username: string) {
    const payload = { sub, username };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConfiguration().access.secret,
        expiresIn: jwtConfiguration().access.expiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConfiguration().refresh.secret,
        expiresIn: jwtConfiguration().refresh.expiresIn,
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
