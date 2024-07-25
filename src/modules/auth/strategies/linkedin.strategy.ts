import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';

import { ILinkedInAuth, IThirdPartyLoginUser } from '@/type/auth.type';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('LINKEDIN_CLIENT_ID'),
      clientSecret: configService.get<string>('LINKEDIN_SECRET'),
      callbackURL: configService.get<string>('LINKEDIN_CALLBACK_URL'),
      scope: ['openid', 'profile', 'email'],
      state: true,
    });
  }

  validate(
    accessToken: string,
    _refreshToken: string,
    profile: ILinkedInAuth,
    done: (err: unknown, user: IThirdPartyLoginUser) => void,
  ) {
    const { email, familyName, givenName } = profile;

    const user: IThirdPartyLoginUser = {
      email,
      name: [givenName, familyName].filter(Boolean).join(' '),
      accessToken,
    };

    done(null, user);
  }
}
