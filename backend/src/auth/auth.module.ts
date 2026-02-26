import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    // Configuramos el módulo JWT
    JwtModule.register({
      secret: 'CLAVE_SECRETA_DESARROLLO', // Luego la moveremos a un archivo .env
      signOptions: { expiresIn: '1d' }, // El token durará 24 horas
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // Lo exportamos por si otros módulos necesitan validar tokens
})
export class AuthModule {}
