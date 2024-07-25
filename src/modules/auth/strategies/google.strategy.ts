import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { IGoogleAuth, IThirdPartyLoginUser } from '@/type/auth.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    _refreshToken: string,
    profile: IGoogleAuth,
    cb: VerifyCallback,
  ) {
    const { name, emails } = profile;
    const { givenName, familyName } = name;

    const user: IThirdPartyLoginUser = {
      email: emails[0].value,
      name: [givenName, familyName].filter(Boolean).join(' '),
      accessToken,
    };

    cb(null, user);
  }
}
