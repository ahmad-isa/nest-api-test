import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET_KEY')! //! is a non-null  assertion. Like a guarantee telling typescript that this won't be a null or "".
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, name: payload.name, role: payload.role};
  }
}
