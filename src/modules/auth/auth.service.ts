import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/auth';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_SECRET,
} from '@/constants/env.constant';
import { PermissionRole, User } from '@/entities';
import { LoginDto, RegisterDto } from '@/modules/auth/dto';
import { UsersService } from '@/modules/users/users.service';
import { UserNotFoundException } from '@/shared/exception/users.exception';
import {
  IThirdPartyLoginUser,
  ITokenPayload,
  RoleEnum,
} from '@/type/auth.type';
import {
  comparePasswords,
  hashPassword,
  SUCCESS_MESSAGE,
} from '@/utils/common.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PermissionRole)
    private readonly permissionRoleRepository: Repository<PermissionRole>,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UserNotFoundException();
    }

    const { password: hashedPassword = '', roleId, id } = user;

    const isPassword = await comparePasswords({ password, hashedPassword });

    if (!isPassword) {
      throw new UnauthorizedException();
    }

    const permissionDb = await this.permissionRoleRepository.find({
      select: ['permission'],
      where: { roleId },
      relations: ['permission'],
    });

    const permissions = permissionDb.map((p) => ({
      action: p.permission.action,
      object: p.permission.object,
    }));

    const payload = { email, roleId, id, permissions };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken);

    return SUCCESS_MESSAGE<{ accessToken: string }>({
      message: 'Login successfully',
      data: { accessToken },
    });
  }

  async thirdPartyLogin(req: Request, provider: string) {
    if (!req.user) {
      throw new BadRequestException(
        `No user from ${provider}`,
        `${provider.toUpperCase()}_ERROR`,
      );
    }

    const { email, name } = req.user as IThirdPartyLoginUser;

    const user = await this.userRepository.findOneBy({ email });
    const currentUser =
      user ??
      (await this.userRepository.save({
        email,
        name,
        roleId: RoleEnum.USER,
        password: '',
        provider,
      }));

    const payload = {
      email,
      roleId: RoleEnum.USER,
      id: currentUser.id,
      permissions: [],
    };

    const accessToken = await this.generateToken(payload);

    return SUCCESS_MESSAGE<{ accessToken: string }>({
      message: 'Login successfully',
      data: { accessToken },
    });
  }

  async register(payload: RegisterDto) {
    const { password } = payload;

    const hashedPassword = await hashPassword(password);

    return this.usersService.create({
      ...payload,
      password: hashedPassword,
      roleId: RoleEnum.USER,
    });
  }

  logout(res: Response) {
    res.cookie(ACCESS_TOKEN_COOKIE_NAME, '', { httpOnly: true });

    return SUCCESS_MESSAGE<{ accessToken: string }>({
      message: 'Logout successfully',
    });
  }

  async generateToken(
    payload: ITokenPayload,
    expiresIn = JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  ) {
    return this.jwtService.signAsync(payload, {
      secret: JWT_SECRET,
      expiresIn,
    });
  }
}
