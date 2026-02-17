// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const compareFn = (bcrypt as any).compare as (
      data: string,
      encrypted: string,
    ) => Promise<boolean>;
    const isPasswordValid: boolean = await compareFn(password, user.password);
    if (isPasswordValid) {
      const { password: _, ...result } = user;
      void _; // Variable intencionalmente no usada para excluir password
      return result as UserWithoutPassword;
    }
    return null;
  }

  login(_user: any) {
    // Parámetro temporal - se usará cuando se implemente JWT
    void _user;
    return {
      access_token: 'mock-jwt-token', // Temporal â€” luego usaremos @nestjs/jwt
    };
  }
}
