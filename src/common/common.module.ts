import { Module } from '@nestjs/common';
import { HashService } from './services/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [HashService, TokenService],
  exports: [HashService, TokenService],
})
export class CommonModule {}
