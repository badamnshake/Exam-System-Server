import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    const lastLoggedIn = await this.userService.getLastLoggedIn(payload.sub);
    if (lastLoggedIn > payload.iat) {
      return UnauthorizedException;
    }
    const user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    return user;
  }
}
