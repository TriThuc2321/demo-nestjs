import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/auth';
import { JWT_SECRET } from '@/constants/env.constant';
import { IRequestWithCookies, ITokenPayload } from '@/type/auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: IRequestWithCookies) =>
          request.cookies[ACCESS_TOKEN_COOKIE_NAME],
      ]),
    });
  }

  validate(payload: ITokenPayload) {
    return payload;
  }
}
