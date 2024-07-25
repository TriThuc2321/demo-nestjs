import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '@/modules/auth/auth.service';
import { Public } from '@/modules/auth/decorators/public.decorator';
import { LoginDto, RegisterDto } from '@/modules/auth/dto';
import { ProviderEnum } from '@/type/auth.type';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  login(
    @Res({ passthrough: true }) res: Response,
    @Body(ValidationPipe) signInDto: LoginDto,
  ) {
    return this.authService.login(signInDto, res);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'User RegisterDto' })
  register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() _req: Request) {}

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback(@Req() req: Request) {
    return this.authService.thirdPartyLogin(req, ProviderEnum.GOOGLE);
  }

  @Public()
  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async linkedInAuth(@Req() _req: Request) {}

  @Public()
  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  linkedInAuthCallback(@Req() req: Request) {
    return this.authService.thirdPartyLogin(req, ProviderEnum.LINKEDIN);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: 'User Logout' })
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
