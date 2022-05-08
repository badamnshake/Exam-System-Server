import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as dayjs from 'dayjs';
import { jwtSecret } from 'src/_config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    const lastLoggedIn = await this.userService.getLastLoggedIn(payload.sub);
    if (dayjs(lastLoggedIn).valueOf() > payload.iat) {
      throw new UnauthorizedException();
    }
    const user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    return user;
  }
}
