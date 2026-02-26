import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // 👈 Importamos el servicio
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  // 👈 Inyectamos JwtService junto a PrismaService
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }

    // Comparamos la contraseña de forma limpia
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- excluir password del resultado
      const { password, ...result } = user;
      return result as UserWithoutPassword;
    }
    return null;
  }

  // 👈 Genera el token JWT para el usuario autenticado
  login(user: UserWithoutPassword) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role, // 👈 Incluimos el rol que viene de la base de datos
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
