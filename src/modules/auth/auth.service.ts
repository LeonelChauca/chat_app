import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashService } from '../../common/services/hash.service';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { TokenService } from 'src/common/services/token.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly HashService: HashService,
    private readonly UsuarioService: UsuarioService,
    private readonly TokenService: TokenService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.UsuarioService.findByUsername(data.username);

    const isPasswordValid = await this.HashService.compare(
      data.password_hash,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const tokens = await this.TokenService.createTokens(
      user.id_usuario,
      user.username,
    );

    const hashedRefreshToken = await this.HashService.encrypt(
      tokens.refreshToken,
    );

    await this.UsuarioService.update(user.id_usuario, {
      refresh_token: hashedRefreshToken,
    });

    return {
      user,
      ...tokens,
    };
  }
}
