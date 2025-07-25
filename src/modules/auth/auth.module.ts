import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [CommonModule, UsuarioModule],
})
export class AuthModule {}
